import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

// Sensitive fields that should be redacted
const SENSITIVE_FIELDS = [
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
]

// Custom format to redact sensitive data
const redactSensitiveData = winston.format((info) => {
  const redacted = { ...info }
  
  const redactObject = (obj: any): any => {
    if (typeof obj !== 'object' || obj === null) return obj
    
    const redactedObj = { ...obj }
    
    for (const key in redactedObj) {
      if (SENSITIVE_FIELDS.some(field => 
        key.toLowerCase().includes(field.toLowerCase())
      )) {
        redactedObj[key] = '[REDACTED]'
      } else if (typeof redactedObj[key] === 'object') {
        redactedObj[key] = redactObject(redactedObj[key])
      }
    }
    
    return redactedObj
  }
  
  // Redact sensitive data from message and metadata
  if (redacted.message && typeof redacted.message === 'object') {
    redacted.message = redactObject(redacted.message)
  }
  
  if (redacted.meta) {
    redacted.meta = redactObject(redacted.meta)
  }
  
  return redacted
})

// Custom format for structured logging
const structuredFormat = winston.format.combine(
  redactSensitiveData(),
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
)

// Console format for development
const consoleFormat = winston.format.combine(
  redactSensitiveData(),
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
    return `${timestamp} [${level}]: ${message} ${metaStr}`
  })
)

// Create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: structuredFormat,
  defaultMeta: { 
    service: 'github-commit-analyzer',
    environment: process.env.NODE_ENV || 'development'
  },
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: consoleFormat,
      level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug'
    }),
    
    // File transport for errors
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxSize: '20m',
      maxFiles: '14d',
      format: structuredFormat
    }),
    
    // File transport for all logs
    new DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      format: structuredFormat
    })
  ],
  
  // Handle uncaught exceptions
  exceptionHandlers: [
    new DailyRotateFile({
      filename: 'logs/exceptions-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      format: structuredFormat
    })
  ],
  
  // Handle unhandled rejections
  rejectionHandlers: [
    new DailyRotateFile({
      filename: 'logs/rejections-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      format: structuredFormat
    })
  ]
})

// Security-specific logging methods
export const securityLogger = {
  auth: {
    success: (username: string, ip: string, userAgent: string) => {
      logger.info('Authentication successful', {
        event: 'auth_success',
        username,
        ip,
        userAgent: userAgent.substring(0, 100), // Truncate long user agents
        timestamp: new Date().toISOString()
      })
    },
    
    failure: (username: string, ip: string, userAgent: string, reason: string) => {
      logger.warn('Authentication failed', {
        event: 'auth_failure',
        username,
        ip,
        userAgent: userAgent.substring(0, 100),
        reason,
        timestamp: new Date().toISOString()
      })
    },
    
    rateLimit: (ip: string, endpoint: string) => {
      logger.warn('Rate limit exceeded', {
        event: 'rate_limit_exceeded',
        ip,
        endpoint,
        timestamp: new Date().toISOString()
      })
    }
  },
  
  api: {
    request: (method: string, path: string, ip: string, userAgent: string, userId?: string) => {
      logger.info('API request', {
        event: 'api_request',
        method,
        path,
        ip,
        userAgent: userAgent.substring(0, 100),
        userId,
        timestamp: new Date().toISOString()
      })
    },
    
    error: (method: string, path: string, ip: string, error: Error, userId?: string) => {
      logger.error('API error', {
        event: 'api_error',
        method,
        path,
        ip,
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack
        },
        userId,
        timestamp: new Date().toISOString()
      })
    }
  },
  
  security: {
    suspicious: (event: string, details: any, ip: string) => {
      logger.warn('Suspicious activity detected', {
        event: 'suspicious_activity',
        activity: event,
        details,
        ip,
        timestamp: new Date().toISOString()
      })
    },
    
    csrf: (ip: string, path: string) => {
      logger.warn('CSRF attack attempt', {
        event: 'csrf_attempt',
        ip,
        path,
        timestamp: new Date().toISOString()
      })
    }
  }
}

export default logger 