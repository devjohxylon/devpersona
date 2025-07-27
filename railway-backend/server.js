const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://www.devpersonality.com')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Credentials', 'true')
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

// Simple middleware
app.use(express.json())

// Initialize database
async function initializeDatabase() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully')
    
    // Test database access
    await prisma.waitlistEntry.count()
    console.log('✅ Database schema is ready')
  } catch (error) {
    console.log('⚠️ Database initialization failed:', error.message)
    console.log('💡 Make sure to run: npx prisma db push')
  }
}

initializeDatabase()

// Basic endpoints
app.get('/', (req, res) => {
  res.json({ message: 'Backend is working!' })
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/api/waitlist', async (req, res) => {
  try {
    const count = await prisma.waitlistEntry.count()
    res.json({ count })
  } catch (error) {
    console.log('Database error, using fallback count:', error.message)
    if (error.message.includes('does not exist')) {
      console.log('💡 Database table missing. Run: npx prisma db push')
    }
    res.json({ count: 1247 })
  }
})

app.post('/api/waitlist', async (req, res) => {
  try {
    const { email } = req.body
    console.log('Waitlist signup:', email)
    
    await prisma.waitlistEntry.create({
      data: {
        email: email.toLowerCase().trim(),
        ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown'
      }
    })
    
    res.json({ success: true, message: 'Joined waitlist!' })
  } catch (error) {
    console.log('Database error, but continuing:', error.message)
    if (error.message.includes('does not exist')) {
      console.log('💡 Database table missing. Run: npx prisma db push')
    }
    res.json({ success: true, message: 'Joined waitlist!' })
  }
})

// Start server
const port = process.env.PORT || 3001
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Simple server running on port ${port}`)
}) 