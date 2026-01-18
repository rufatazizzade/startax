# Startax - AI-Powered Tax Assistant SaaS

Startax is a production-ready SaaS application that helps small businesses manage their taxes with AI-powered insights, automated calculations, and intelligent guidance.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS 3
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** NextAuth.js v5
- **Validation:** Zod
- **Password Hashing:** bcryptjs
- **JWT:** jsonwebtoken

## 📁 Project Structure

```
startax/
├── app/                        # Next.js App Router
│   ├── (auth)/                # Authentication routes (grouped)
│   ├── (dashboard)/           # Protected dashboard routes
│   ├── admin/                 # Admin panel routes
│   ├── api/                   # API routes
│   ├── fonts/                 # Custom fonts
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── src/
│   ├── components/            # Reusable React components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── index.ts
│   ├── lib/                   # Utilities and helpers
│   │   ├── auth.ts            # JWT & password hashing
│   │   ├── auth-config.ts     # NextAuth configuration
│   │   ├── db.ts              # Prisma client singleton
│   │   ├── validation.ts      # Zod schemas
│   │   ├── api-response.ts    # API response helpers
│   │   ├── logger.ts          # Logging utility
│   │   └── middleware.ts      # Auth middleware
│   ├── services/              # Business logic layer
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts
│   └── constants/             # Application constants
│       └── index.ts
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── public/                    # Static assets
├── .env.example               # Environment variables template
├── .eslintrc.json             # ESLint configuration
├── .prettierrc                # Prettier configuration
├── next.config.mjs            # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies
└── README.md                  # This file
```

## 📊 Database Schema

The application includes the following models:

- **User** - User authentication and basic info
- **UserProfile** - Business information and preferences
- **Account** - OAuth account linking (NextAuth)
- **Session** - User sessions (NextAuth)
- **VerificationToken** - Email verification (NextAuth)
- **ChatMessage** - AI chat conversation history
- **TaxRule** - Tax rules database
- **TaxDeadline** - Tax deadline tracking
- **Subscription** - Subscription management (Stripe)
- **AuditLog** - Security and compliance logging

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd startax
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the following variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/startax_db?schema=public"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Add these when ready
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
OPENAI_API_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""
```

### 4. Database Setup

Generate Prisma Client:

```bash
npm run db:generate
```

Create and run migrations:

```bash
npm run db:migrate
```

Or push schema to database (for development):

```bash
npm run db:push
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Authentication

The application supports multiple authentication methods:

1. **Email/Password** - Traditional credentials-based auth
2. **Google OAuth** - Social authentication (configure in `.env`)

### Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript type checking
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema to database
npm run db:migrate   # Create and run migration
npm run db:studio    # Open Prisma Studio
```

## 🎨 Design System

### Color Palette

- **Primary (Blue):** Professional, trustworthy FinTech colors
- **Secondary (Gray):** Neutral tones for text and backgrounds
- **Accent (Cyan):** Highlights and interactive elements
- **Success (Green):** Positive actions and confirmations
- **Warning (Yellow):** Cautions and alerts
- **Danger (Red):** Errors and destructive actions

### Typography

- **Font Family:** Geist Sans (primary), Geist Mono (code)
- **Font Sizes:** Responsive scale from xs to 9xl
- **Font Weights:** 100-900 variable

## 🔧 Configuration Files

### TypeScript (`tsconfig.json`)

- Strict mode enabled
- Path aliases configured (`@/*`)
- Latest ECMAScript features

### ESLint (`.eslintrc.json`)

- Next.js recommended rules
- Prettier integration
- Custom rules for code quality

### Prettier (`.prettierrc`)

- 2-space indentation
- Single quotes
- 100 character line width
- Tailwind class sorting

### Tailwind (`tailwind.config.ts`)

- Custom color palette
- Extended typography scale
- Custom shadows and border radius
- Responsive design utilities

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import repository to Vercel
3. Configure environment variables
4. Deploy!

### Railway (Database)

1. Create new PostgreSQL database
2. Copy connection string to `DATABASE_URL`
3. Run migrations

### Docker (Optional)

```bash
# Build image
docker build -t startax .

# Run container
docker run -p 3000:3000 startax
```

## 🔒 Security Features

- **Password Hashing:** bcryptjs with salt rounds
- **JWT Tokens:** Secure session management
- **CSRF Protection:** Built-in with NextAuth
- **Input Validation:** Zod schema validation
- **SQL Injection Prevention:** Prisma ORM
- **Audit Logging:** Track all important actions

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token

### User Endpoints

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Chat Endpoints

- `POST /api/chat/send` - Send message to AI
- `GET /api/chat/history` - Get chat history

### Tax Endpoints

- `GET /api/tax/rules` - Get tax rules
- `GET /api/tax/deadlines` - Get tax deadlines
- `POST /api/tax/calculate` - Calculate taxes

### Subscription Endpoints

- `POST /api/subscription/create` - Create subscription
- `PUT /api/subscription/update` - Update subscription
- `DELETE /api/subscription/cancel` - Cancel subscription

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e
```

## 📦 Environment Variables

| Variable                 | Description                  | Required |
| ------------------------ | ---------------------------- | -------- |
| `DATABASE_URL`           | PostgreSQL connection string | ✅ Yes   |
| `NEXTAUTH_SECRET`        | NextAuth secret key          | ✅ Yes   |
| `NEXTAUTH_URL`           | Application URL              | ✅ Yes   |
| `GOOGLE_CLIENT_ID`       | Google OAuth client ID       | ⬜ No    |
| `GOOGLE_CLIENT_SECRET`   | Google OAuth secret          | ⬜ No    |
| `OPENAI_API_KEY`         | OpenAI API key               | ⬜ No    |
| `STRIPE_SECRET_KEY`      | Stripe secret key            | ⬜ No    |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key       | ⬜ No    |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@startax.com or join our Slack channel.

## 🎯 Roadmap

### Phase 1: Foundation (Current)

- ✅ Next.js 14 setup
- ✅ Prisma + PostgreSQL
- ✅ Authentication infrastructure
- ✅ UI component library
- ✅ Database schema

### Phase 2: Core Features (Next)

- ⬜ User registration & login
- ⬜ AI chat integration (OpenAI)
- ⬜ Tax calculator
- ⬜ Deadline reminders
- ⬜ User dashboard

### Phase 3: Advanced Features

- ⬜ Stripe subscription management
- ⬜ Multi-country support
- ⬜ Document upload & parsing
- ⬜ Report generation
- ⬜ Email notifications

### Phase 4: Enterprise

- ⬜ Team collaboration
- ⬜ API access
- ⬜ White-label options
- ⬜ Advanced analytics

## 💡 Tips

- Use `npm run db:studio` to visually explore your database
- Run `npm run format` before committing code
- Check types with `npm run type-check`
- Use environment variables for all secrets
- Follow the existing code patterns and conventions

---

Built with ❤️ by the Startax Team
