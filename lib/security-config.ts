// Security configuration constants
export const SECURITY_CONFIG = {
  // Session configuration
  SESSION: {
    MAX_AGE: 3600, // 1 hour
    CLEANUP_INTERVAL: 300000, // 5 minutes
    MAX_SESSIONS_PER_USER: 5
  },

  // Rate limiting configuration
  RATE_LIMITS: {
    AUTH: {
      WINDOW_MS: 15 * 60 * 1000, // 15 minutes
      MAX_REQUESTS: 3
    },
    API: {
      WINDOW_MS: 60 * 1000, // 1 minute
      MAX_REQUESTS: 20
    },
    ANALYSIS: {
      WINDOW_MS: 60 * 60 * 1000, // 1 hour
      MAX_REQUESTS: 5
    },
    WAITLIST: {
      WINDOW_MS: 60 * 60 * 1000, // 1 hour
      MAX_REQUESTS: 3
    },
    SECURITY: {
      WINDOW_MS: 5 * 60 * 1000, // 5 minutes
      MAX_REQUESTS: 10
    }
  },

  // Input validation
  VALIDATION: {
    MAX_USERNAME_LENGTH: 39,
    MAX_EMAIL_LENGTH: 254,
    MAX_COMMIT_MESSAGE_LENGTH: 500,
    MAX_FILE_PATH_LENGTH: 200
  },

  // Security headers
  HEADERS: {
    CSP: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: https://avatars.githubusercontent.com; font-src 'self' data:; connect-src 'self' https://api.github.com https://github.com https://*.vercel.app https://*.railway.app; frame-ancestors 'none'; base-uri 'self'; form-action 'self';",
    HSTS: 'max-age=31536000; includeSubDomains; preload',
    X_FRAME_OPTIONS: 'DENY',
    X_CONTENT_TYPE_OPTIONS: 'nosniff',
    REFERRER_POLICY: 'origin-when-cross-origin',
    PERMISSIONS_POLICY: 'camera=(), microphone=(), geolocation=()'
  },

  // CORS configuration
  CORS: {
    ALLOWED_ORIGINS: [
      'http://localhost:3000',
      'https://localhost:3000',
      'https://*.vercel.app',
      'https://*.railway.app'
    ],
    ALLOWED_METHODS: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    ALLOWED_HEADERS: ['Content-Type', 'Authorization', 'X-Requested-With'],
    MAX_AGE: 86400 // 24 hours
  },

  // Suspicious activity detection
  SUSPICIOUS_ACTIVITY: {
    MAX_REQUESTS_PER_MINUTE: 100,
    SUSPICIOUS_USER_AGENTS: [
      'curl',
      'wget',
      'python',
      'bot',
      'crawler',
      'spider'
    ],
    SUSPICIOUS_PATTERNS: [
      /\.\.\//, // Directory traversal
      /<script/i, // XSS attempts
      /union\s+select/i, // SQL injection
      /javascript:/i, // JavaScript protocol
      /on\w+\s*=/i // Event handlers
    ]
  },

  // Logging configuration
  LOGGING: {
    SENSITIVE_FIELDS: [
      'password',
      'token',
      'secret',
      'key',
      'authorization',
      'cookie',
      'github_token',
      'access_token',
      'client_secret',
      'csrf',
      'state',
      'code',
      'private_key',
      'api_key',
      'auth_token',
      'bearer',
      'session_id',
      'oauth_state'
    ],
    MAX_LOG_SIZE: '20m',
    MAX_LOG_FILES: '14d',
    LOG_LEVEL: process.env.LOG_LEVEL || 'info'
  },

  // Environment validation
  ENV: {
    REQUIRED_VARS: [
      'GITHUB_ID',
      'GITHUB_SECRET',
      'NEXTAUTH_SECRET',
      'NEXTAUTH_URL',
      'DATABASE_URL'
    ],
    OPTIONAL_VARS: [
      'REDIS_URL',
      'GITHUB_TOKEN',
      'LOG_LEVEL'
    ]
  }
}

// Security utility functions
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development'
}

export function getSecurityLevel(): 'low' | 'medium' | 'high' {
  if (isProduction()) {
    return 'high'
  }
  return isDevelopment() ? 'low' : 'medium'
}

// Security policy enforcement
export function shouldEnforceStrictSecurity(): boolean {
  return isProduction() || process.env.FORCE_SECURITY === 'true'
}

export function shouldLogSensitiveData(): boolean {
  return isDevelopment() && process.env.LOG_SENSITIVE === 'true'
} 