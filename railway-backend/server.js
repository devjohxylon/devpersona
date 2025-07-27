const express = require('express')
const app = express()

// Simple middleware
app.use(express.json())

// Basic endpoints
app.get('/', (req, res) => {
  res.json({ message: 'Backend is working!' })
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/api/waitlist', (req, res) => {
  res.json({ count: 1247 })
})

app.post('/api/waitlist', (req, res) => {
  console.log('Waitlist signup:', req.body.email)
  res.json({ success: true, message: 'Joined waitlist!' })
})

// Start server
const port = process.env.PORT || 3001
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Simple server running on port ${port}`)
}) 