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

**Made with ❤️ for the developer community** # Updated for Railway deployment with devpersonality.com domain
