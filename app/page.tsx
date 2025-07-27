'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Github, ArrowRight, Sparkles, Clock, Code, Users, Search, GitBranch, GitCommit, GitPullRequest, ChevronDown, Star, Zap, Target, TrendingUp } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import WaitlistForm from '@/components/WaitlistForm'
import { useTheme } from '@/components/ThemeProvider'
import Link from 'next/link'

export default function Home() {
  const { theme } = useTheme()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const springY = useSpring(y, { stiffness: 300, damping: 30 })

  const samplePersonalities = [
    {
      id: 1,
      name: "Midnight Cowboy",
      description: "You do your best work when the world sleeps. The night is your canvas, and 2 AM is your peak creative hour.",
      category: "timing",
      spiritAnimal: "The night owl that ships at 2 AM"
    },
    {
      id: 2,
      name: "Perfectionist Refactorer",
      description: "Every line of code is a masterpiece in progress. You believe in the art of clean, maintainable code.",
      category: "style",
      spiritAnimal: "The architect who builds cathedrals"
    },
    {
      id: 3,
      name: "Weekend Warrior",
      description: "Monday to Friday is for meetings. Saturday and Sunday are for shipping features that matter.",
      category: "timing",
      spiritAnimal: "The weekend warrior who conquers code"
    },
    {
      id: 4,
      name: "Rapid Prototyper",
      description: "Speed is your superpower. You iterate fast, fail faster, and learn even faster.",
      category: "frequency",
      spiritAnimal: "The cheetah of code"
    },
    {
      id: 5,
      name: "Documentation Master",
      description: "Code without docs is like a library without a catalog. You believe in the power of clear communication.",
      category: "style",
      spiritAnimal: "The librarian of the digital age"
    },
    {
      id: 6,
      name: "Full Stack Nomad",
      description: "From frontend to backend, from CSS to SQL, you're comfortable everywhere in the stack.",
      category: "specialization",
      spiritAnimal: "The digital nomad of code"
    }
  ]

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} overflow-hidden transition-colors duration-500`}>
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>


      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: springY }}
        >
          <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900/50 via-black to-gray-900/50' : 'bg-gradient-to-br from-gray-50/50 via-white to-gray-50/50'}`}></div>
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} rounded-full blur-3xl`}></div>
          <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'} rounded-full blur-3xl`}></div>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-full text-sm font-medium mb-8 border border-purple-500/30"
              >
                <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <span>Coming Soon - Join the Waitlist</span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <span className="block">Discover Your</span>
                <span className={`block ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  Developer DNA
                </span>
              </motion.h1>
              
              <motion.p 
                className={`text-xl mb-8 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                Your GitHub commits tell a story. We analyze your coding patterns, timing, and style to reveal your unique developer personality. Are you a Midnight Cowboy or a Perfectionist Refactorer?
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="mb-8 space-y-4"
              >
                <WaitlistForm />
                
                <div className="text-center">
                  <Link href="/results">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center space-x-2 px-6 py-3 border rounded-xl transition-all duration-300 ${
                        theme === 'dark' 
                          ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white' 
                          : 'bg-black/10 hover:bg-black/20 border-black/20 text-black'
                      }`}
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>Try Demo Results</span>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>


            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                {/* Main Card */}
                <motion.div
                  className={`backdrop-blur-md rounded-3xl p-8 border transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/10' 
                      : 'bg-black/5 border-black/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <GitCommit className="h-8 w-8 text-white" />
                    </div>
                    <h3 className={`text-2xl font-bold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}>Midnight Cowboy</h3>
                    <p className={`mb-4 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>You do your best work when the world sleeps</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className={`rounded-lg p-3 ${
                        theme === 'dark' ? 'bg-white/5' : 'bg-black/5'
                      }`}>
                        <div className={`font-semibold ${
                          theme === 'dark' ? 'text-white' : 'text-black'
                        }`}>847</div>
                        <div className={`${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>Commits</div>
                      </div>
                      <div className={`rounded-lg p-3 ${
                        theme === 'dark' ? 'bg-white/5' : 'bg-black/5'
                      }`}>
                        <div className={`font-semibold ${
                          theme === 'dark' ? 'text-white' : 'text-black'
                        }`}>11 PM</div>
                        <div className={`${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>Peak Hour</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className={`absolute -top-4 -left-4 backdrop-blur-md rounded-2xl p-4 border ${
                    theme === 'dark' 
                      ? 'bg-white/10 border-white/20' 
                      : 'bg-black/10 border-black/20'
                  }`}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Clock className={`h-6 w-6 ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`} />
                </motion.div>

                <motion.div
                  className={`absolute -bottom-4 -right-4 backdrop-blur-md rounded-2xl p-4 border ${
                    theme === 'dark' 
                      ? 'bg-white/10 border-white/20' 
                      : 'bg-black/10 border-black/20'
                  }`}
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  <TrendingUp className={`h-6 w-6 ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className={`px-4 sm:px-6 lg:px-8 py-32 ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-black'
      }`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">What We Do</h2>
            <p className={`text-xl max-w-4xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              We analyze your GitHub commit history to reveal your unique developer personality. 
              Every commit tells a story about how you code, when you code, and what you care about.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold mb-6">Your Code, Your Story</h3>
              <p className={`text-lg mb-6 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Every developer has a unique coding fingerprint. We analyze your GitHub activity to understand:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}>When you code</h4>
                    <p className={`${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>Early bird or night owl? Weekend warrior or weekday warrior?</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                    theme === 'dark' ? 'bg-white' : 'bg-black'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      theme === 'dark' ? 'bg-black' : 'bg-white'
                    }`}></div>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}>How you commit</h4>
                    <p className={`${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>Detailed messages or quick fixes? Large changes or small increments?</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                    theme === 'dark' ? 'bg-white' : 'bg-black'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      theme === 'dark' ? 'bg-black' : 'bg-white'
                    }`}></div>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}>What you build</h4>
                    <p className={`${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>Frontend, backend, or full-stack? What technologies define your stack?</p>
                  </div>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className={`backdrop-blur-md rounded-3xl p-8 border ${
                theme === 'dark' 
                  ? 'bg-white/10 border-white/20' 
                  : 'bg-black/10 border-black/20'
              }`}>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      theme === 'dark' ? 'bg-white' : 'bg-black'
                    }`}>
                      <Clock className={`h-6 w-6 ${
                        theme === 'dark' ? 'text-black' : 'text-white'
                      }`} />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`}>Timing Analysis</h4>
                      <p className={`${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>Peak coding hours and patterns</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      theme === 'dark' ? 'bg-white' : 'bg-black'
                    }`}>
                      <GitCommit className={`h-6 w-6 ${
                        theme === 'dark' ? 'text-black' : 'text-white'
                      }`} />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`}>Commit Style</h4>
                      <p className={`${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>Message patterns and frequency</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      theme === 'dark' ? 'bg-white' : 'bg-black'
                    }`}>
                      <Code className={`h-6 w-6 ${
                        theme === 'dark' ? 'text-black' : 'text-white'
                      }`} />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`}>Tech Stack</h4>
                      <p className={`${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>Languages and frameworks used</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`px-4 sm:px-6 lg:px-8 py-32 ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}>The Numbers</h2>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>What makes us different</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center group"
            >
              <motion.div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform ${
                  theme === 'dark' ? 'bg-black' : 'bg-gray-900'
                }`}
                whileHover={{ rotate: 5 }}
              >
                <Target className={`h-10 w-10 ${
                  theme === 'dark' ? 'text-white' : 'text-white'
                }`} />
              </motion.div>
              <div className={`text-4xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>1000+</div>
              <div className={`${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>Personality Types</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center group"
            >
              <motion.div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform ${
                  theme === 'dark' ? 'bg-black' : 'bg-gray-900'
                }`}
                whileHover={{ rotate: -5 }}
              >
                <Zap className={`h-10 w-10 ${
                  theme === 'dark' ? 'text-white' : 'text-white'
                }`} />
              </motion.div>
              <div className={`text-4xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>24/7</div>
              <div className={`${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>Real-time Analysis</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center group"
            >
              <motion.div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform ${
                  theme === 'dark' ? 'bg-black' : 'bg-gray-900'
                }`}
                whileHover={{ rotate: 5 }}
              >
                <Star className={`h-10 w-10 ${
                  theme === 'dark' ? 'text-white' : 'text-white'
                }`} />
              </motion.div>
              <div className={`text-4xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>10+</div>
              <div className={`${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>Analysis Factors</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`px-4 sm:px-6 lg:px-8 py-24 ${
        theme === 'dark' ? 'bg-black' : 'bg-gray-50'
      }`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}>
              How We Read Your Code
            </h2>
            <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              We analyze multiple dimensions of your GitHub activity to build your developer profile
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center group"
            >
              <motion.div
                className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ${
                  theme === 'dark' ? 'bg-white' : 'bg-black'
                }`}
                whileHover={{ rotate: 5 }}
              >
                <Clock className={`h-8 w-8 ${
                  theme === 'dark' ? 'text-black' : 'text-white'
                }`} />
              </motion.div>
              <h3 className={`text-lg font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>Timing</h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>When you code</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center group"
            >
              <motion.div
                className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ${
                  theme === 'dark' ? 'bg-white' : 'bg-black'
                }`}
                whileHover={{ rotate: -5 }}
              >
                <GitCommit className={`h-8 w-8 ${
                  theme === 'dark' ? 'text-black' : 'text-white'
                }`} />
              </motion.div>
              <h3 className={`text-lg font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>Style</h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>How you commit</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center group"
            >
              <motion.div
                className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ${
                  theme === 'dark' ? 'bg-white' : 'bg-black'
                }`}
                whileHover={{ rotate: 5 }}
              >
                <GitBranch className={`h-8 w-8 ${
                  theme === 'dark' ? 'text-black' : 'text-white'
                }`} />
              </motion.div>
              <h3 className={`text-lg font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>Stack</h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>What you build</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center group"
            >
              <motion.div
                className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ${
                  theme === 'dark' ? 'bg-white' : 'bg-black'
                }`}
                whileHover={{ rotate: -5 }}
              >
                <Sparkles className={`h-8 w-8 ${
                  theme === 'dark' ? 'text-black' : 'text-white'
                }`} />
              </motion.div>
              <h3 className={`text-lg font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>Frequency</h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>How often you code</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sample Personalities */}
      <section className={`px-4 sm:px-6 lg:px-8 py-32 ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className={`text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}>
              Meet Your Developer Archetypes
            </h2>
            <p className={`text-xl max-w-4xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover which of 1000+ personalities matches your coding style
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {samplePersonalities.map((personality, index) => (
              <motion.div
                key={personality.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
                whileHover={{ y: -8 }}
              >
                <motion.div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity ${
                    theme === 'dark' ? 'bg-white' : 'bg-black'
                  }`}
                  whileHover={{ scale: 1.02 }}
                />
                <motion.div 
                  className={`relative backdrop-blur-md rounded-2xl p-8 border transition-all duration-300 hover:shadow-2xl h-full flex flex-col ${
                    theme === 'dark' 
                      ? 'bg-white/10 border-white/20 hover:border-white/40' 
                      : 'bg-black/10 border-black/20 hover:border-black/40'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full ${
                        theme === 'dark' ? 'bg-white' : 'bg-black'
                      }`}></div>
                      <h3 className={`text-2xl font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`}>
                        {personality.name}
                      </h3>
                    </div>
                    <div className={`text-3xl opacity-20 group-hover:opacity-40 transition-opacity ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}>
                      {personality.category === 'timing' && <Clock />}
                      {personality.category === 'style' && <GitCommit />}
                      {personality.category === 'frequency' && <GitBranch />}
                      {personality.category === 'specialization' && <Code />}
                      {personality.category === 'workflow' && <GitPullRequest />}
                    </div>
                  </div>
                  <p className={`mb-6 leading-relaxed text-lg flex-grow ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {personality.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {personality.spiritAnimal}
                    </div>
                    <div className={`text-xs px-3 py-1 rounded-full uppercase tracking-wide font-medium ${
                      theme === 'dark' 
                        ? 'bg-white text-black' 
                        : 'bg-black text-white'
                    }`}>
                      {personality.category}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16"
          >
            <p className={`text-lg ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              And thousands more personalities waiting to be discovered...
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={`px-4 sm:px-6 lg:px-8 py-32 ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-black'
      }`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold mb-4">Choose Your Adventure</h2>
            <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Start your journey free, unlock your full potential with Pro
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 group ${
                theme === 'dark' 
                  ? 'bg-white/10 border-white/20 hover:border-white/40' 
                  : 'bg-black/10 border-black/20 hover:border-black/40'
              }`}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>Explorer</h3>
                <div className={`text-xs px-3 py-1 rounded-full ${
                  theme === 'dark' 
                    ? 'bg-white/20 text-white' 
                    : 'bg-black/20 text-black'
                }`}>Free</div>
              </div>
              <div className={`text-3xl font-bold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>$0<span className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>/month</span></div>
              <p className={`text-sm mb-6 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>Perfect for trying out your developer personality</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>Your unique personality type</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>Shareable results card</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>1 analysis per month</span>
                </li>
              </ul>
              <div className="text-center">
                <div className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>No credit card required</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 group relative ${
                theme === 'dark' 
                  ? 'bg-white/10 border-white/20 hover:border-white/40' 
                  : 'bg-black/10 border-black/20 hover:border-black/40'
              }`}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                  theme === 'dark' 
                    ? 'bg-white text-black' 
                    : 'bg-black text-white'
                }`}>Most Popular</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>Master</h3>
                <div className={`text-xs px-3 py-1 rounded-full font-bold ${
                  theme === 'dark' 
                    ? 'bg-white text-black' 
                    : 'bg-black text-white'
                }`}>Pro</div>
              </div>
              <div className={`text-3xl font-bold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>$5<span className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>/month</span></div>
              <p className={`text-sm mb-6 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>Unlock your full developer potential</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                  </div>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>Everything in Explorer</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    theme === 'dark' ? 'bg-white' : 'bg-black'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      theme === 'dark' ? 'bg-black' : 'bg-white'
                    }`}></div>
                  </div>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>Unlimited personality analyses</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    theme === 'dark' ? 'bg-white' : 'bg-black'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      theme === 'dark' ? 'bg-black' : 'bg-white'
                    }`}></div>
                  </div>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>Track your evolution over time</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    theme === 'dark' ? 'bg-white' : 'bg-black'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      theme === 'dark' ? 'bg-black' : 'bg-white'
                    }`}></div>
                  </div>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>Team personality insights</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    theme === 'dark' ? 'bg-white' : 'bg-black'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      theme === 'dark' ? 'bg-black' : 'bg-white'
                    }`}></div>
                  </div>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>Advanced coding analytics</span>
                </li>
              </ul>
              <div className="text-center">
                <div className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>Cancel anytime</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  )
} 