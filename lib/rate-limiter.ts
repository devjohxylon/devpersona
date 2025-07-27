import redisClient from './redis'

export interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
  keyPrefix: string // Redis key prefix
}

export class RateLimiter {
  private config: RateLimitConfig

  constructor(config: RateLimitConfig) {
    this.config = config
  }

  async checkLimit(identifier: string): Promise<{
    allowed: boolean
    remaining: number
    resetTime: number
  }> {
    const key = `${this.config.keyPrefix}:${identifier}`
    const now = Date.now()
    const windowStart = now - this.config.windowMs

    try {
      // Get current requests in window
      const requests = await redisClient.zRangeByScore(key, windowStart, '+inf')
      const currentCount = requests.length

      if (currentCount >= this.config.maxRequests) {
        // Rate limit exceeded
        const oldestRequestArr = await redisClient.zRange(key, 0, 0)
        const oldestRequest = oldestRequestArr.length > 0 ? parseInt(oldestRequestArr[0]) : now
        const resetTime = oldestRequest + this.config.windowMs

        return {
          allowed: false,
          remaining: 0,
          resetTime
        }
      }

      // Add current request
      await redisClient.zAdd(key, { score: now, value: now.toString() })
      await redisClient.expire(key, Math.ceil(this.config.windowMs / 1000))

      return {
        allowed: true,
        remaining: this.config.maxRequests - currentCount - 1,
        resetTime: now + this.config.windowMs
      }
    } catch (error) {
      console.error('Rate limiting error:', error)
      // Fail open - allow request if Redis is down
      return {
        allowed: true,
        remaining: this.config.maxRequests,
        resetTime: now + this.config.windowMs
      }
    }
  }

  async resetLimit(identifier: string): Promise<void> {
    const key = `${this.config.keyPrefix}:${identifier}`
    try {
      await redisClient.del(key)
    } catch (error) {
      console.error('Error resetting rate limit:', error)
    }
  }
}

// Pre-configured rate limiters with enhanced security
export const authRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 3, // 3 auth attempts per 15 minutes (more restrictive)
  keyPrefix: 'auth'
})

export const apiRateLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 20, // 20 API calls per minute (more restrictive)
  keyPrefix: 'api'
})

export const analysisRateLimiter = new RateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 5, // 5 analyses per hour (more restrictive)
  keyPrefix: 'analysis'
})

export const waitlistRateLimiter = new RateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 3, // 3 waitlist submissions per hour
  keyPrefix: 'waitlist'
})

export const securityRateLimiter = new RateLimiter({
  windowMs: 5 * 60 * 1000, // 5 minutes
  maxRequests: 10, // 10 security dashboard requests per 5 minutes
  keyPrefix: 'security'
}) 