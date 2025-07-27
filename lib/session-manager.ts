import redisClient from './redis'
import crypto from 'crypto'

export interface SessionData {
  userId: string
  username: string
  githubToken: string
  createdAt: number
  expiresAt: number
}

export class SessionManager {
  private readonly sessionPrefix = 'session:'
  private readonly defaultTTL = 3600 // 1 hour in seconds

  async createSession(data: Omit<SessionData, 'createdAt' | 'expiresAt'>): Promise<string> {
    const sessionId = crypto.randomUUID()
    const now = Date.now()
    const expiresAt = now + (this.defaultTTL * 1000)

    const sessionData: SessionData = {
      ...data,
      createdAt: now,
      expiresAt
    }

    try {
      await redisClient.setEx(
        `${this.sessionPrefix}${sessionId}`,
        this.defaultTTL,
        JSON.stringify(sessionData)
      )
      return sessionId
    } catch (error) {
      console.error('Error creating session:', error)
      throw new Error('Failed to create session')
    }
  }

  async getSession(sessionId: string): Promise<SessionData | null> {
    try {
      const sessionData = await redisClient.get(`${this.sessionPrefix}${sessionId}`)
      if (!sessionData) return null

      const session: SessionData = JSON.parse(sessionData)
      
      // Check if session has expired
      if (Date.now() > session.expiresAt) {
        await this.deleteSession(sessionId)
        return null
      }

      return session
    } catch (error) {
      console.error('Error getting session:', error)
      return null
    }
  }

  async updateSession(sessionId: string, updates: Partial<SessionData>): Promise<boolean> {
    try {
      const existingSession = await this.getSession(sessionId)
      if (!existingSession) return false

      const updatedSession = { ...existingSession, ...updates }
      await redisClient.setEx(
        `${this.sessionPrefix}${sessionId}`,
        this.defaultTTL,
        JSON.stringify(updatedSession)
      )
      return true
    } catch (error) {
      console.error('Error updating session:', error)
      return false
    }
  }

  async deleteSession(sessionId: string): Promise<boolean> {
    try {
      const result = await redisClient.del(`${this.sessionPrefix}${sessionId}`)
      return result > 0
    } catch (error) {
      console.error('Error deleting session:', error)
      return false
    }
  }

  async extendSession(sessionId: string, ttlSeconds: number = this.defaultTTL): Promise<boolean> {
    try {
      const session = await this.getSession(sessionId)
      if (!session) return false

      const newExpiresAt = Date.now() + (ttlSeconds * 1000)
      const updatedSession = { ...session, expiresAt: newExpiresAt }

      await redisClient.setEx(
        `${this.sessionPrefix}${sessionId}`,
        ttlSeconds,
        JSON.stringify(updatedSession)
      )
      return true
    } catch (error) {
      console.error('Error extending session:', error)
      return false
    }
  }

  async cleanupExpiredSessions(): Promise<number> {
    try {
      // This is a simplified cleanup - in production, you might want a more sophisticated approach
      const keys = await redisClient.keys(`${this.sessionPrefix}*`)
      let cleanedCount = 0

      for (const key of keys) {
        const sessionData = await redisClient.get(key)
        if (sessionData) {
          const session: SessionData = JSON.parse(sessionData)
          if (Date.now() > session.expiresAt) {
            await redisClient.del(key)
            cleanedCount++
          }
        }
      }

      return cleanedCount
    } catch (error) {
      console.error('Error cleaning up sessions:', error)
      return 0
    }
  }
}

export const sessionManager = new SessionManager() 