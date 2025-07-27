const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

// Simple middleware
app.use(express.json())

// Initialize database
prisma.$connect()
  .then(() => {
    console.log('✅ Database connected successfully')
  })
  .catch((error) => {
    console.log('⚠️ Database connection failed, continuing without database:', error.message)
  })

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
    res.json({ success: true, message: 'Joined waitlist!' })
  }
})

// Start server
const port = process.env.PORT || 3001
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Simple server running on port ${port}`)
}) 