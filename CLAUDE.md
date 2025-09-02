# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application for a Community CRT Wiki project, using TypeScript, Tailwind CSS v4, and Prisma with PostgreSQL.

## Development Commands

```bash
# Install dependencies
pnpm install

# Run development server with Turbopack
pnpm dev

# Build for production with Turbopack
pnpm build

# Start production server
pnpm start

# Prisma commands
npx prisma generate    # Generate Prisma Client
npx prisma migrate dev  # Run migrations in development
npx prisma studio      # Open Prisma Studio to browse data
npx prisma db push     # Push schema changes without migrations
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with PostCSS
- **Database**: PostgreSQL with Prisma ORM
- **Package Manager**: pnpm with workspaces

### Directory Structure
- `/app` - Next.js App Router pages and layouts
- `/prisma` - Database schema and migrations
- `/generated/prisma` - Generated Prisma Client (custom output path)
- `/public` - Static assets

### Database Schema
The application manages CRT (Cathode Ray Tube) monitor data with two main models:
- `CRT` - Main entity with extensive technical specifications
- `CRTImage` - Related images with descriptions

### Key Configuration
- Prisma Client is generated in `/generated/prisma` instead of default location
- Development uses Turbopack for faster builds
- Database connection configured via `DATABASE_URL` environment variable