export interface PersonalityType {
  id: string
  name: string
  description: string
  criteria: {
    hourPattern?: number[]
    dayPattern?: number[]
    messageStyle?: string[]
    fileTypes?: string[]
    commitFrequency?: 'high' | 'medium' | 'low'
    weekendActivity?: boolean
  }
  spiritAnimal: string
  color: string
  category: 'timing' | 'style' | 'frequency' | 'specialization' | 'workflow'
}

export const PERSONALITY_TYPES: PersonalityType[] = [
  // Timing-based personalities
  {
    id: 'midnight-cowboy',
    name: 'Midnight Cowboy',
    description: 'You do your best work when the world sleeps',
    criteria: {
      hourPattern: [22, 23, 0, 1, 2, 3],
      dayPattern: [5, 6],
    },
    spiritAnimal: 'The night owl that ships at 2 AM',
    color: 'indigo',
    category: 'timing',
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'You catch the bugs before they wake up',
    criteria: {
      hourPattern: [5, 6, 7, 8, 9],
    },
    spiritAnimal: 'The dawn patrol developer',
    color: 'yellow',
    category: 'timing',
  },
  {
    id: 'lunch-break-hacker',
    name: 'Lunch Break Hacker',
    description: 'Your best ideas come during lunch hours',
    criteria: {
      hourPattern: [11, 12, 13, 14],
    },
    spiritAnimal: 'The midday innovator',
    color: 'orange',
    category: 'timing',
  },
  {
    id: 'weekend-warrior',
    name: 'Weekend Warrior',
    description: 'Your coding passion knows no weekends',
    criteria: {
      dayPattern: [5, 6],
      weekendActivity: true,
    },
    spiritAnimal: 'The weekend coding enthusiast',
    color: 'green',
    category: 'timing',
  },
  {
    id: 'business-hours-builder',
    name: 'Business Hours Builder',
    description: 'You code like clockwork during work hours',
    criteria: {
      hourPattern: [9, 10, 11, 12, 13, 14, 15, 16, 17],
    },
    spiritAnimal: 'The corporate clock watcher',
    color: 'blue',
    category: 'timing',
  },
  {
    id: 'late-night-debugger',
    name: 'Late Night Debugger',
    description: 'Bugs don\'t stand a chance against your midnight focus',
    criteria: {
      hourPattern: [23, 0, 1, 2],
      messageStyle: ['fix', 'debug', 'bug'],
    },
    spiritAnimal: 'The nocturnal problem solver',
    color: 'purple',
    category: 'timing',
  },
  {
    id: 'sunrise-coder',
    name: 'Sunrise Coder',
    description: 'You greet the day with fresh commits',
    criteria: {
      hourPattern: [6, 7, 8],
    },
    spiritAnimal: 'The morning glory developer',
    color: 'amber',
    category: 'timing',
  },
  {
    id: 'happy-hour-hacker',
    name: 'Happy Hour Hacker',
    description: 'Your creativity peaks during happy hour',
    criteria: {
      hourPattern: [17, 18, 19],
    },
    spiritAnimal: 'The evening innovator',
    color: 'pink',
    category: 'timing',
  },
  {
    id: 'all-nighter',
    name: 'All Nighter',
    description: 'You pull coding marathons that last until dawn',
    criteria: {
      hourPattern: [0, 1, 2, 3, 4, 5],
      commitFrequency: 'high',
    },
    spiritAnimal: 'The nocturnal marathon runner',
    color: 'gray',
    category: 'timing',
  },
  {
    id: 'lunch-time-learner',
    name: 'Lunch Time Learner',
    description: 'You use lunch breaks to explore new technologies',
    criteria: {
      hourPattern: [12, 13],
      messageStyle: ['learn', 'study', 'explore'],
    },
    spiritAnimal: 'The midday scholar',
    color: 'teal',
    category: 'timing',
  },

  // Style-based personalities
  {
    id: 'perfectionist-refactorer',
    name: 'Perfectionist Refactorer',
    description: 'Clean code is your religion',
    criteria: {
      messageStyle: ['refactor', 'cleanup', 'improve', 'optimize'],
      commitFrequency: 'high',
    },
    spiritAnimal: 'The meticulous architect',
    color: 'emerald',
    category: 'style',
  },
  {
    id: 'commit-poet',
    name: 'Commit Message Poet',
    description: 'Your commit messages tell stories',
    criteria: {
      messageStyle: ['feat', 'add', 'implement', 'create'],
    },
    spiritAnimal: 'The eloquent storyteller',
    color: 'purple',
    category: 'style',
  },
  {
    id: 'fire-fighter',
    name: 'Fire Fighter',
    description: 'You fix bugs faster than they appear',
    criteria: {
      messageStyle: ['fix', 'bug', 'urgent', 'hotfix'],
      hourPattern: [9, 10, 11, 12, 13, 14, 15, 16, 17],
    },
    spiritAnimal: 'The emergency response coder',
    color: 'red',
    category: 'style',
  },
  {
    id: 'minimalist-committer',
    name: 'Minimalist Committer',
    description: 'You keep commit messages short and sweet',
    criteria: {
      messageStyle: ['fix', 'update', 'add'],
    },
    spiritAnimal: 'The concise communicator',
    color: 'slate',
    category: 'style',
  },
  {
    id: 'documentation-master',
    name: 'Documentation Master',
    description: 'You write commit messages that read like documentation',
    criteria: {
      messageStyle: ['docs', 'document', 'readme'],
      fileTypes: ['.md', '.txt'],
    },
    spiritAnimal: 'The technical writer',
    color: 'cyan',
    category: 'style',
  },
  {
    id: 'emoji-enthusiast',
    name: 'Emoji Enthusiast',
    description: 'Your commits speak in emojis',
    criteria: {
      messageStyle: ['🚀', '✨', '🐛', '🔥', '💯'],
    },
    spiritAnimal: 'The expressive communicator',
    color: 'pink',
    category: 'style',
  },
  {
    id: 'conventional-committer',
    name: 'Conventional Committer',
    description: 'You follow conventional commit standards religiously',
    criteria: {
      messageStyle: ['feat:', 'fix:', 'docs:', 'style:', 'refactor:', 'test:', 'chore:'],
    },
    spiritAnimal: 'The standards keeper',
    color: 'blue',
    category: 'style',
  },
  {
    id: 'storyteller',
    name: 'Storyteller',
    description: 'Your commits read like chapters in a novel',
    criteria: {
      messageStyle: ['implement', 'create', 'add', 'build'],
    },
    spiritAnimal: 'The narrative developer',
    color: 'indigo',
    category: 'style',
  },
  {
    id: 'debug-master',
    name: 'Debug Master',
    description: 'You leave detailed debugging trails in your commits',
    criteria: {
      messageStyle: ['debug', 'trace', 'log', 'investigate'],
    },
    spiritAnimal: 'The forensic coder',
    color: 'orange',
    category: 'style',
  },
  {
    id: 'security-conscious',
    name: 'Security Conscious',
    description: 'You always mention security in your commits',
    criteria: {
      messageStyle: ['security', 'vulnerability', 'auth', 'encrypt'],
    },
    spiritAnimal: 'The security guardian',
    color: 'red',
    category: 'style',
  },

  // Frequency-based personalities
  {
    id: 'binge-coder',
    name: 'Binge Coder',
    description: 'You code in intense, focused sessions',
    criteria: {
      commitFrequency: 'high',
      hourPattern: [18, 19, 20, 21, 22, 23],
    },
    spiritAnimal: 'The marathon coding sprinter',
    color: 'cyan',
    category: 'frequency',
  },
  {
    id: 'steady-stream',
    name: 'Steady Stream',
    description: 'You maintain a consistent flow of small commits',
    criteria: {
      commitFrequency: 'medium',
    },
    spiritAnimal: 'The reliable river',
    color: 'blue',
    category: 'frequency',
  },
  {
    id: 'occasional-committer',
    name: 'Occasional Committer',
    description: 'You commit when you have something meaningful to share',
    criteria: {
      commitFrequency: 'low',
    },
    spiritAnimal: 'The thoughtful contributor',
    color: 'green',
    category: 'frequency',
  },
  {
    id: 'rapid-prototyper',
    name: 'Rapid Prototyper',
    description: 'You iterate quickly with many small commits',
    criteria: {
      commitFrequency: 'high',
      messageStyle: ['wip', 'prototype', 'experiment'],
    },
    spiritAnimal: 'The fast experimenter',
    color: 'yellow',
    category: 'frequency',
  },
  {
    id: 'big-bang-committer',
    name: 'Big Bang Committer',
    description: 'You prefer fewer, larger commits',
    criteria: {
      commitFrequency: 'low',
    },
    spiritAnimal: 'The explosive developer',
    color: 'red',
    category: 'frequency',
  },
  {
    id: 'daily-ritual',
    name: 'Daily Ritual',
    description: 'You commit at least once every day',
    criteria: {
      commitFrequency: 'high',
    },
    spiritAnimal: 'The daily devotee',
    color: 'purple',
    category: 'frequency',
  },
  {
    id: 'weekend-burst',
    name: 'Weekend Burst',
    description: 'You save up your energy for weekend coding sessions',
    criteria: {
      dayPattern: [5, 6],
      commitFrequency: 'high',
    },
    spiritAnimal: 'The weekend warrior',
    color: 'orange',
    category: 'frequency',
  },
  {
    id: 'sprint-coder',
    name: 'Sprint Coder',
    description: 'You work in intense coding sprints',
    criteria: {
      commitFrequency: 'high',
      hourPattern: [9, 10, 11, 12, 13, 14, 15, 16, 17],
    },
    spiritAnimal: 'The agile sprinter',
    color: 'green',
    category: 'frequency',
  },
  {
    id: 'maintenance-mode',
    name: 'Maintenance Mode',
    description: 'You focus on keeping existing code healthy',
    criteria: {
      commitFrequency: 'medium',
      messageStyle: ['maintain', 'update', 'upgrade'],
    },
    spiritAnimal: 'The caretaker',
    color: 'gray',
    category: 'frequency',
  },
  {
    id: 'feature-factory',
    name: 'Feature Factory',
    description: 'You churn out new features at a steady pace',
    criteria: {
      commitFrequency: 'high',
      messageStyle: ['feat', 'add', 'implement'],
    },
    spiritAnimal: 'The feature machine',
    color: 'blue',
    category: 'frequency',
  },

  // Specialization-based personalities
  {
    id: 'full-stack-nomad',
    name: 'Full Stack Nomad',
    description: 'You roam freely across the entire tech stack',
    criteria: {
      fileTypes: ['.js', '.ts', '.py', '.java', '.css', '.html', '.sql'],
    },
    spiritAnimal: 'The versatile tech wanderer',
    color: 'blue',
    category: 'specialization',
  },
  {
    id: 'frontend-artist',
    name: 'Frontend Artist',
    description: 'You craft beautiful user experiences',
    criteria: {
      fileTypes: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.html'],
    },
    spiritAnimal: 'The UI craftsman',
    color: 'pink',
    category: 'specialization',
  },
  {
    id: 'backend-architect',
    name: 'Backend Architect',
    description: 'You build robust server-side systems',
    criteria: {
      fileTypes: ['.py', '.java', '.go', '.rb', '.php', '.sql'],
    },
    spiritAnimal: 'The server sage',
    color: 'indigo',
    category: 'specialization',
  },
  {
    id: 'devops-engineer',
    name: 'DevOps Engineer',
    description: 'You bridge development and operations',
    criteria: {
      fileTypes: ['.yml', '.yaml', '.dockerfile', '.sh', '.tf'],
    },
    spiritAnimal: 'The infrastructure wizard',
    color: 'orange',
    category: 'specialization',
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    description: 'You extract insights from data',
    criteria: {
      fileTypes: ['.py', '.ipynb', '.r', '.sql', '.csv'],
    },
    spiritAnimal: 'The data detective',
    color: 'green',
    category: 'specialization',
  },
  {
    id: 'mobile-developer',
    name: 'Mobile Developer',
    description: 'You build apps for the palm of your hand',
    criteria: {
      fileTypes: ['.swift', '.kt', '.java', '.xml'],
    },
    spiritAnimal: 'The mobile maestro',
    color: 'purple',
    category: 'specialization',
  },
  {
    id: 'game-developer',
    name: 'Game Developer',
    description: 'You create interactive experiences',
    criteria: {
      fileTypes: ['.c', '.cpp', '.cs', '.unity'],
    },
    spiritAnimal: 'The game creator',
    color: 'red',
    category: 'specialization',
  },
  {
    id: 'security-researcher',
    name: 'Security Researcher',
    description: 'You protect systems from threats',
    criteria: {
      fileTypes: ['.py', '.sh', '.c', '.cpp'],
      messageStyle: ['security', 'vulnerability', 'penetration'],
    },
    spiritAnimal: 'The security sentinel',
    color: 'red',
    category: 'specialization',
  },
  {
    id: 'ai-ml-engineer',
    name: 'AI/ML Engineer',
    description: 'You teach machines to learn',
    criteria: {
      fileTypes: ['.py', '.ipynb', '.pt', '.h5'],
      messageStyle: ['model', 'train', 'predict', 'neural'],
    },
    spiritAnimal: 'The machine whisperer',
    color: 'cyan',
    category: 'specialization',
  },
  {
    id: 'blockchain-developer',
    name: 'Blockchain Developer',
    description: 'You build decentralized applications',
    criteria: {
      fileTypes: ['.sol', '.js', '.ts'],
      messageStyle: ['smart contract', 'blockchain', 'web3'],
    },
    spiritAnimal: 'The decentralized dreamer',
    color: 'yellow',
    category: 'specialization',
  },

  // Workflow-based personalities
  {
    id: 'test-driven-developer',
    name: 'Test Driven Developer',
    description: 'You write tests before writing code',
    criteria: {
      fileTypes: ['.test.js', '.spec.js', '.test.ts', '.spec.ts'],
      messageStyle: ['test', 'spec', 'tdd'],
    },
    spiritAnimal: 'The test-first thinker',
    color: 'green',
    category: 'workflow',
  },
  {
    id: 'code-reviewer',
    name: 'Code Reviewer',
    description: 'You focus on code quality and standards',
    criteria: {
      messageStyle: ['review', 'lint', 'format', 'style'],
    },
    spiritAnimal: 'The quality guardian',
    color: 'blue',
    category: 'workflow',
  },
  {
    id: 'pair-programmer',
    name: 'Pair Programmer',
    description: 'You thrive on collaborative coding sessions',
    criteria: {
      messageStyle: ['pair', 'collaborate', 'co-author'],
    },
    spiritAnimal: 'The collaborative coder',
    color: 'purple',
    category: 'workflow',
  },
  {
    id: 'open-source-contributor',
    name: 'Open Source Contributor',
    description: 'You give back to the community',
    criteria: {
      messageStyle: ['contribute', 'community', 'open source'],
    },
    spiritAnimal: 'The community builder',
    color: 'green',
    category: 'workflow',
  },
  {
    id: 'research-developer',
    name: 'Research Developer',
    description: 'You explore new technologies and approaches',
    criteria: {
      messageStyle: ['research', 'explore', 'experiment', 'prototype'],
    },
    spiritAnimal: 'The technology explorer',
    color: 'cyan',
    category: 'workflow',
  },
  {
    id: 'legacy-maintainer',
    name: 'Legacy Maintainer',
    description: 'You keep old systems running smoothly',
    criteria: {
      messageStyle: ['legacy', 'maintain', 'support', 'compatibility'],
    },
    spiritAnimal: 'The legacy guardian',
    color: 'gray',
    category: 'workflow',
  },
  {
    id: 'performance-optimizer',
    name: 'Performance Optimizer',
    description: 'You squeeze every bit of performance from code',
    criteria: {
      messageStyle: ['optimize', 'performance', 'speed', 'efficiency'],
    },
    spiritAnimal: 'The speed demon',
    color: 'yellow',
    category: 'workflow',
  },
  {
    id: 'accessibility-advocate',
    name: 'Accessibility Advocate',
    description: 'You ensure code is accessible to everyone',
    criteria: {
      messageStyle: ['accessibility', 'a11y', 'screen reader'],
    },
    spiritAnimal: 'The inclusive developer',
    color: 'pink',
    category: 'workflow',
  },
  {
    id: 'documentation-champion',
    name: 'Documentation Champion',
    description: 'You believe good docs are as important as good code',
    criteria: {
      fileTypes: ['.md', '.txt', '.rst'],
      messageStyle: ['docs', 'documentation', 'readme'],
    },
    spiritAnimal: 'The knowledge keeper',
    color: 'teal',
    category: 'workflow',
  },
  {
    id: 'continuous-deployer',
    name: 'Continuous Deployer',
    description: 'You ship code continuously and fearlessly',
    criteria: {
      messageStyle: ['deploy', 'release', 'ship', 'ci/cd'],
    },
    spiritAnimal: 'The fearless deployer',
    color: 'orange',
    category: 'workflow',
  },
] 