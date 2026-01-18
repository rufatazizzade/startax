# Contributing to Startax

Thank you for your interest in contributing to Startax! This document provides guidelines and best practices for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/startax.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Set up environment variables: `cp .env.example .env`
6. Run the development server: `npm run dev`

## Development Workflow

### Before Making Changes

1. Pull the latest changes from main: `git pull origin main`
2. Create a new branch for your feature or bugfix
3. Make sure the project builds: `npm run build`
4. Make sure tests pass: `npm test` (when tests are added)

### Code Style

We use ESLint and Prettier to maintain consistent code style:

```bash
# Format your code
npm run format

# Check formatting
npm run format:check

# Lint your code
npm run lint

# Type check
npm run type-check
```

**Pre-commit hooks** will automatically run these checks before each commit.

### Coding Standards

- **TypeScript**: Use TypeScript strict mode. Avoid `any` types when possible.
- **Naming Conventions**:
  - Components: PascalCase (e.g., `UserProfile.tsx`)
  - Functions: camelCase (e.g., `getUserProfile`)
  - Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
  - Files: kebab-case for utilities (e.g., `api-response.ts`)
- **Imports**: Use path aliases (`@/src/...`) for cleaner imports
- **Comments**: Write comments for complex logic, but prefer self-documenting code
- **Error Handling**: Use try-catch blocks and proper error messages

### Component Guidelines

1. **Functional Components**: Use function components with hooks
2. **Props Interface**: Define TypeScript interfaces for all component props
3. **Reusability**: Create reusable components in `src/components/`
4. **Styling**: Use Tailwind CSS classes (no inline styles)
5. **Accessibility**: Include proper ARIA attributes and semantic HTML

Example component structure:

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded ${variant === 'primary' ? 'bg-primary-600' : 'bg-secondary-600'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### Database Changes

When modifying the database schema:

1. Update `prisma/schema.prisma`
2. Generate Prisma Client: `npm run db:generate`
3. Create a migration: `npm run db:migrate`
4. Update TypeScript types if needed in `src/types/`

### API Routes

When creating new API routes:

1. Place in `app/api/` directory
2. Use proper HTTP methods (GET, POST, PUT, DELETE)
3. Validate input with Zod schemas
4. Use helper functions from `src/lib/api-response.ts`
5. Add proper error handling
6. Document the endpoint in README.md

Example API route:

```typescript
import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/src/lib/api-response';
import { userProfileSchema } from '@/src/lib/validation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = userProfileSchema.parse(body);

    // Process request

    return successResponse(data, 'Profile updated successfully');
  } catch (error) {
    return errorResponse('Invalid request', 400);
  }
}
```

## Pull Request Process

1. **Update Documentation**: Update README.md if you add features
2. **Write Tests**: Add tests for new features (when test suite is ready)
3. **Check Build**: Ensure `npm run build` succeeds
4. **Commit Messages**: Use clear, descriptive commit messages
   - Format: `type: description`
   - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
   - Example: `feat: add user profile edit form`
5. **Pull Request Description**:
   - Describe what changes were made
   - Reference any related issues
   - Include screenshots for UI changes
   - List any breaking changes

### PR Checklist

- [ ] Code follows the style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings or errors
- [ ] Tests added/updated (when applicable)
- [ ] Build passes
- [ ] Branch is up to date with main

## Issue Reporting

When reporting bugs or requesting features:

1. **Search first**: Check if the issue already exists
2. **Use templates**: Fill out the issue template completely
3. **Be specific**: Include steps to reproduce, expected behavior, and actual behavior
4. **Include details**: OS, browser, Node version, etc.
5. **Screenshots**: Add screenshots for UI issues

## Development Tips

- Use `npm run db:studio` to view/edit database records visually
- Check browser console for client-side errors
- Use VS Code with recommended extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - Prisma
- Enable TypeScript strict mode in your editor
- Use React DevTools for debugging components

## Questions?

If you have questions about contributing:

- Check the README.md
- Review existing code in the codebase
- Open a discussion on GitHub
- Reach out to maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for making Startax better! 🎉
