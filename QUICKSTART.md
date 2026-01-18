# Startax - Quick Start Guide

Get up and running with Startax in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Git

## Step 1: Clone and Install

```bash
git clone <repository-url>
cd startax
npm install
```

## Step 2: Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Update `.env` with your database URL:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/startax_db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

## Step 3: Database Setup

Generate Prisma Client:

```bash
npm run db:generate
```

Push the schema to your database:

```bash
npm run db:push
```

Or create a migration:

```bash
npm run db:migrate
```

## Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## What You'll See

- **Homepage**: Landing page with features overview
- **/login**: Login page placeholder
- **/register**: Registration page placeholder
- **/dashboard**: Dashboard placeholder
- **/admin**: Admin panel placeholder
- **/api/health**: Health check endpoint

## Available Commands

| Command              | Description              |
| -------------------- | ------------------------ |
| `npm run dev`        | Start development server |
| `npm run build`      | Build for production     |
| `npm run start`      | Start production server  |
| `npm run lint`       | Run ESLint               |
| `npm run format`     | Format code              |
| `npm run type-check` | TypeScript check         |
| `npm run db:studio`  | Open Prisma Studio       |

## Project Structure

```
startax/
├── app/              # Next.js pages and API routes
├── src/
│   ├── components/   # Reusable UI components
│   ├── lib/          # Utilities and helpers
│   ├── types/        # TypeScript types
│   └── constants/    # App constants
├── prisma/           # Database schema
└── Configuration files
```

## Next Steps

1. **Set up your database** - Create tables with `npm run db:push`
2. **Explore the code** - Check out `src/` and `app/` directories
3. **Read the docs** - See [README.md](README.md) for full documentation
4. **Start building** - Phase 2 features are ready to implement!

## Useful Tools

- **Prisma Studio**: Visual database editor

  ```bash
  npm run db:studio
  ```

- **VS Code Extensions**:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - Prisma

## Need Help?

- 📖 [Full Documentation](README.md)
- 🤝 [Contributing Guide](CONTRIBUTING.md)
- 📊 [Project Summary](PROJECT_SUMMARY.md)

## Quick Database Check

Test your database connection:

```bash
npm run db:studio
```

This opens Prisma Studio where you can view and edit your database.

## Production Build

Test the production build:

```bash
npm run build
npm run start
```

Your app will be available at [http://localhost:3000](http://localhost:3000)

## Common Issues

### Database Connection Error

- Make sure PostgreSQL is running
- Check your DATABASE_URL in `.env`
- Ensure database exists: `createdb startax_db`

### Port 3000 Already in Use

Stop the process using port 3000 or change the port:

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill

# Or run on different port
PORT=3001 npm run dev
```

### Prisma Client Not Generated

Run the generation command:

```bash
npm run db:generate
```

---

**You're all set!** 🎉 Start building amazing tax management features with Startax!
