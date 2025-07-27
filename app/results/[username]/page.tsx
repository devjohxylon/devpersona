'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Share2, 
  Twitter, 
  Github, 
  ArrowLeft, 
  Clock, 
  Calendar, 
  FileText, 
  MessageSquare,
  TrendingUp,
  GitCommit
} from 'lucide-react'
import { MOCK_PERSONALITIES, MOCK_ANALYSIS } from '@/lib/mock-data'

interface ResultsPageProps {
  params: {
    username: string
  }
}

export default function ResultsPage({ params }: ResultsPageProps) {
  const [personality, setPersonality] = useState(MOCK_ANALYSIS.personalityType)
  const [stats, setStats] = useState(MOCK_ANALYSIS.stats)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate loading for demo
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const shareOnTwitter = () => {
    if (!personality) return
    
    const text = `I'm a ${personality.name}! 🚀\n\nDiscover your developer personality at DevPersonality`
    const url = window.location.href
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank')
  }

  const shareOnGitHub = () => {
    if (!personality) return
    
    const text = `I'm a ${personality.name}! 🚀\n\nDiscover your developer personality at DevPersonality`
    const url = window.location.href
    const githubUrl = `https://github.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(githubUrl, '_blank')
  }

  const downloadImage = () => {
    // This would require html2canvas or similar library
    // For now, just copy the URL
    navigator.clipboard.writeText(window.location.href)
    alert('Results URL copied to clipboard!')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 dark:text-gray-300">Analyzing your GitHub personality...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 dark:text-red-400 mb-4">{error}</p>
          <a href="/" className="text-accent-500 hover:text-accent-600 dark:text-accent-400 dark:hover:text-accent-300">
            ← Back to Home
          </a>
        </div>
      </div>
    )
  }

  if (!personality || !stats) {
    return null
  }

  const formatHour = (hour: number) => {
    return new Date(2000, 0, 1, hour).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    })
  }

  const formatDay = (day: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[day]
  }

  const topHour = stats.topHour
  const topHourCount = stats.topHourCount
  const topDay = stats.topDay
  const topDayCount = stats.topDayCount

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </a>
            <div className="flex items-center space-x-4">
              <button
                onClick={shareOnTwitter}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors"
              >
                <Twitter className="h-4 w-4" />
                <span>Share</span>
              </button>
              <button
                onClick={downloadImage}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span>Copy Link</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Results Card */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className={`relative bg-gradient-to-br from-${personality.color}-500 via-${personality.color}-600 to-${personality.color}-700 p-12 text-white overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
              </div>
              
              <div className="relative text-center">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-medium mb-6">
                  <GitCommit className="h-4 w-4" />
                  <span>Developer Personality</span>
                </div>
                
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="w-6 h-6 rounded-full bg-white opacity-90"></div>
                  <h1 className="text-5xl md:text-6xl font-bold">{personality.name}</h1>
                </div>
                
                <p className="text-2xl opacity-90 mb-4 leading-relaxed">{personality.description}</p>
                <p className="text-lg opacity-75">@{params.username}</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="p-12">
              {/* Key Stats */}
              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Coding DNA</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-900 dark:to-accent-800 rounded-xl p-6 border border-accent-200 dark:border-accent-700">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center">
                          <Clock className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white text-lg">
                            {formatHour(parseInt(topHour))}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Peak coding hour
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {topHourCount} commits at this time
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900 dark:to-success-800 rounded-xl p-6 border border-success-200 dark:border-success-700">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-success-500 rounded-lg flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white text-lg">
                            {formatDay(parseInt(topDay))}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Most productive day
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {topDayCount} commits on this day
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-warning-50 to-warning-100 dark:from-warning-900 dark:to-warning-800 rounded-xl p-6 border border-warning-200 dark:border-warning-700">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-warning-500 rounded-lg flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white text-lg">
                            {stats.totalCommits}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Total commits analyzed
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        From your repositories
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white text-lg">
                            {stats.topKeywords.slice(0, 2).join(', ')}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Top commit keywords
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Your message style
                      </p>
                    </div>
                  </div>
                </div>

                {/* Spirit Animal */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600 h-full">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Spirit Animal</h4>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <GitCommit className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {personality.spiritAnimal}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        This represents your coding essence
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Insights */}
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Commit Analysis</h4>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Commit Size Distribution</h5>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-300">Small (≤10 lines)</span>
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">{stats.commitSizes.small}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-warning-500 rounded-full"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-300">Medium (11-100 lines)</span>
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">{stats.commitSizes.medium}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-danger-500 rounded-full"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-300">Large (&gt;100 lines)</span>
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">{stats.commitSizes.large}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Weekend Activity</h5>
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl font-bold text-accent-500">
                          {Math.round((stats.weekendActivity / stats.totalCommits) * 100)}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          of your commits happen on weekends
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Tech Stack</h4>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Top File Types</h5>
                    <div className="flex flex-wrap gap-2">
                      {stats.topFileTypes.slice(0, 6).map((fileType, index) => (
                        <span key={index} className="px-3 py-1 bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 rounded-full text-sm font-medium">
                          {fileType}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Section */}
              <div className="bg-gradient-to-r from-accent-50 to-accent-100 dark:from-accent-900 dark:to-accent-800 rounded-xl p-8 border border-accent-200 dark:border-accent-700">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Share Your Results</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Let the world know about your developer personality!
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={shareOnTwitter}
                      className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                      <span>Share on Twitter</span>
                    </button>
                    <button
                      onClick={shareOnGitHub}
                      className="flex items-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      <span>Share on GitHub</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Analyze Another */}
          <div className="mt-12 text-center">
            <a
              href="/"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              <span>Analyze Another Developer</span>
              <ArrowLeft className="h-5 w-5 rotate-180" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 