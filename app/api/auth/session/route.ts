import { NextRequest, NextResponse } from 'next/server'
import { combinedSecurityMiddleware } from '../../../../lib/security-middleware'
import { sessionManager } from '../../../../lib/session-manager'
import { securityLogger } from '../../../../lib/logger'
import { sessionIdSchema, validateGitHubUsername, sanitizeInput } from '../../../../lib/validation'

export async function GET(request: NextRequest) {
  // Apply security middleware
  const securityResult = await combinedSecurityMiddleware(request, 'auth')
  if (!securityResult.allowed) {
    return securityResult.response!
  }

           const { searchParams } = new URL(request.url)
         const sessionId = searchParams.get('sessionId')
         const username = searchParams.get('username')

         if (!sessionId || !username) {
           securityLogger.auth.failure('unknown', securityResult.context!.ip, securityResult.context!.userAgent, 'Missing session parameters')
           return NextResponse.redirect(new URL('/?error=invalid_session', request.url))
         }

         // Validate session ID format
         try {
           sessionIdSchema.parse(sessionId)
         } catch (error) {
           securityLogger.security.suspicious('invalid_session_id_format', { sessionId: '[REDACTED]' }, securityResult.context!.ip)
           return NextResponse.redirect(new URL('/?error=invalid_session', request.url))
         }

         // Validate and sanitize username
         const sanitizedUsername = sanitizeInput(username)
         if (sanitizedUsername !== username) {
           securityLogger.security.suspicious('malicious_username_parameter', { username: '[REDACTED]' }, securityResult.context!.ip)
           return NextResponse.redirect(new URL('/?error=invalid_username', request.url))
         }

         const validatedUsername = validateGitHubUsername(username)
         if (!validatedUsername) {
           securityLogger.security.suspicious('invalid_username_format', { username }, securityResult.context!.ip)
           return NextResponse.redirect(new URL('/?error=invalid_username', request.url))
         }

  // Get session from Redis
  const session = await sessionManager.getSession(sessionId)
  
  if (!session) {
    securityLogger.auth.failure(username, securityResult.context!.ip, securityResult.context!.userAgent, 'Invalid session')
    return NextResponse.redirect(new URL('/?error=invalid_session', request.url))
  }

  // Validate session username matches
  if (session.username !== username) {
    securityLogger.security.suspicious('username_mismatch', { 
      sessionUsername: session.username, 
      requestedUsername: username 
    }, securityResult.context!.ip)
    return NextResponse.redirect(new URL('/?error=invalid_session', request.url))
  }

  // Redirect to results page with session data
  const redirectUrl = `/results?username=${username}&sessionId=${sessionId}`
  
  return NextResponse.redirect(new URL(redirectUrl, request.url))
} 