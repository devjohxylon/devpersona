import { createClient } from 'redis'

// Only create Redis client if REDIS_URL is provided and valid
let redisClient: any = null

if (process.env.REDIS_URL && process.env.REDIS_URL.startsWith('redis://')) {
  redisClient = createClient({
    url: process.env.REDIS_URL,
    socket: {
      reconnectStrategy: (retries: number) => Math.min(retries * 50, 500),
    },
  })

  redisClient.on('error', (err: any) => {
    console.error('Redis Client Error:', err)
  })

  redisClient.on('connect', () => {
    console.log('Redis Client Connected')
  })

  // Initialize connection
  if (!redisClient.isOpen) {
    redisClient.connect().catch(console.error)
  }
}

export default redisClient 