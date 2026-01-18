import { NextRequest } from 'next/server';
import { prisma } from '@/src/lib/db';
import {
  hashPassword,
  isValidEmail,
  isStrongPassword,
  generateAccessToken,
  generateRefreshToken,
} from '@/src/lib/auth';
import { sendVerificationEmail } from '@/src/services/email';
import { successResponse, errorResponse, validationErrorResponse } from '@/src/lib/api-response';
import { isRateLimited } from '@/src/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    if (isRateLimited(ip)) {
      return errorResponse('Too many signup attempts. Please try again later.', 429);
    }

    const body = await req.json();
    const { email, password, first_name, last_name } = body;

    if (!email || !password || !first_name || !last_name) {
      return validationErrorResponse('Missing required fields');
    }

    if (!isValidEmail(email)) {
      return validationErrorResponse('Invalid email format');
    }

    if (!isStrongPassword(password)) {
      return validationErrorResponse(
        'Password must be at least 8 characters long, contain 1 uppercase, 1 number and 1 special character'
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse('User already exists', 400);
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName: first_name,
        lastName: last_name,
      },
    });

    // Create verification token
    const token =
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    await sendVerificationEmail(email, token);

    const payload = { userId: user.id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Save refresh token in DB
    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    // Create Audit Log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'USER_SIGNUP',
        description: `User signed up with email ${email}`,
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown',
        userAgent: req.headers.get('user-agent') || 'unknown',
      },
    });

    const response = successResponse(
      {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      },
      'User created successfully',
      201
    );

    // Store refresh token in httpOnly cookie
    response.cookies.set('refreshToken', refreshToken, {
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
