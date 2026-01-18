import { NextRequest } from 'next/server';
import { prisma } from '@/src/lib/db';
import { verifyRefreshToken, generateAccessToken, generateRefreshToken } from '@/src/lib/auth';
import { successResponse, serverErrorResponse, unauthorizedResponse } from '@/src/lib/api-response';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return unauthorizedResponse('Refresh token missing');
    }

    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      return unauthorizedResponse('Invalid refresh token');
    }

    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      if (storedToken) {
        await prisma.refreshToken.delete({ where: { id: storedToken.id } });
      }
      return unauthorizedResponse('Refresh token expired or invalid');
    }

    // Rotate refresh token
    await prisma.refreshToken.delete({ where: { id: storedToken.id } });

    const newAccessToken = generateAccessToken({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    });

    const newRefreshToken = generateRefreshToken({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    });

    await prisma.refreshToken.create({
      data: {
        userId: payload.userId,
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const response = successResponse({
      accessToken: newAccessToken,
    });

    response.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Refresh token error:', error);
    return serverErrorResponse();
  }
}
