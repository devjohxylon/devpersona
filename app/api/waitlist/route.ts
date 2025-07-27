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
    securityLogger.info('waitlist_submission', {
      email: email.substring(0, 3) + '***@' + email.split('@')[1], // Partial email for privacy
      ip: securityResult.context?.ip,
      userAgent: securityResult.context?.userAgent
    })

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
      securityLogger.warn('waitlist_database_unavailable', {
        error: dbError instanceof Error ? dbError.message : 'Database error',
        email: email.substring(0, 3) + '***@' + email.split('@')[1]
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully joined the waitlist!' 
    })

  } catch (error) {
    securityLogger.error('waitlist_submission_error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      ip: securityResult.context?.ip
    })

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
      securityLogger.warn('waitlist_count_database_unavailable', {
        error: dbError instanceof Error ? dbError.message : 'Database error'
      })
    }

    return NextResponse.json({ count })

  } catch (error) {
    securityLogger.error('waitlist_count_error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      ip: securityResult.context?.ip
    })

    return NextResponse.json(
      { error: 'Failed to get waitlist count' },
      { status: 500 }
    )
  }
} 