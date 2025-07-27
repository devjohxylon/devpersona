import { NextRequest, NextResponse } from 'next/server'
import { authRateLimiter, apiRateLimiter, analysisRateLimiter, waitlistRateLimiter, securityRateLimiter } from './rate-limiter'
import { securityLogger } from './logger'
import { corsMiddleware, addCorsHeaders } from './cors'

export interface SecurityContext {
  ip: string
  userAgent: string
  userId?: string
  sessionId?: string
}

// Get client IP address
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  return 'unknown'
}

// Detect suspicious patterns
function detectSuspiciousActivity(request: NextRequest, context: SecurityContext): boolean {
  const { ip, userAgent } = context
  const path = request.nextUrl.pathname
  
  // Check for common attack patterns
  const suspiciousPatterns = [
    /\.\.\//, // Directory traversal
    /<script/i, // XSS attempts
    /union\s+select/i, // SQL injection
    /eval\s*\(/i, // Code injection
    /javascript:/i, // Protocol injection
  ]
  
  const url = request.url.toLowerCase()
  const hasSuspiciousPattern = suspiciousPatterns.some(pattern => 
    pattern.test(url) || pattern.test(userAgent)
  )
  
  if (hasSuspiciousPattern) {
    securityLogger.security.suspicious('suspicious_pattern_detected', {
      pattern: suspiciousPatterns.find(p => p.test(url) || p.test(userAgent))?.toString(),
      url,
      userAgent
    }, ip)
    return true
  }
  
  // Check for unusual user agents
  const suspiciousUserAgents = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i,
    /python/i,
    /java/i,
    /go-http-client/i
  ]
  
  const isSuspiciousUserAgent = suspiciousUserAgents.some(pattern => 
    pattern.test(userAgent) && !userAgent.includes('github')
  )
  
  if (isSuspiciousUserAgent) {
    securityLogger.security.suspicious('suspicious_user_agent', {
      userAgent
    }, ip)
    return true
  }
  
  return false
}

// Rate limiting middleware
export async function rateLimitMiddleware(
  request: NextRequest,
  context: SecurityContext,
  type: 'auth' | 'api' | 'analysis' | 'waitlist' | 'security' = 'api'
): Promise<{ allowed: boolean; response?: NextResponse }> {
  const { ip } = context
  const path = request.nextUrl.pathname
  
  let rateLimiter
  let identifier = ip
  
  switch (type) {
    case 'auth':
      rateLimiter = authRateLimiter
      identifier = `auth:${ip}`
      break
    case 'analysis':
      rateLimiter = analysisRateLimiter
      identifier = `analysis:${ip}`
      break
    default:
      rateLimiter = apiRateLimiter
      identifier = `api:${ip}`
  }
  
  try {
    const result = await rateLimiter.checkLimit(identifier)
    
    if (!result.allowed) {
      securityLogger.auth.rateLimit(ip, path)
      
      const response = NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000)
        },
        { status: 429 }
      )
      
      response.headers.set('Retry-After', Math.ceil((result.resetTime - Date.now()) / 1000).toString())
      response.headers.set('X-RateLimit-Limit', '30')
      response.headers.set('X-RateLimit-Remaining', '0')
      response.headers.set('X-RateLimit-Reset', result.resetTime.toString())
      
      return { allowed: false, response }
    }
    
    return { allowed: true }
  } catch (error) {
    console.error('Rate limiting error:', error)
    // Fail open - allow request if rate limiting fails
    return { allowed: true }
  }
}

// Security monitoring middleware
export async function securityMiddleware(
  request: NextRequest,
  context: SecurityContext
): Promise<{ allowed: boolean; response?: NextResponse }> {
  const { ip, userAgent } = context
  const path = request.nextUrl.pathname
  
  // Log all requests
  securityLogger.api.request(request.method, path, ip, userAgent)
  
  // Detect suspicious activity
  if (detectSuspiciousActivity(request, context)) {
    const response = NextResponse.json(
      { error: 'Request blocked for security reasons' },
      { status: 403 }
    )
    return { allowed: false, response }
  }
  
  return { allowed: true }
}

// Combined security middleware
export async function combinedSecurityMiddleware(
  request: NextRequest,
  type: 'auth' | 'api' | 'analysis' | 'waitlist' | 'security' = 'api'
): Promise<{ allowed: boolean; response?: NextResponse; context?: SecurityContext }> {
  const context: SecurityContext = {
    ip: getClientIP(request),
    userAgent: request.headers.get('user-agent') || 'unknown'
  }

  // Handle CORS
  const corsResponse = corsMiddleware(request)
  if (corsResponse) {
    return { allowed: false, response: corsResponse, context }
  }

  // Check for suspicious activity
  if (detectSuspiciousActivity(request, context)) {
    securityLogger.security.suspicious('suspicious_activity_detected', context, context.ip)
    return {
      allowed: false,
      response: new NextResponse(
        JSON.stringify({ error: 'Suspicious activity detected' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      ),
      context
    }
  }

  // Apply rate limiting based on type
  let rateLimiter
  switch (type) {
    case 'auth':
      rateLimiter = authRateLimiter
      break
    case 'api':
      rateLimiter = apiRateLimiter
      break
    case 'analysis':
      rateLimiter = analysisRateLimiter
      break
    case 'waitlist':
      rateLimiter = waitlistRateLimiter
      break
    case 'security':
      rateLimiter = securityRateLimiter
      break
    default:
      rateLimiter = apiRateLimiter
  }

  const rateLimitResult = await rateLimitMiddleware(request, context, type)
  if (!rateLimitResult.allowed) {
    return rateLimitResult
  }

  return { allowed: true, context }
}

// Error handling wrapper
export function withSecurityMonitoring(
  handler: (request: NextRequest, context: SecurityContext) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const context: SecurityContext = {
      ip: getClientIP(request),
      userAgent: request.headers.get('user-agent') || 'unknown'
    }
    
    try {
      const response = await handler(request, context)
      
      // Log successful responses
      securityLogger.api.request(request.method, request.nextUrl.pathname, context.ip, context.userAgent)
      
      return response
    } catch (error) {
      // Log errors
      securityLogger.api.error(
        request.method,
        request.nextUrl.pathname,
        context.ip,
        error as Error
      )
      
      // Return generic error response
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
} 