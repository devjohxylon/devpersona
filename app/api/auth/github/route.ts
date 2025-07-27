import { NextRequest, NextResponse } from 'next/server'
import { combinedSecurityMiddleware } from '../../../../lib/security-middleware'
import { securityLogger } from '../../../../lib/logger'
import { sessionManager } from '../../../../lib/session-manager'
import { oauthCodeSchema, validateGitHubUsername } from '../../../../lib/validation'
import { sanitizeInput } from '../../../../lib/validation'

// Validate required environment variables
if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET || !process.env.NEXTAUTH_URL) {
  throw new Error('Missing required environment variables: GITHUB_ID, GITHUB_SECRET, or NEXTAUTH_URL')
}

const GITHUB_CLIENT_ID = process.env.GITHUB_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_SECRET
const REDIRECT_URI = process.env.NEXTAUTH_URL + '/api/auth/github/callback'

export async function GET(request: NextRequest) {
  // Apply security middleware
  const securityResult = await combinedSecurityMiddleware(request, 'auth')
  if (!securityResult.allowed) {
    return securityResult.response!
  }

           const { searchParams } = new URL(request.url)
         const code = searchParams.get('code')
         const state = searchParams.get('state')

         // Validate and sanitize inputs
         if (code) {
           try {
             oauthCodeSchema.parse(code)
           } catch (error) {
             securityLogger.security.suspicious('invalid_oauth_code', { code: '[REDACTED]' }, securityResult.context!.ip)
             return NextResponse.redirect(new URL('/?error=invalid_code', request.url))
           }
         }

         if (state) {
           const sanitizedState = sanitizeInput(state)
           if (sanitizedState !== state) {
             securityLogger.security.suspicious('malicious_state_parameter', { state: '[REDACTED]' }, securityResult.context!.ip)
             return NextResponse.redirect(new URL('/?error=invalid_state', request.url))
           }
         }
  
  if (!code) {
    // Initial OAuth request - redirect to GitHub with CSRF protection
    const csrfState = crypto.randomUUID()
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repo,user&state=${csrfState}`
    
    const response = NextResponse.redirect(githubAuthUrl)
    response.cookies.set('oauth_state', csrfState, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600 // 10 minutes
    })
    
    return response
  }

  // Verify CSRF state
  const expectedState = request.cookies.get('oauth_state')?.value
  if (!state || !expectedState || state !== expectedState) {
    securityLogger.security.csrf(securityResult.context!.ip, request.nextUrl.pathname)
    return NextResponse.redirect(new URL('/?error=csrf_failed', request.url))
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
      }),
    })

    const tokenData = await tokenResponse.json()
    
    if (tokenData.error) {
      throw new Error(tokenData.error_description || 'GitHub OAuth failed')
    }

    const accessToken = tokenData.access_token

    // Get user info
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    })

    if (!userResponse.ok) {
      throw new Error(`GitHub API error: ${userResponse.status} ${userResponse.statusText}`)
    }

    const userData = await userResponse.json()
    
               if (!userData.login) {
             throw new Error('Invalid user data received from GitHub')
           }

           // Validate GitHub username format
           const validatedUsername = validateGitHubUsername(userData.login)
           if (!validatedUsername) {
             securityLogger.security.suspicious('invalid_github_username', { username: userData.login }, securityResult.context!.ip)
             throw new Error('Invalid GitHub username format')
           }

    // Store user data and token securely using Redis session management
    const sessionId = await sessionManager.createSession({
      userId: userData.id.toString(),
      username: userData.login,
      githubToken: accessToken
    })
    
    // Log successful authentication
    securityLogger.auth.success(userData.login, securityResult.context!.ip, securityResult.context!.userAgent)
    
    // Redirect to secure session endpoint
    const redirectUrl = `/api/auth/session?sessionId=${sessionId}&username=${userData.login}`
    
    const response = NextResponse.redirect(new URL(redirectUrl, request.url))
    
    // Set session cookie (not the token)
    response.cookies.set('session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600 // 1 hour
    })
    
    return response
  } catch (error) {
    console.error('GitHub OAuth error:', error)
    securityLogger.auth.failure('unknown', securityResult.context!.ip, securityResult.context!.userAgent, error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.redirect(new URL('/?error=oauth_failed', request.url))
  }
} 