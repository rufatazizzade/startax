// NextAuth configuration
// This will be fully implemented in Phase 2
// NextAuth v5 (beta) is installed but not configured yet

import { prisma } from '@/src/lib/db';
import { verifyPassword } from '@/src/lib/auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.passwordHash) {
    return null;
  }

  const isValid = await verifyPassword(password, user.passwordHash);

  if (!isValid) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
    role: user.role,
  };
}
