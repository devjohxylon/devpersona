const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')
const { z } = require('zod')

const app = express()
const port = process.env.PORT || 3001

// Debug environment variables
console.log('🔧 Environment Debug:')
console.log('   PORT:', process.env.PORT || 'Not set (using 3001)')
console.log('   NODE_ENV:', process.env.NODE_ENV || 'Not set')
console.log('   DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set')
console.log('   GITHUB_ID:', process.env.GITHUB_ID ? 'Set' : 'Not set')
console.log('   GITHUB_SECRET:', process.env.GITHUB_SECRET ? 'Set' : 'Not set')

// Middleware - Railway-specific CORS handling
app.use((req, res, next) => {
  console.log(`🌐 Request: ${req.method} ${req.path} from ${req.headers.origin || 'unknown'}`);
  
  // Set CORS headers for ALL requests (including preflight)
  res.header('Access-Control-Allow-Origin', 'https://www.devpersonality.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Origin, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400'); // Cache preflight for 24 hours
  
  // Handle preflight requests immediately
  if (req.method === 'OPTIONS') {
    console.log('✅ Preflight request handled');
    res.status(200).end();
    return;
  }
  
  next();
});

// Remove the cors middleware since we're handling it manually
// app.use(cors({...}))
// app.options('*', cors())
app.use(express.json())

// Initialize Prisma
const prisma = new PrismaClient()

// Test database connection (but don't fail if it doesn't work)
prisma.$connect()
  .then(() => {
    console.log('✅ Database connected successfully')
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error)
    console.error('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set')
    console.log('⚠️  Continuing without database connection...')
  })

// Validation schemas
const emailSchema = z.string().max(254, 'Email too long').transform(val => val.toLowerCase().trim())
const waitlistSchema = z.object({
  email: emailSchema
})

// Health check
app.get('/health', (req, res) => {
  console.log('🏥 Health check requested');
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    cors: 'enabled',
    origins: ['https://devpersonality.com', 'https://www.devpersonality.com'],
    server: 'railway-backend',
    port: port
  })
})

// Simple test endpoint
app.get('/', (req, res) => {
  console.log('🏠 Root endpoint requested');
  res.json({ 
    message: 'Railway Backend is running!',
    timestamp: new Date().toISOString(),
    cors: 'enabled'
  })
})

// Waitlist API
app.post('/api/waitlist', async (req, res) => {
  console.log('POST /api/waitlist - Origin:', req.headers.origin)
  console.log('POST /api/waitlist - Headers:', req.headers)
  
  try {
    const body = req.body
    
    // Validate input
    const validatedData = waitlistSchema.parse(body)
    const { email } = validatedData

    // Try to store in database, but don't fail if it doesn't work
    try {
      await prisma.waitlistEntry.create({
        data: {
          email: validatedData.email,
          ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown',
          userAgent: req.headers['user-agent'] || 'unknown'
        }
      })
      console.log('✅ Waitlist entry stored in database')
    } catch (dbError) {
      console.log('⚠️  Database storage failed, but continuing:', dbError.message)
    }

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
  console.log('GET /api/waitlist - Origin:', req.headers.origin)
  console.log('GET /api/waitlist - Headers:', req.headers)
  
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
      console.log('Database not available, using fallback count:', dbError instanceof Error ? dbError.message : 'Unknown error')
    }

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
  console.log(`🌐 Server URL: http://localhost:${port}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🔧 Available endpoints:`)
  console.log(`   - GET  /health`)
  console.log(`   - GET  /api/waitlist`)
  console.log(`   - POST /api/waitlist`)
  console.log(`   - GET  /api/admin/waitlist`)
  console.log(`   - GET  /api/auth/github`)
}).on('error', (error) => {
  console.error('❌ Server failed to start:', error)
  process.exit(1)
})

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully')
  await prisma.$disconnect()
  process.exit(0)
}) 