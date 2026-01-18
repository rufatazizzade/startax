import { NextRequest } from 'next/server';
import { prisma } from '@/src/lib/db';
import { verifyToken, generateAccessToken, generateRefreshToken, JWTPayload } from '@/src/lib/auth';
import { successResponse, unauthorizedResponse, errorResponse } from '@/src/lib/api-response';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return unauthorizedResponse('No refresh token provided');
    }

    const payload = verifyToken(refreshToken) as JWTPayload | null;

    if (!payload) {
      return unauthorizedResponse('Invalid refresh token');
    }

    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      if (storedToken) {
        await prisma.refreshToken.delete({ where: { id: storedToken.id } });
      }
      return unauthorizedResponse('Refresh token expired or invalid');
    }

    // Token rotation: delete old token, create new one
    await prisma.refreshToken.delete({ where: { id: storedToken.id } });

    const user = storedToken.user;
    const newPayload = { userId: user.id, email: user.email, role: user.role };
    const newAccessToken = generateAccessToken(newPayload);
    const newRefreshToken = generateRefreshToken(newPayload);

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    const response = successResponse(
      {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
      'Token refreshed successfully'
    );

    // Store new refresh token in httpOnly cookie
    response.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : 'Internal server error');
  }
}
