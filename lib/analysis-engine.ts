import { PersonalityType, PERSONALITY_TYPES } from './personality-types'

export interface Commit {
  sha: string
  commit: {
    message: string
    author: {
      date: string
    }
  }
  files?: Array<{
    filename: string
    additions: number
    deletions: number
  }>
}

export interface AnalysisStats {
  totalCommits: number
  hourPattern: { [hour: number]: number }
  dayPattern: { [day: number]: number }
  messageStyle: { [keyword: string]: number }
  fileTypes: { [extension: string]: number }
  commitSizes: { small: number; medium: number; large: number }
  averageTimeBetweenCommits: number
  weekendActivity: number
  mostActiveHour: number
  mostActiveDay: number
  topKeywords: string[]
  topFileTypes: string[]
}

export function analyzeCommits(commits: Commit[]): AnalysisStats {
  const stats: AnalysisStats = {
    totalCommits: commits.length,
    hourPattern: {},
    dayPattern: {},
    messageStyle: {},
    fileTypes: {},
    commitSizes: { small: 0, medium: 0, large: 0 },
    averageTimeBetweenCommits: 0,
    weekendActivity: 0,
    mostActiveHour: 0,
    mostActiveDay: 0,
    topKeywords: [],
    topFileTypes: [],
  }

  // Analyze each commit
  commits.forEach((commit, index) => {
    const date = new Date(commit.commit.author.date)
    const hour = date.getHours()
    const day = date.getDay()
    
    // Hour pattern
    stats.hourPattern[hour] = (stats.hourPattern[hour] || 0) + 1
    
    // Day pattern
    stats.dayPattern[day] = (stats.dayPattern[day] || 0) + 1
    
    // Weekend activity
    if (day === 0 || day === 6) {
      stats.weekendActivity++
    }
    
    // Message style analysis
    const message = commit.commit.message.toLowerCase()
    const keywords = ['fix', 'bug', 'refactor', 'cleanup', 'feat', 'add', 'update', 'improve', 'optimize', 'wip']
    keywords.forEach(keyword => {
      if (message.includes(keyword)) {
        stats.messageStyle[keyword] = (stats.messageStyle[keyword] || 0) + 1
      }
    })
    
    // Emoji detection removed for compatibility
    
    // File type analysis
    if (commit.files) {
      commit.files.forEach(file => {
        const extension = file.filename.split('.').pop()?.toLowerCase()
        if (extension) {
          stats.fileTypes[`.${extension}`] = (stats.fileTypes[`.${extension}`] || 0) + 1
        }
        
        // Commit size analysis
        const totalChanges = file.additions + file.deletions
        if (totalChanges <= 10) stats.commitSizes.small++
        else if (totalChanges <= 100) stats.commitSizes.medium++
        else stats.commitSizes.large++
      })
    }
  })
  
  // Calculate time between commits
  if (commits.length > 1) {
    let totalTimeDiff = 0
    for (let i = 1; i < commits.length; i++) {
      const timeDiff = new Date(commits[i-1].commit.author.date).getTime() - 
                      new Date(commits[i].commit.author.date).getTime()
      totalTimeDiff += timeDiff
    }
    stats.averageTimeBetweenCommits = totalTimeDiff / (commits.length - 1) / (1000 * 60) // in minutes
  }
  
  // Find most active hour and day
  stats.mostActiveHour = Object.entries(stats.hourPattern)
    .sort(([,a], [,b]) => b - a)[0]?.[0] ? parseInt(Object.entries(stats.hourPattern)
    .sort(([,a], [,b]) => b - a)[0][0]) : 0
    
  stats.mostActiveDay = Object.entries(stats.dayPattern)
    .sort(([,a], [,b]) => b - a)[0]?.[0] ? parseInt(Object.entries(stats.dayPattern)
    .sort(([,a], [,b]) => b - a)[0][0]) : 0
  
  // Top keywords and file types
  stats.topKeywords = Object.entries(stats.messageStyle)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([keyword]) => keyword)
    
  stats.topFileTypes = Object.entries(stats.fileTypes)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([ext]) => ext)
  
  return stats
}

export function determinePersonalityType(stats: AnalysisStats): PersonalityType {
  const scores: { [key: string]: number } = {}
  
  PERSONALITY_TYPES.forEach(type => {
    let score = 0
    
    // Hour pattern matching
    if (type.criteria.hourPattern) {
      const nightHours = type.criteria.hourPattern
      const nightActivity = nightHours.reduce((sum, hour) => sum + (stats.hourPattern[hour] || 0), 0)
      const nightPercentage = nightActivity / stats.totalCommits
      if (nightPercentage > 0.3) score += 3
      if (nightPercentage > 0.5) score += 2
    }
    
    // Day pattern matching
    if (type.criteria.dayPattern) {
      const weekendDays = type.criteria.dayPattern
      const weekendActivity = weekendDays.reduce((sum, day) => sum + (stats.dayPattern[day] || 0), 0)
      const weekendPercentage = weekendActivity / stats.totalCommits
      if (weekendPercentage > 0.3) score += 3
      if (weekendPercentage > 0.5) score += 2
    }
    
    // Message style matching
    if (type.criteria.messageStyle) {
      const keywords = type.criteria.messageStyle
      const keywordMatches = keywords.reduce((sum, keyword) => sum + (stats.messageStyle[keyword] || 0), 0)
      const keywordPercentage = keywordMatches / stats.totalCommits
      if (keywordPercentage > 0.2) score += 3
      if (keywordPercentage > 0.4) score += 2
    }
    
    // File type matching
    if (type.criteria.fileTypes) {
      const fileTypes = type.criteria.fileTypes
      const fileTypeMatches = fileTypes.reduce((sum, ext) => sum + (stats.fileTypes[ext] || 0), 0)
      const fileTypePercentage = fileTypeMatches / Object.values(stats.fileTypes).reduce((a, b) => a + b, 0)
      if (fileTypePercentage > 0.3) score += 3
      if (fileTypePercentage > 0.5) score += 2
    }
    
    // Commit frequency matching
    if (type.criteria.commitFrequency) {
      const avgCommitsPerDay = stats.totalCommits / 30 // Assuming 30 days of data
      if (type.criteria.commitFrequency === 'high' && avgCommitsPerDay > 3) score += 2
      if (type.criteria.commitFrequency === 'medium' && avgCommitsPerDay > 1 && avgCommitsPerDay <= 3) score += 2
      if (type.criteria.commitFrequency === 'low' && avgCommitsPerDay <= 1) score += 2
    }
    
    // Weekend activity matching
    if (type.criteria.weekendActivity !== undefined) {
      const weekendPercentage = stats.weekendActivity / stats.totalCommits
      if (type.criteria.weekendActivity && weekendPercentage > 0.3) score += 2
      if (!type.criteria.weekendActivity && weekendPercentage < 0.2) score += 2
    }
    
    scores[type.id] = score
  })
  
  // Return the personality type with the highest score
  const bestMatch = Object.entries(scores)
    .sort(([,a], [,b]) => b - a)[0]
  
  return PERSONALITY_TYPES.find(type => type.id === bestMatch[0]) || PERSONALITY_TYPES[0]
} 