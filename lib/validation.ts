import { z } from 'zod'

// Username validation (GitHub username format)
export const usernameSchema = z
  .string()
  .min(1, 'Username is required')
  .max(39, 'Username too long')
  .transform(val => val.toLowerCase().trim())

// Email validation
export const emailSchema = z
  .string()
  .max(254, 'Email too long')
  .transform(val => val.toLowerCase().trim())

// GitHub OAuth code validation
export const oauthCodeSchema = z
  .string()
  .min(1, 'Authorization code is required')
  .max(100, 'Authorization code too long')

// Session ID validation
export const sessionIdSchema = z
  .string()
  .min(1, 'Session ID is required')
  .max(100, 'Session ID too long')

// API request validation
export const apiRequestSchema = z.object({
  username: usernameSchema,
  timeframe: z.enum(['1h', '24h', '7d', '30d']).default('24h'),
  limit: z.number().int().min(1).max(100).default(10)
})

// Analysis request validation
export const analysisRequestSchema = z.object({
  username: usernameSchema,
  includePrivate: z.boolean().default(false),
  maxCommits: z.number().int().min(1).max(1000).default(500)
})

// Waitlist form validation
export const waitlistSchema = z.object({
  email: emailSchema
})

// Security event validation
export const securityEventSchema = z.object({
  event: z.string().min(1).max(100),
  ip: z.string().max(45).optional(),
  userAgent: z.string().max(500).optional(),
  details: z.record(z.string(), z.any()).optional(),
  level: z.enum(['info', 'warn', 'error']).default('info'),
  severity: z.number().int().min(1).max(5).default(1)
})

// Rate limit configuration validation
export const rateLimitConfigSchema = z.object({
  windowMs: z.number().int().min(1000).max(86400000), // 1 second to 24 hours
  maxRequests: z.number().int().min(1).max(10000),
  keyPrefix: z.string().min(1).max(50)
})

// Environment variables validation
export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  GITHUB_ID: z.string().min(1, 'GitHub Client ID is required'),
  GITHUB_SECRET: z.string().min(1, 'GitHub Client Secret is required'),
  NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET must be at least 32 characters'),
  NEXTAUTH_URL: z.string().min(1, 'NEXTAUTH_URL is required'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  REDIS_URL: z.string().optional(),
  GITHUB_TOKEN: z.string().min(40, 'GITHUB_TOKEN must be at least 40 characters').optional(),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info')
})

// Sanitize user input for XSS prevention
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

// Validate and sanitize GitHub username
export function validateGitHubUsername(username: string): string | null {
  try {
    return usernameSchema.parse(username)
  } catch {
    return null
  }
}

// Validate and sanitize email
export function validateEmail(email: string): string | null {
  try {
    return emailSchema.parse(email)
  } catch {
    return null
  }
}

// Type exports for TypeScript
export type UsernameInput = z.infer<typeof usernameSchema>
export type EmailInput = z.infer<typeof emailSchema>
export type ApiRequest = z.infer<typeof apiRequestSchema>
export type AnalysisRequest = z.infer<typeof analysisRequestSchema>
export type WaitlistInput = z.infer<typeof waitlistSchema>
export type SecurityEvent = z.infer<typeof securityEventSchema>
export type EnvConfig = z.infer<typeof envSchema> 