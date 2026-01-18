import { NextRequest } from 'next/server';
import { forgotPasswordSchema } from '@/src/lib/validation';
import { prisma } from '@/src/lib/db';
import { successResponse, errorResponse, serverErrorResponse } from '@/src/lib/api-response';
import { sendPasswordResetEmail } from '@/src/services/email';
import crypto from 'crypto';

import { createAuditLog } from '@/src/lib/audit';
import { isRateLimited } from '@/src/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (isRateLimited(ip, 5, 60000)) {
      return errorResponse('Too many requests. Please try again in a minute.', 429);
    }

    const body = await req.json();
    const result = forgotPasswordSchema.safeParse(body);

    if (!result.success) {
      return errorResponse(result.error.errors[0].message, 422);
    }

    const { email } = result.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      const resetToken = crypto.randomBytes(32).toString('hex');
      await prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          token: resetToken,
          expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
        },
      });

      await createAuditLog(
        user.id,
        'PASSWORD_RESET_REQUESTED',
        `Password reset link sent to ${email}`,
        req
      );

      await sendPasswordResetEmail(email, resetToken);
    } else {
      await createAuditLog(
        null,
        'PASSWORD_RESET_REQUESTED',
        `Password reset attempted for non-existent email ${email}`,
        req
      );
    }

    // Always return success to prevent email enumeration
    return successResponse(
      {},
      'If an account exists with that email, a password reset link has been sent.'
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return serverErrorResponse();
  }
}
