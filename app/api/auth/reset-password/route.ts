import { NextRequest } from 'next/server';
import { prisma } from '@/src/lib/db';
import { hashPassword, isStrongPassword } from '@/src/lib/auth';
import { successResponse, errorResponse, validationErrorResponse } from '@/src/lib/api-response';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, new_password } = body;

    if (!token || !new_password) {
      return validationErrorResponse('Token and new password are required');
    }

    if (!isStrongPassword(new_password)) {
      return validationErrorResponse(
        'Password must be at least 8 characters long, contain 1 uppercase, 1 number and 1 special character'
      );
    }

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetToken || resetToken.expiresAt < new Date()) {
      return errorResponse('Invalid or expired reset token', 400);
    }

    const passwordHash = await hashPassword(new_password);

    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { passwordHash },
    });

    // Invalidate all refresh tokens for this user
    await prisma.refreshToken.deleteMany({
      where: { userId: resetToken.userId },
    });

    // Delete the reset token
    await prisma.passwordResetToken.delete({
      where: { id: resetToken.id },
    });

    // Create Audit Log
    await prisma.auditLog.create({
      data: {
        userId: resetToken.userId,
        action: 'PASSWORD_RESET_SUCCESS',
        description: `Password reset successfully for user ${resetToken.user.email}`,
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown',
        userAgent: req.headers.get('user-agent') || 'unknown',
      },
    });

    return successResponse(null, 'Password has been reset successfully');
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : 'Internal server error');
  }
}
