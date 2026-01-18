import { NextRequest } from 'next/server';
import { registerSchema } from '@/src/lib/validation';
import { prisma } from '@/src/lib/db';
import { hashPassword, generateAccessToken, generateRefreshToken } from '@/src/lib/auth';
import { successResponse, errorResponse, serverErrorResponse } from '@/src/lib/api-response';
import { sendVerificationEmail } from '@/src/services/email';
import crypto from 'crypto';

import { createAuditLog } from '@/src/lib/audit';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return errorResponse(result.error.errors[0].message, 422);
    }

    const { email, password, firstName, lastName } = result.data;

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
        firstName,
        lastName,
      },
    });

    await createAuditLog(user.id, 'USER_SIGNUP', `User created with email ${email}`, req);

    const verificationToken = crypto.randomBytes(32).toString('hex');
    await prisma.emailVerificationToken.create({
      data: {
        email,
        token: verificationToken,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      },
    });

    await sendVerificationEmail(email, verificationToken);

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

    const response = successResponse(
      {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        accessToken,
      },
      'User registered successfully. Please verify your email.',
      201
    );

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Signup error:', error);
    return serverErrorResponse();
  }
}
