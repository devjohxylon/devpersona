export const MOCK_PERSONALITIES = [
  {
    id: 1,
    name: "Midnight Cowboy",
    description: "You do your best work when the world sleeps. The night is your canvas, and 2 AM is your peak creative hour.",
    color: "blue",
    category: "timing",
    spiritAnimal: "The night owl that ships at 2 AM",
    stats: {
      totalCommits: 847,
      topHour: "23",
      topHourCount: 156,
      topDay: "3",
      topDayCount: 134,
      topKeywords: ["fix", "update", "refactor"],
      commitSizes: { small: 423, medium: 312, large: 112 },
      weekendActivity: 234,
      topFileTypes: [".js", ".ts", ".css", ".md", ".json", ".py"]
    }
  },
  {
    id: 2,
    name: "Perfectionist Refactorer",
    description: "Every line of code is a masterpiece in progress. You believe in the art of clean, maintainable code.",
    color: "green",
    category: "style",
    spiritAnimal: "The architect who builds cathedrals",
    stats: {
      totalCommits: 623,
      topHour: "14",
      topHourCount: 89,
      topDay: "2",
      topDayCount: 98,
      topKeywords: ["refactor", "cleanup", "optimize"],
      commitSizes: { small: 512, medium: 89, large: 22 },
      weekendActivity: 45,
      topFileTypes: [".ts", ".js", ".md", ".yml", ".json", ".sql"]
    }
  },
  {
    id: 3,
    name: "Weekend Warrior",
    description: "Monday to Friday is for meetings. Saturday and Sunday are for shipping features that matter.",
    color: "purple",
    category: "timing",
    spiritAnimal: "The weekend warrior who conquers code",
    stats: {
      totalCommits: 445,
      topHour: "11",
      topHourCount: 67,
      topDay: "6",
      topDayCount: 156,
      topKeywords: ["feature", "add", "implement"],
      commitSizes: { small: 234, medium: 156, large: 55 },
      weekendActivity: 289,
      topFileTypes: [".js", ".css", ".html", ".md", ".json", ".svg"]
    }
  },
  {
    id: 4,
    name: "Rapid Prototyper",
    description: "Speed is your superpower. You iterate fast, fail faster, and learn even faster.",
    color: "orange",
    category: "frequency",
    spiritAnimal: "The cheetah of code",
    stats: {
      totalCommits: 1234,
      topHour: "10",
      topHourCount: 234,
      topDay: "3",
      topDayCount: 189,
      topKeywords: ["wip", "quick", "test"],
      commitSizes: { small: 789, medium: 345, large: 100 },
      weekendActivity: 123,
      topFileTypes: [".js", ".tsx", ".css", ".json", ".md", ".txt"]
    }
  },
  {
    id: 5,
    name: "Documentation Master",
    description: "Code without docs is like a library without a catalog. You believe in the power of clear communication.",
    color: "teal",
    category: "style",
    spiritAnimal: "The librarian of the digital age",
    stats: {
      totalCommits: 567,
      topHour: "15",
      topHourCount: 78,
      topDay: "2",
      topDayCount: 89,
      topKeywords: ["docs", "readme", "update"],
      commitSizes: { small: 445, medium: 89, large: 33 },
      weekendActivity: 67,
      topFileTypes: [".md", ".txt", ".yml", ".js", ".json", ".rst"]
    }
  },
  {
    id: 6,
    name: "Full Stack Nomad",
    description: "From frontend to backend, from CSS to SQL, you're comfortable everywhere in the stack.",
    color: "indigo",
    category: "specialization",
    spiritAnimal: "The digital nomad of code",
    stats: {
      totalCommits: 892,
      topHour: "13",
      topHourCount: 134,
      topDay: "4",
      topDayCount: 145,
      topKeywords: ["fullstack", "api", "frontend"],
      commitSizes: { small: 456, medium: 312, large: 124 },
      weekendActivity: 178,
      topFileTypes: [".js", ".ts", ".py", ".sql", ".css", ".html"]
    }
  }
];

export const MOCK_USER = {
  id: 1,
  username: "johndoe",
  name: "John Doe",
  avatar: "https://avatars.githubusercontent.com/u/1234567?v=4",
  email: "john@example.com"
};

export const MOCK_ANALYSIS = {
  id: 1,
  userId: 1,
  personalityType: MOCK_PERSONALITIES[0],
  stats: MOCK_PERSONALITIES[0].stats,
  createdAt: new Date().toISOString()
}; 