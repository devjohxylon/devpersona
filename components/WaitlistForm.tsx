'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Check, ArrowRight, Sparkles, Users } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'
import { validateEmail } from '@/lib/validation'

export default function WaitlistForm() {
  const { theme } = useTheme()
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [waitlistCount, setWaitlistCount] = useState(0)

  // Fetch waitlist count on component mount
  useEffect(() => {
    const fetchWaitlistCount = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://devpersona-production.up.railway.app'
        const response = await fetch(`${apiUrl}/api/waitlist`)
        if (response.ok) {
          const data = await response.json()
          setWaitlistCount(data.count)
        }
      } catch (error) {
        console.error('Failed to fetch waitlist count:', error)
        // Fallback to a reasonable number if API fails
        setWaitlistCount(1247)
      }
    }

    fetchWaitlistCount()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email.trim()) {
      setError('Please enter your email address')
      return
    }

    // Enhanced email validation using Zod
    const validatedEmail = validateEmail(email)
    if (!validatedEmail) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://devpersona-production.up.railway.app'
      const response = await fetch(`${apiUrl}/api/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: validatedEmail }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        setWaitlistCount(prev => prev + 1)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onSubmit={handleSubmit}
            className="relative"
          >
            <div className="relative max-w-md mx-auto">
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError('')
                  }}
                  className={`w-full pl-12 pr-20 py-4 backdrop-blur-md border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-white/10 text-white placeholder-gray-400 focus:ring-white/30 focus:border-white/40' 
                      : 'bg-black/10 text-black placeholder-gray-500 focus:ring-black/30 focus:border-black/40'
                  } ${
                    error ? 'border-red-400 focus:ring-red-400/30' : 
                    theme === 'dark' ? 'border-white/20' : 'border-black/20'
                  }`}
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 disabled:cursor-not-allowed font-medium ${
                    theme === 'dark'
                      ? 'bg-white hover:bg-gray-100 disabled:bg-white/20 text-black disabled:text-gray-400'
                      : 'bg-black hover:bg-gray-800 disabled:bg-black/20 text-white disabled:text-gray-400'
                  }`}
                >
                  {isLoading ? (
                    <motion.div 
                      className={`animate-spin rounded-full h-4 w-4 border-b-2 ${
                        theme === 'dark' ? 'border-black' : 'border-white'
                      }`}
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <>
                      <span className="text-sm font-medium">Join</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
              
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-center"
                >
                  <p className="text-sm text-red-400">{error}</p>
                </motion.div>
              )}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-center"
              >
                <div className={`flex items-center justify-center space-x-2 text-xs ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                }`}>
                  <Users className="h-3 w-3" />
                  <span>{waitlistCount.toLocaleString()} developers have joined</span>
                </div>
              </motion.div>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Check className="h-8 w-8 text-white" />
            </motion.div>
            
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`text-xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              You're on the list!
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={`${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              We'll notify you as soon as we launch. Get ready to discover your developer personality!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className={`mt-6 flex items-center justify-center space-x-2 text-sm ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>Early access coming soon</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 