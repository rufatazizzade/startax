import { NextRequest } from 'next/server';
import { loginSchema } from '@/src/lib/validation';
import { prisma } from '@/src/lib/db';
import { comparePassword, generateAccessToken, generateRefreshToken } from '@/src/lib/auth';
import { successResponse, errorResponse, serverErrorResponse } from '@/src/lib/api-response';

import { createAuditLog } from '@/src/lib/audit';
import { isRateLimited } from '@/src/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (isRateLimited(ip, 5, 60000)) {
      return errorResponse('Too many login attempts. Please try again in a minute.', 429);
    }

    const body = await req.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return errorResponse(result.error.errors[0].message, 422);
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      await createAuditLog(null, 'LOGIN_FAILED', `Failed login attempt for email ${email}`, req);
      return errorResponse('Invalid credentials', 401);
    }

    const isPasswordValid = await comparePassword(password, user.passwordHash);

    if (!isPasswordValid) {
      await createAuditLog(
        user.id,
        'LOGIN_FAILED',
        `Failed login attempt for user ${user.id}`,
        req
      );
      return errorResponse('Invalid credentials', 401);
    }

    if (!user.isVerified) {
      return errorResponse('Please verify your email before logging in', 403);
    }

    await createAuditLog(user.id, 'USER_LOGIN', `User logged in: ${user.id}`, req);

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    const response = successResponse({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      accessToken,
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return serverErrorResponse();
  }
}
