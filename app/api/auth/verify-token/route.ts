import { NextRequest } from 'next/server';
import { prisma } from '@/src/lib/db';
import { verifyAccessToken } from '@/src/lib/auth';
import { successResponse, unauthorizedResponse, serverErrorResponse } from '@/src/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return unauthorizedResponse('Missing or invalid authorization header');
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyAccessToken(token);

    if (!payload) {
      return unauthorizedResponse('Invalid or expired access token');
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

    return successResponse({ user });
  } catch (error) {
    console.error('Verify token error:', error);
    return serverErrorResponse();
  }
}
