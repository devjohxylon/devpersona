import { NextRequest, NextResponse } from 'next/server'

interface Commit {
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
}

async function fetchCommits(username: string, token: string): Promise<Commit[]> {
  const commits: Commit[] = []
  
  try {
    // Get user's repositories
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    })
    
    const repos = await reposResponse.json()
    
    // Get commits from each repository
    for (const repo of repos.slice(0, 10)) { // Limit to 10 repos for performance
      const commitsResponse = await fetch(
        `https://api.github.com/repos/${repo.full_name}/commits?author=${username}&per_page=100`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      )
      
      const repoCommits = await commitsResponse.json()
      commits.push(...repoCommits)
    }
  } catch (error) {
    console.error('Error fetching commits:', error)
  }
  
  return commits
}

function analyzeCommits(commits: Commit[]): AnalysisResult {
  if (commits.length === 0) {
    return getDefaultResult()
  }

  // Analyze timing patterns
  const hourCounts = new Array(24).fill(0)
  const dayCounts = new Array(7).fill(0)
  const weekendCommits = []
  const weekdayCommits = []
  
  commits.forEach(commit => {
    const date = new Date(commit.commit.author.date)
    const hour = date.getHours()
    const day = date.getDay()
    
    hourCounts[hour]++
    dayCounts[day]++
    
    if (day === 0 || day === 6) {
      weekendCommits.push(commit)
    } else {
      weekdayCommits.push(commit)
    }
  })

  // Find peak times
  const peakHour = hourCounts.indexOf(Math.max(...hourCounts))
  const peakHourCount = Math.max(...hourCounts)
  const topDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
    dayCounts.indexOf(Math.max(...dayCounts))
  ]
  const topDayCount = Math.max(...dayCounts)

  // Analyze file types
  const fileTypes = new Map<string, number>()
  commits.forEach(commit => {
    commit.files?.forEach(file => {
      const extension = file.filename.split('.').pop()?.toLowerCase()
      if (extension) {
        fileTypes.set(extension, (fileTypes.get(extension) || 0) + 1)
      }
    })
  })

  const topFileTypes = Array.from(fileTypes.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([ext]) => ext.toUpperCase())

  // Analyze commit messages
  const messageLengths = commits.map(c => c.commit.message.length)
  const avgMessageLength = messageLengths.reduce((a, b) => a + b, 0) / messageLengths.length
  const commitMessageStyle = avgMessageLength > 50 ? 'Detailed & Descriptive' : 'Concise & Direct'

  // Calculate statistics
  const totalCommits = commits.length
  const averageCommitsPerDay = totalCommits / 30 // Assuming last 30 days
  const weekendActivity = Math.round((weekendCommits.length / totalCommits) * 100)
  
  const commitSizes = commits.map(commit => 
    commit.files?.reduce((sum, file) => sum + file.additions + file.deletions, 0) || 0
  )
  const averageCommitSize = Math.round(
    commitSizes.reduce((a, b) => a + b, 0) / commitSizes.length
  )

  // Determine personality based on patterns
  const personality = determinePersonality({
    peakHour,
    weekendActivity,
    averageCommitsPerDay,
    commitMessageStyle,
    topFileTypes,
    averageCommitSize
  })

  return {
    personality,
    stats: {
      totalCommits,
      averageCommitsPerDay: Math.round(averageCommitsPerDay * 10) / 10,
      peakHour: `${peakHour}:00`,
      peakHourCount,
      topDay,
      topDayCount,
      averageCommitSize,
      weekendActivity,
      topFileTypes,
      commitMessageStyle
    },
    insights: {
      timing: getTimingInsight(peakHour, weekendActivity),
      frequency: getFrequencyInsight(averageCommitsPerDay),
      style: getStyleInsight(commitMessageStyle),
      specialization: getSpecializationInsight(topFileTypes)
    }
  }
}

function determinePersonality(patterns: any) {
  const personalities = [
    {
      id: 1,
      name: "Midnight Cowboy",
      description: "You do your best work when the world sleeps. The night is your canvas, and 2 AM is your peak creative hour.",
      category: "timing",
      spiritAnimal: "The night owl that ships at 2 AM",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      name: "Perfectionist Refactorer",
      description: "Every line of code is a masterpiece in progress. You believe in the art of clean, maintainable code.",
      category: "style",
      spiritAnimal: "The architect who builds cathedrals",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      name: "Weekend Warrior",
      description: "Monday to Friday is for meetings. Saturday and Sunday are for shipping features that matter.",
      category: "timing",
      spiritAnimal: "The weekend warrior who conquers code",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      name: "Rapid Prototyper",
      description: "Speed is your superpower. You iterate fast, fail faster, and learn even faster.",
      category: "frequency",
      spiritAnimal: "The cheetah of code",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      name: "Documentation Master",
      description: "Code without docs is like a library without a catalog. You believe in the power of clear communication.",
      category: "style",
      spiritAnimal: "The librarian of the digital age",
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 6,
      name: "Full Stack Nomad",
      description: "From frontend to backend, from CSS to SQL, you're comfortable everywhere in the stack.",
      category: "specialization",
      spiritAnimal: "The digital nomad of code",
      color: "from-pink-500 to-rose-500"
    }
  ]

  // Simple scoring system
  let scores = new Array(personalities.length).fill(0)
  
  if (patterns.peakHour >= 22 || patterns.peakHour <= 4) {
    scores[0] += 3 // Midnight Cowboy
  }
  
  if (patterns.weekendActivity > 50) {
    scores[2] += 3 // Weekend Warrior
  }
  
  if (patterns.averageCommitsPerDay > 3) {
    scores[3] += 2 // Rapid Prototyper
  }
  
  if (patterns.commitMessageStyle === 'Detailed & Descriptive') {
    scores[1] += 2 // Perfectionist Refactorer
    scores[4] += 2 // Documentation Master
  }
  
  if (patterns.topFileTypes.length > 4) {
    scores[5] += 3 // Full Stack Nomad
  }

  const maxScore = Math.max(...scores)
  const personalityIndex = scores.indexOf(maxScore)
  
  return personalities[personalityIndex] || personalities[0]
}

function getTimingInsight(peakHour: number, weekendActivity: number): string {
  if (peakHour >= 22 || peakHour <= 4) {
    return "You're a night owl who codes best when the world sleeps"
  } else if (weekendActivity > 50) {
    return "You prefer weekend coding sessions over weekday sprints"
  } else {
    return "You maintain a consistent daily coding rhythm"
  }
}

function getFrequencyInsight(avgCommits: number): string {
  if (avgCommits > 3) {
    return "High-frequency coder who commits multiple times daily"
  } else if (avgCommits > 1) {
    return "Consistent daily coder with regular contributions"
  } else {
    return "Thoughtful coder who commits when ready"
  }
}

function getStyleInsight(style: string): string {
  if (style === 'Detailed & Descriptive') {
    return "Thoughtful commit messages that tell a story"
  } else {
    return "Concise commit messages that get to the point"
  }
}

function getSpecializationInsight(fileTypes: string[]): string {
  if (fileTypes.length > 4) {
    return "Full-stack developer comfortable across the entire stack"
  } else if (fileTypes.includes('JS') || fileTypes.includes('TS')) {
    return "Frontend-focused developer with modern JavaScript skills"
  } else if (fileTypes.includes('PY') || fileTypes.includes('JAVA')) {
    return "Backend developer with strong server-side expertise"
  } else {
    return "Versatile developer with diverse technical skills"
  }
}

function getDefaultResult(): AnalysisResult {
  return {
    personality: {
      id: 1,
      name: "Midnight Cowboy",
      description: "You do your best work when the world sleeps. The night is your canvas, and 2 AM is your peak creative hour.",
      category: "timing",
      spiritAnimal: "The night owl that ships at 2 AM",
      color: "from-purple-500 to-pink-500"
    },
    stats: {
      totalCommits: 0,
      averageCommitsPerDay: 0,
      peakHour: "N/A",
      peakHourCount: 0,
      topDay: "N/A",
      topDayCount: 0,
      averageCommitSize: 0,
      weekendActivity: 0,
      topFileTypes: [],
      commitMessageStyle: "N/A"
    },
    insights: {
      timing: "No commit data available",
      frequency: "No commit data available",
      style: "No commit data available",
      specialization: "No commit data available"
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { username, token } = await request.json()
    
    // Input validation and sanitization
    if (!username || !token) {
      return NextResponse.json({ error: 'Missing username or token' }, { status: 400 })
    }

    // Validate username format
    if (!/^[a-zA-Z0-9-]+$/.test(username)) {
      return NextResponse.json({ error: 'Invalid username format' }, { status: 400 })
    }

    // Validate token format (GitHub tokens are typically 40+ characters)
    if (typeof token !== 'string' || token.length < 40) {
      return NextResponse.json({ error: 'Invalid token format' }, { status: 400 })
    }

    // Rate limiting check (basic implementation)
    const clientIP = request.headers.get('x-forwarded-for') || request.ip || 'unknown'
    // TODO: Implement proper rate limiting with Redis or similar

    const commits = await fetchCommits(username, token)
    const analysis = analyzeCommits(commits)
    
    return NextResponse.json(analysis)
  } catch (error) {
    // Don't expose internal errors to client
    console.error('Analysis error:', error)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
} 