const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')
const { z } = require('zod')

const app = express()
const port = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: [
    'https://devpersonality.com',
    'https://www.devpersonality.com',
    'http://localhost:3000'
  ],
  credentials: true
}))
app.use(express.json())

// Initialize Prisma
const prisma = new PrismaClient()

// Test database connection
prisma.$connect()
  .then(() => {
    console.log('✅ Database connected successfully')
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error)
  })

// Validation schemas
const emailSchema = z.string().max(254, 'Email too long').transform(val => val.toLowerCase().trim())
const waitlistSchema = z.object({
  email: emailSchema
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Waitlist API
app.post('/api/waitlist', async (req, res) => {
  try {
    const body = req.body
    
    // Validate input
    const validatedData = waitlistSchema.parse(body)
    const { email } = validatedData

    // Store in database
    await prisma.waitlistEntry.create({
      data: {
        email: validatedData.email,
        ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown'
      }
    })

    res.json({ 
      success: true, 
      message: 'Successfully joined the waitlist!' 
    })

  } catch (error) {
    console.error('Waitlist submission error:', error)

    if (error.message.includes('Invalid email')) {
      return res.status(400).json({ error: 'Please enter a valid email address' })
    }

    res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
})

app.get('/api/waitlist', async (req, res) => {
  try {
    const count = await prisma.waitlistEntry.count()
    res.json({ count })
  } catch (error) {
    console.error('Waitlist count error:', error)
    res.status(500).json({ error: 'Failed to get waitlist count' })
  }
})

// Admin waitlist endpoint
app.get('/api/admin/waitlist', async (req, res) => {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD || 'devpersonality2024'
    const authHeader = req.headers.authorization
    
    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const entries = await prisma.waitlistEntry.findMany({
      select: {
        email: true,
        createdAt: true,
        ip: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    const totalCount = await prisma.waitlistEntry.count()

    res.json({
      total: totalCount,
      entries: entries
    })

  } catch (error) {
    console.error('Admin waitlist error:', error)
    res.status(500).json({ error: 'Failed to fetch waitlist data' })
  }
})

// GitHub OAuth callback (simplified for backend)
app.get('/api/auth/github', async (req, res) => {
  try {
    const { code, state } = req.query
    
    if (!code) {
      return res.redirect('https://devpersonality.com/?error=no_code')
    }

    // Exchange code for token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_ID,
        client_secret: process.env.GITHUB_SECRET,
        code: code,
        state: state
      })
    })

    const tokenData = await tokenResponse.json()
    
    if (tokenData.error) {
      return res.redirect('https://devpersonality.com/?error=token_error')
    }

    // Get user info
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    })

    const userData = await userResponse.json()
    
    // Redirect to frontend with session data
    res.redirect(`https://devpersonality.com/api/auth/session?sessionId=${tokenData.access_token}&username=${userData.login}`)

  } catch (error) {
    console.error('GitHub OAuth error:', error)
    res.redirect('https://devpersonality.com/?error=oauth_error')
  }
})

// Start server
app.listen(port, () => {
  console.log(`🚀 Backend server running on port ${port}`)
})

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully')
  await prisma.$disconnect()
  process.exit(0)
}) 