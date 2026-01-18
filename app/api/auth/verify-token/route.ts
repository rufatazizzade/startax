import { NextRequest } from 'next/server';
import { prisma } from '@/src/lib/db';
import { verifyToken } from '@/src/lib/auth';
import { successResponse, unauthorizedResponse, errorResponse } from '@/src/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return unauthorizedResponse('Missing or invalid authorization header');
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);

    if (!payload) {
      return unauthorizedResponse('Invalid or expired token');
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isVerified: true,
      },
    });

    if (!user) {
      return unauthorizedResponse('User not found');
    }

    return successResponse({ user }, 'Token is valid');
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : 'Internal server error');
  }
}
