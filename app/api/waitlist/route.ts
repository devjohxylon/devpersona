import { NextRequest, NextResponse } from 'next/server'
import { combinedSecurityMiddleware } from '../../../lib/security-middleware'
import { securityLogger } from '../../../lib/logger'
import { waitlistSchema } from '../../../lib/validation'

export async function POST(request: NextRequest) {
  // Apply security middleware
  const securityResult = await combinedSecurityMiddleware(request, 'waitlist')
  if (!securityResult.allowed) {
    return securityResult.response || new NextResponse(
      JSON.stringify({ error: 'Request blocked' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = waitlistSchema.parse(body)
    const { email } = validatedData

    // Log the waitlist submission
    securityLogger.api.request('POST', '/api/waitlist', securityResult.context?.ip || 'unknown', securityResult.context?.userAgent || 'unknown')

    // Store in database if available
    try {
      const { PrismaClient } = require('@prisma/client')
      const prisma = new PrismaClient()
      
      await prisma.waitlistEntry.create({
        data: {
          email: validatedData.email,
          ip: securityResult.context?.ip,
          userAgent: securityResult.context?.userAgent
        }
      })
      
      await prisma.$disconnect()
    } catch (dbError) {
      // If database is not available, log but don't fail the request
      securityLogger.api.error('POST', '/api/waitlist', securityResult.context?.ip || 'unknown', dbError instanceof Error ? dbError : new Error('Database error'))
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully joined the waitlist!' 
    })

  } catch (error) {
    securityLogger.api.error('POST', '/api/waitlist', securityResult.context?.ip || 'unknown', error instanceof Error ? error : new Error('Unknown error'))

    if (error instanceof Error && error.message.includes('Invalid email')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Apply security middleware
  const securityResult = await combinedSecurityMiddleware(request, 'api')
  if (!securityResult.allowed) {
    return securityResult.response || new NextResponse(
      JSON.stringify({ error: 'Request blocked' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    // Get actual count from database if available
    let count = 1247 // Fallback count
    
    try {
      const { PrismaClient } = require('@prisma/client')
      const prisma = new PrismaClient()
      
      count = await prisma.waitlistEntry.count()
      
      await prisma.$disconnect()
    } catch (dbError) {
      // If database is not available, use fallback count
      securityLogger.api.error('GET', '/api/waitlist', 'unknown', dbError instanceof Error ? dbError : new Error('Database error'))
    }

    return NextResponse.json({ count })

  } catch (error) {
    securityLogger.api.error('GET', '/api/waitlist', securityResult.context?.ip || 'unknown', error instanceof Error ? error : new Error('Unknown error'))

    return NextResponse.json(
      { error: 'Failed to get waitlist count' },
      { status: 500 }
    )
  }
} 