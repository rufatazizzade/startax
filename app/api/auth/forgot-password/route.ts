import { NextRequest } from 'next/server';
import { prisma } from '@/src/lib/db';
import { sendPasswordResetEmail } from '@/src/services/email';
import { successResponse, errorResponse } from '@/src/lib/api-response';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return errorResponse('Email is required', 400);
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Return success even if user not found for security (don't reveal email existence)
      return successResponse(
        null,
        'If an account exists with that email, a reset link has been sent'
      );
    }

    const token =
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    await sendPasswordResetEmail(email, token);

    // Create Audit Log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'PASSWORD_RESET_REQUEST',
        description: `Password reset requested for email ${email}`,
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown',
        userAgent: req.headers.get('user-agent') || 'unknown',
      },
    });

    return successResponse(
      null,
      'If an account exists with that email, a reset link has been sent'
    );
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : 'Internal server error');
  }
}
