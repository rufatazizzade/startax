import { NextRequest } from 'next/server';
import { prisma } from '@/src/lib/db';
import { successResponse, errorResponse } from '@/src/lib/api-response';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refreshToken')?.value;

    if (refreshToken) {
      await prisma.refreshToken.deleteMany({
        where: { token: refreshToken },
      });
    }

    const response = successResponse(null, 'Logged out successfully');

    // Clear refresh token cookie
    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });

    return response;
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : 'Internal server error');
  }
}
