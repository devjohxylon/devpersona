# GitHub Personality Analyzer

A viral web app that analyzes GitHub commit history to generate fun developer personality profiles. Users login with GitHub OAuth, we analyze their commit patterns, and generate shareable personality results like "Midnight Cowboy Coder" or "Perfectionist Refactorer."

## 🔒 Security Features

This application implements enterprise-grade security measures:

- **Rate Limiting**: Redis-based rate limiting for all API endpoints
- **Session Management**: Secure Redis-based session storage with automatic expiration
- **Security Monitoring**: Real-time threat detection and logging
- **CSRF Protection**: OAuth state validation to prevent cross-site request forgery
- **Input Validation**: Comprehensive input sanitization and validation
- **Secure Logging**: Structured logging with sensitive data redaction
- **Security Headers**: Content Security Policy and other security headers
- **Token Security**: Secure token storage in HTTP-only cookies

## 🛡️ Security Dashboard

Access the security monitoring dashboard at `/admin/security` to view:
- Real-time security events
- Rate limiting statistics
- Authentication failures
- Suspicious activity detection
- System health metrics

## 🚀 Features

- **GitHub OAuth Integration** - Secure authentication with GitHub
- **Commit Pattern Analysis** - Analyzes timing, frequency, message style, and file types
- **10 Personality Types** - From "Midnight Cowboy" to "Emoji Enthusiast"
- **Shareable Results** - Beautiful cards designed for social media sharing
- **Real-time Analysis** - Fast analysis of up to 500 recent commits
- **Mobile Responsive** - Works perfectly on all devices

## 🎯 Personality Types

1. **🌙 Midnight Cowboy Coder** - Codes late nights, commits between 11PM-3AM
2. **✨ Perfectionist Refactorer** - Lots of small commits, uses words like "cleanup", "refactor"
3. **🏃‍♂️ Weekend Warrior** - Most activity on Sat/Sun
4. **📝 Commit Message Poet** - Detailed, thoughtful commit messages
5. **🚒 Fire Fighter** - Commits during business hours, uses "fix", "bug", "urgent"
6. **🏕️ Full Stack Nomad** - Touches all file types - JS, CSS, backend, configs
7. **📚 Documentation Lover** - High ratio of README/doc commits
8. **🎨 Emoji Enthusiast** - Uses emojis in commit messages
9. **🌅 Early Bird Coder** - Codes early mornings, commits before 9AM
10. **⚡ Binge Coder** - Intense coding sessions with high frequency

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js with GitHub OAuth
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel (Frontend) + Railway (Backend)
- **Animations**: Framer Motion

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/github-personality-analyzer.git
   cd github-personality-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # GitHub OAuth
   GITHUB_ID=your_github_client_id
   GITHUB_SECRET=your_github_client_secret
   
   # GitHub API Token (for fetching public data)
   GITHUB_TOKEN=your_github_personal_access_token
   
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/devpersonality"
   
   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_key
   
   # Redis (for rate limiting and sessions)
   REDIS_URL=redis://localhost:6379
   
   # Logging
   LOG_LEVEL=info
   ```

4. **Set up GitHub OAuth App**
   - Go to GitHub Settings > Developer settings > OAuth Apps
   - Create a new OAuth App
   - Set Authorization callback URL to `http://localhost:3000/api/auth/callback/github`
   - Copy Client ID and Client Secret to your `.env.local`

5. **Set up GitHub Personal Access Token**
   - Go to GitHub Settings > Developer settings > Personal access tokens
   - Generate a new token with `public_repo` scope
   - Add to your `.env.local` as `GITHUB_TOKEN`

6. **Set up database**
   ```bash
   # Install Prisma CLI
   npm install -g prisma
   
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   ```

7. **Run the development server**
   ```bash
   npm run dev
   ```

8. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Backend (Railway)
1. Connect your GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Deploy the database and API

## 📊 Analysis Algorithm

The app analyzes these patterns from GitHub commits:

- **Commit Timing**: What hours/days do they code?
- **Commit Frequency**: Daily, binge coder, or sporadic?
- **Message Style**: Detailed, lazy ("fix stuff"), or emoji user?
- **File Types**: Frontend, backend, config files, docs?
- **Commit Size**: Big changes or small incremental updates?
- **Weekend Activity**: Work-life balance or coding addict?

## 🎨 UI/UX Features

- **Mobile-first responsive design**
- **Fast loading with progress indicators**
- **Shareable results designed for social media**
- **Professional color scheme (soft white and dark gray)**
- **Smooth animations with Framer Motion**

## 💰 Monetization Strategy

- **Free**: Basic personality analysis
- **Premium ($5/month)**:
  - Historical personality tracking
  - Team personality analysis
  - Advanced insights
  - Custom shareable cards

## 📈 Success Metrics

- GitHub OAuth conversions
- Social shares of results
- Return users checking multiple profiles
- Premium upgrades

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- GitHub API for providing commit data
- NextAuth.js for seamless OAuth integration
- Tailwind CSS for beautiful styling
- Framer Motion for smooth animations

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact us at support@devpersonality.com

---

**Made with ❤️ for the developer community** 