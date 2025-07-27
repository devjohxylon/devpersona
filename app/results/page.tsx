'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Clock, 
  GitCommit, 
  GitBranch, 
  Code, 
  TrendingUp, 
  Calendar,
  BarChart3,
  Share2,
  Copy,
  ArrowLeft,
  Sparkles,
  Zap,
  Target,
  Users,
  Star,
  Trophy,
  Heart,
  Coffee
} from 'lucide-react'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeProvider'

interface AnalysisResult {
  personality: {
    id: number
    name: string
    description: string
    category: string
    spiritAnimal: string
    color: string
  }
  stats: {
    totalCommits: number
    averageCommitsPerDay: number
    peakHour: string
    peakHourCount: number
    topDay: string
    topDayCount: number
    averageCommitSize: number
    weekendActivity: number
    topFileTypes: string[]
    commitMessageStyle: string
  }
  insights: {
    timing: string
    frequency: string
    style: string
    specialization: string
  }
  advancedAnalytics?: {
    codeComplexity: string
    bugPrediction: string
    performanceImpact: string
    teamCollaboration: string
  }
  historicalTracking?: {
    personalityEvolution: string
    skillProgression: string
    projectImpact: string
    quarterlyReport: string
  }
  teamInsights?: {
    teamDynamics: string
    collaborationCompatibility: string
    codeReviewPatterns: string
    pairProgrammingSuggestions: string
  }

}

export default function ResultsPage() {
  const { theme } = useTheme()
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Simulate loading and fetch mock data
    const timer = setTimeout(() => {
      setResult({
        personality: {
          id: 1,
          name: "Midnight Cowboy",
          description: "You do your best work when the world sleeps. The night is your canvas, and 2 AM is your peak creative hour. Your IDE is your best friend, and coffee is your fuel.",
          category: "timing",
          spiritAnimal: "The night owl that ships at 2 AM",
          color: "from-purple-500 to-pink-500"
        },
        stats: {
          totalCommits: 847,
          averageCommitsPerDay: 2.3,
          peakHour: "11 PM",
          peakHourCount: 156,
          topDay: "Saturday",
          topDayCount: 89,
          averageCommitSize: 342,
          weekendActivity: 67,
          topFileTypes: ["JavaScript", "TypeScript", "CSS", "HTML", "Python"],
          commitMessageStyle: "Detailed & Descriptive"
        },
        insights: {
          timing: "You're a night owl who codes best between 10 PM and 2 AM",
          frequency: "Consistent daily coder with weekend bursts",
          style: "Thoughtful commit messages that tell a story",
          specialization: "Full-stack developer with frontend focus"
        },
        advancedAnalytics: {
          codeComplexity: "Your code has a cyclomatic complexity score of 3.2 (excellent). You consistently write clean, maintainable code with good separation of concerns.",
          bugPrediction: "Based on your patterns, you have a 12% lower bug rate than average. Your thorough testing approach and code review habits contribute to this.",
          performanceImpact: "Your commits show a 23% improvement in application performance over the last 6 months. You prioritize optimization and efficient algorithms.",
          teamCollaboration: "You're highly collaborative, with 85% of your commits being reviewed by teammates. You actively participate in code reviews and pair programming."
        },
        historicalTracking: {
          personalityEvolution: "Over the past year, you've evolved from a 'Weekend Warrior' to a 'Midnight Cowboy', showing increased dedication and night-time productivity.",
          skillProgression: "Your TypeScript skills have improved by 40%, and you've expanded into DevOps with Docker and CI/CD pipeline contributions.",
          projectImpact: "Your contributions to the main product have resulted in a 15% increase in user engagement and 30% reduction in load times.",
          quarterlyReport: "Q4 2024: 847 commits, 12 new features shipped, 89% code review participation, 3.2 average commit quality score."
        },
        teamInsights: {
          teamDynamics: "You work best with analytical and detail-oriented teammates. Your creative approach balances well with systematic developers.",
          collaborationCompatibility: "High compatibility with Sarah (Backend Specialist) and Mike (DevOps Engineer). Consider pairing for complex features.",
          codeReviewPatterns: "You provide constructive feedback and catch 67% of potential issues before they reach production. Your reviews are thorough but encouraging.",
          pairProgrammingSuggestions: "Schedule pair sessions with Alex (Security Expert) for authentication features, and with Lisa (UX Developer) for frontend optimizations."
        },

      })
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `I'm a ${result?.personality.name} developer!`,
        text: `Discover your developer personality at DevPersonality`,
        url: window.location.href
      })
    } else {
      // Fallback to copy link
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
      }`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className={`w-16 h-16 border-4 rounded-full mx-auto mb-8 ${
              theme === 'dark' 
                ? 'border-white/20 border-t-white' 
                : 'border-black/20 border-t-black'
            }`}
          />
          <h2 className="text-2xl font-bold mb-4">Analyzing Your Code...</h2>
          <p className={`${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>We're reading your GitHub commits to discover your developer personality</p>
        </motion.div>
      </div>
    )
  }

  if (!result) return null

  return (
    <div className={`min-h-screen ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${
        theme === 'dark' 
          ? 'bg-black/80 border-white/10' 
          : 'bg-white/80 border-black/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className={`flex items-center space-x-2 transition-colors ${
              theme === 'dark' 
                ? 'text-gray-400 hover:text-white' 
                : 'text-gray-600 hover:text-black'
            }`}>
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-colors ${
                  theme === 'dark' 
                    ? 'bg-white/10 hover:bg-white/20' 
                    : 'bg-black/10 hover:bg-black/20'
                }`}
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-colors ${
                  theme === 'dark' 
                    ? 'bg-white/10 hover:bg-white/20' 
                    : 'bg-black/10 hover:bg-black/20'
                }`}
              >
                <Copy className="h-4 w-4" />
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Main Personality Card */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`backdrop-blur-md rounded-3xl p-8 border ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/20'
                  : 'bg-gradient-to-br from-gray-50/80 to-white/60 border-gray-200/50'
              }`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className={`inline-flex items-center space-x-3 px-4 py-2 bg-gradient-to-r ${result.personality.color} rounded-full text-white font-medium mb-6`}
              >
                <Sparkles className="h-4 w-4" />
                <span className="text-sm">Your Developer Personality</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`text-5xl md:text-6xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {result.personality.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className={`text-lg leading-relaxed mb-6 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {result.personality.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap items-center gap-4"
              >
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                  theme === 'dark' ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-800'
                }`}>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">{result.personality.spiritAnimal}</span>
                </div>
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                  theme === 'dark' ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-800'
                }`}>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium capitalize">{result.personality.category}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Quick Stats Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className={`backdrop-blur-md rounded-2xl p-6 border ${
                theme === 'dark'
                  ? 'bg-white/10 border-white/20'
                  : 'bg-white/80 border-gray-200/50'
              }`}
            >
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>Total Commits</span>
                  <span className={`font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{result.stats.totalCommits}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>Avg/Day</span>
                  <span className={`font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{result.stats.averageCommitsPerDay}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>Peak Hour</span>
                  <span className={`font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{result.stats.peakHour}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>Weekend %</span>
                  <span className={`font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{result.stats.weekendActivity}%</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className={`backdrop-blur-md rounded-2xl p-6 border ${
                theme === 'dark'
                  ? 'bg-white/10 border-white/20'
                  : 'bg-white/80 border-gray-200/50'
              }`}
            >
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Top Languages</h3>
              <div className="space-y-3">
                {result.stats.topFileTypes.slice(0, 3).map((type, index) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{type}</span>
                    <div className={`w-16 h-2 rounded-full ${
                      theme === 'dark' ? 'bg-white/20' : 'bg-gray-200'
                    }`}>
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500`}
                        style={{ width: `${100 - index * 15}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Dev Achievement Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, type: "spring", stiffness: 200 }}
          className="text-center mb-12"
        >
          <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full font-medium ${
            theme === 'dark' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-500/20 text-yellow-700'
          } border border-yellow-500/30`}>
            <Trophy className="h-5 w-5" />
            <span>git commit -m "feat: personality analysis complete"</span>
          </div>
        </motion.div>

                {/* Condensed Dashboard */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Main Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className={`backdrop-blur-md rounded-2xl p-6 border ${
              theme === 'dark'
                ? 'bg-white/10 border-white/20'
                : 'bg-white/80 border-gray-200/50'
            }`}
          >
            <h3 className={`text-lg font-semibold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Key Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <GitCommit className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{result.stats.totalCommits}</div>
                  <div className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>Total Commits</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{result.stats.peakHour}</div>
                  <div className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>Peak Hour</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{result.stats.topDay}</div>
                  <div className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>Top Day</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{result.stats.averageCommitsPerDay}</div>
                  <div className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>Avg/Day</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Activity & Style Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className={`backdrop-blur-md rounded-2xl p-6 border ${
              theme === 'dark'
                ? 'bg-white/10 border-white/20'
                : 'bg-white/80 border-gray-200/50'
            }`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Commit Activity</h3>
            <div className="h-24 flex items-end space-x-1 mb-6">
              {Array.from({ length: 7 }, (_, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t" 
                     style={{ height: `${Math.random() * 60 + 20}%` }}></div>
              ))}
            </div>
            <div className="flex justify-between text-xs mb-4">
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Mon</span>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Tue</span>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Wed</span>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Thu</span>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Fri</span>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Sat</span>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Sun</span>
            </div>
            
            <div className="border-t pt-4">
              <h4 className={`text-sm font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Commit Style</h4>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>{result.stats.commitMessageStyle}</p>
            </div>
          </motion.div>
        </div>

        {/* File Types Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className={`backdrop-blur-md rounded-2xl p-6 border mb-12 ${
            theme === 'dark'
              ? 'bg-white/10 border-white/20'
              : 'bg-white/80 border-gray-200/50'
          }`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Top Languages & File Types</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              {result.stats.topFileTypes.slice(0, 3).map((type, index) => (
                <div key={type} className="flex items-center justify-between">
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{type}</span>
                  <div className={`w-16 h-2 rounded-full ${
                    theme === 'dark' ? 'bg-white/20' : 'bg-gray-200'
                  }`}>
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r from-green-500 to-blue-500`}
                      style={{ width: `${100 - index * 15}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className={`p-4 rounded-lg ${
              theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'
            }`}>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <span className="font-semibold">Weekend Activity:</span> {result.stats.weekendActivity}% of your commits happen on weekends
              </p>
            </div>
          </div>
        </motion.div>

        {/* Dev Insight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center mb-12"
        >
          <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full font-medium ${
            theme === 'dark' ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-500/20 text-purple-700'
          } border border-purple-500/30`}>
            <Heart className="h-5 w-5" />
            <span>console.log("You're {result.stats.weekendActivity > 50 ? 'a weekend warrior' : 'a weekday warrior'}")</span>
          </div>
        </motion.div>

        {/* Detailed Insights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="grid lg:grid-cols-2 gap-8 mb-16"
        >
          <motion.div
            whileHover={{ y: -4 }}
            className={`backdrop-blur-md rounded-2xl p-8 border ${
              theme === 'dark' 
                ? 'bg-white/10 border-white/20' 
                : 'bg-black/10 border-black/20'
            }`}
          >
            <h3 className={`text-2xl font-bold mb-6 flex items-center space-x-3 ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}>
              <BarChart3 className="h-6 w-6" />
              <span>Your Coding Patterns</span>
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className={`font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>Timing</h4>
                <p className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{result.insights.timing}</p>
              </div>
              <div>
                <h4 className={`font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>Frequency</h4>
                <p className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{result.insights.frequency}</p>
              </div>
              <div>
                <h4 className={`font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>Style</h4>
                <p className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{result.insights.style}</p>
              </div>
              <div>
                <h4 className={`font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>Specialization</h4>
                <p className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{result.insights.specialization}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className={`backdrop-blur-md rounded-2xl p-8 border ${
              theme === 'dark' 
                ? 'bg-white/10 border-white/20' 
                : 'bg-black/10 border-black/20'
            }`}
          >
            <h3 className={`text-2xl font-bold mb-6 flex items-center space-x-3 ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}>
              <Code className="h-6 w-6" />
              <span>Tech Stack</span>
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className={`font-semibold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>Top File Types</h4>
                <div className="flex flex-wrap gap-2">
                  {result.stats.topFileTypes.map((type, index) => (
                    <motion.span
                      key={type}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5 + index * 0.1 }}
                      className={`px-3 py-1 rounded-full text-sm border ${
                        theme === 'dark' 
                          ? 'bg-white/10 border-white/20' 
                          : 'bg-black/10 border-black/20'
                      }`}
                    >
                      {type}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className={`font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>Commit Style</h4>
                <p className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{result.stats.commitMessageStyle}</p>
              </div>
              
              <div>
                <h4 className={`font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>Weekend Activity</h4>
                <p className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{result.stats.weekendActivity}% of your commits happen on weekends</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Advanced Analytics Section */}
        {result.advancedAnalytics && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className={`text-3xl font-bold text-center mb-8 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              Advanced Analytics
            </motion.h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                whileHover={{ y: -4 }}
                className={`backdrop-blur-md rounded-2xl p-8 border ${
                  theme === 'dark'
                    ? 'bg-white/10 border-white/20'
                    : 'bg-black/10 border-black/20'
                }`}
              >
                <h3 className={`text-xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>Code Complexity</h3>
                <p className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{result.advancedAnalytics.codeComplexity}</p>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -4 }}
                className={`backdrop-blur-md rounded-2xl p-8 border ${
                  theme === 'dark'
                    ? 'bg-white/10 border-white/20'
                    : 'bg-black/10 border-black/20'
                }`}
              >
                <h3 className={`text-xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>Bug Prediction</h3>
                <p className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{result.advancedAnalytics.bugPrediction}</p>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -4 }}
                className={`backdrop-blur-md rounded-2xl p-8 border ${
                  theme === 'dark'
                    ? 'bg-white/10 border-white/20'
                    : 'bg-black/10 border-black/20'
                }`}
              >
                <h3 className={`text-xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>Performance Impact</h3>
                <p className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{result.advancedAnalytics.performanceImpact}</p>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -4 }}
                className={`backdrop-blur-md rounded-2xl p-8 border ${
                  theme === 'dark'
                    ? 'bg-white/10 border-white/20'
                    : 'bg-black/10 border-black/20'
                }`}
              >
                <h3 className={`text-xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>Team Collaboration</h3>
                <p className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{result.advancedAnalytics.teamCollaboration}</p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Historical Tracking Section */}
        {result.historicalTracking && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 }}
              className={`text-3xl font-bold text-center mb-8 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              Historical Tracking
            </motion.h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                whileHover={{ y: -4 }}
                className={`backdrop-blur-md rounded-2xl p-8 border ${
                  theme === 'dark'
                    ? 'bg-white/10 border-white/20'
                    : 'bg-black/10 border-black/20'
                }`}
              >
                <h3 className={`text-xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>Personality Evolution</h3>
                <p className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{result.historicalTracking.personalityEvolution}</p>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -4 }}
                className={`backdrop-blur-md rounded-2xl p-8 border ${
                  theme === 'dark'
                    ? 'bg-white/10 border-white/20'
                    : 'bg-black/10 border-black/20'
                }`}
              >
                <h3 className={`text-xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>Skill Progression</h3>
                <p className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{result.historicalTracking.skillProgression}</p>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -4 }}
                className={`backdrop-blur-md rounded-2xl p-8 border ${
                  theme === 'dark'
                    ? 'bg-white/10 border-white/20'
                    : 'bg-black/10 border-black/20'
                }`}
              >
                <h3 className={`text-xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>Project Impact</h3>
                <p className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{result.historicalTracking.projectImpact}</p>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -4 }}
                className={`backdrop-blur-md rounded-2xl p-8 border ${
                  theme === 'dark'
                    ? 'bg-white/10 border-white/20'
                    : 'bg-black/10 border-black/20'
                }`}
              >
                <h3 className={`text-xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>Quarterly Report</h3>
                <p className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{result.historicalTracking.quarterlyReport}</p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Team Insights Section */}
        {result.teamInsights && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9 }}
              className={`text-3xl font-bold text-center mb-8 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              Team Insights
            </motion.h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                whileHover={{ y: -4 }}
                className={`backdrop-blur-md rounded-2xl p-8 border ${
                  theme === 'dark'
                    ? 'bg-white/10 border-white/20'
                    : 'bg-black/10 border-black/20'
                }`}
              >
                <h3 className={`text-xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>Team Dynamics</h3>
                <p className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{result.teamInsights.teamDynamics}</p>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -4 }}
                className={`backdrop-blur-md rounded-2xl p-8 border ${
                  theme === 'dark'
                    ? 'bg-white/10 border-white/20'
                    : 'bg-black/10 border-black/20'
                }`}
              >
                <h3 className={`text-xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>Collaboration Compatibility</h3>
                <p className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{result.teamInsights.collaborationCompatibility}</p>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -4 }}
                className={`backdrop-blur-md rounded-2xl p-8 border ${
                  theme === 'dark'
                    ? 'bg-white/10 border-white/20'
                    : 'bg-black/10 border-black/20'
                }`}
              >
                <h3 className={`text-xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>Code Review Patterns</h3>
                <p className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{result.teamInsights.codeReviewPatterns}</p>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -4 }}
                className={`backdrop-blur-md rounded-2xl p-8 border ${
                  theme === 'dark'
                    ? 'bg-white/10 border-white/20'
                    : 'bg-black/10 border-black/20'
                }`}
              >
                <h3 className={`text-xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>Pair Programming Suggestions</h3>
                <p className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>{result.teamInsights.pairProgrammingSuggestions}</p>
              </motion.div>
            </div>
          </motion.div>
        )}



        {/* Dev Final Touch */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
          className="text-center mb-8"
        >
          <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full font-medium ${
            theme === 'dark' ? 'bg-green-500/20 text-green-300' : 'bg-green-500/20 text-green-700'
          } border border-green-500/30`}>
            <Star className="h-5 w-5" />
            <span>// TODO: Share this with your team</span>
          </div>
        </motion.div>


      </div>
    </div>
  )
} 