import { NextRequest, NextResponse } from 'next/server'

const allowedOrigins = [
  'http://localhost:3000',
  'https://localhost:3000',
  'https://*.vercel.app',
  'https://*.railway.app'
]

const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']

export function corsMiddleware(request: NextRequest): NextResponse | null {
  const origin = request.headers.get('origin')
  const method = request.method

  // Handle preflight requests
  if (method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 200 })
    
    // Set CORS headers
    if (origin && isAllowedOrigin(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin)
    }
    
    response.headers.set('Access-Control-Allow-Methods', allowedMethods.join(', '))
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
    response.headers.set('Access-Control-Max-Age', '86400') // 24 hours
    response.headers.set('Access-Control-Allow-Credentials', 'true')
    
    return response
  }

  // For actual requests, check origin
  if (origin && !isAllowedOrigin(origin)) {
    return new NextResponse(
      JSON.stringify({ error: 'CORS policy violation' }),
      { 
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  return null
}

function isAllowedOrigin(origin: string): boolean {
  return allowedOrigins.some(allowedOrigin => {
    if (allowedOrigin.includes('*')) {
      const pattern = allowedOrigin.replace('*', '.*')
      return new RegExp(pattern).test(origin)
    }
    return allowedOrigin === origin
  })
}

export function addCorsHeaders(response: NextResponse, origin?: string): NextResponse {
  if (origin && isAllowedOrigin(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }
  
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  response.headers.set('Access-Control-Allow-Methods', allowedMethods.join(', '))
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  
  return response
} 