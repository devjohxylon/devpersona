# DevPersonality Backend

Express.js backend API for DevPersonality, deployed on Railway.

## Features

- Waitlist API (`/api/waitlist`)
- Admin dashboard API (`/api/admin/waitlist`)
- GitHub OAuth callback (`/api/auth/github`)
- PostgreSQL database with Prisma
- CORS configured for frontend

## Environment Variables

```bash
# Database
DATABASE_URL=postgresql://...

# GitHub OAuth
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# Admin
ADMIN_PASSWORD=your_admin_password

# Server
PORT=3001
```

## API Endpoints

- `POST /api/waitlist` - Submit email to waitlist
- `GET /api/waitlist` - Get waitlist count
- `GET /api/admin/waitlist` - Admin access to waitlist data
- `GET /api/auth/github` - GitHub OAuth callback
- `GET /health` - Health check

## Deployment

This backend is designed to be deployed on Railway alongside PostgreSQL and Redis services. 