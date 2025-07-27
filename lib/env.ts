import { envSchema } from './validation'

// Validate environment variables at startup
const envValidation = envSchema.safeParse(process.env)

if (!envValidation.success) {
  console.error('❌ Environment validation failed:')
  envValidation.error.issues.forEach(error => {
    console.error(`  ${error.path.join('.')}: ${error.message}`)
  })
  process.exit(1)
}

export const env = envValidation.data

// Legacy exports for backward compatibility
export const {
  GITHUB_ID,
  GITHUB_SECRET,
  NEXTAUTH_SECRET,
  NEXTAUTH_URL,
  DATABASE_URL,
  REDIS_URL,
  GITHUB_TOKEN,
  NODE_ENV,
  LOG_LEVEL
} = env 