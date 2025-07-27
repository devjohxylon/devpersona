import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/AuthProvider'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevPersonality - GitHub Commit Analyzer',
  description: 'Discover your developer personality based on your GitHub commit patterns',
  keywords: 'GitHub, developer, personality, commits, analysis',
  openGraph: {
    title: 'DevPersonality - GitHub Commit Analyzer',
    description: 'Discover your developer personality based on your GitHub commit patterns',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 