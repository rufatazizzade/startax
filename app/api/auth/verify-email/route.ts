import { NextRequest } from 'next/server';
import { verifyEmailSchema } from '@/src/lib/validation';
import { prisma } from '@/src/lib/db';
import { successResponse, errorResponse, serverErrorResponse } from '@/src/lib/api-response';

import { createAuditLog } from '@/src/lib/audit';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = verifyEmailSchema.safeParse(body);

    if (!result.success) {
      return errorResponse(result.error.errors[0].message, 422);
    }

    const { token } = result.data;

    const storedToken = await prisma.emailVerificationToken.findUnique({
      where: { token },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      return errorResponse('Invalid or expired verification token', 400);
    }

    const user = await prisma.user.findUnique({
      where: { email: storedToken.email },
    });

    await prisma.$transaction([
      prisma.user.update({
        where: { email: storedToken.email },
        data: {
          isVerified: true,
          emailVerifiedAt: new Date(),
        },
      }),
      prisma.emailVerificationToken.delete({
        where: { id: storedToken.id },
      }),
    ]);

    if (user) {
      await createAuditLog(user.id, 'EMAIL_VERIFIED', `Email verified for user ${user.id}`, req);
    }

    return successResponse({}, 'Email verified successfully. You can now login.');
  } catch (error) {
    console.error('Email verification error:', error);
    return serverErrorResponse();
  }
}
