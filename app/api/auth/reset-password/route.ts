import { NextRequest } from 'next/server';
import { resetPasswordSchema } from '@/src/lib/validation';
import { prisma } from '@/src/lib/db';
import { hashPassword } from '@/src/lib/auth';
import { successResponse, errorResponse, serverErrorResponse } from '@/src/lib/api-response';

import { createAuditLog } from '@/src/lib/audit';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = resetPasswordSchema.safeParse(body);

    if (!result.success) {
      return errorResponse(result.error.errors[0].message, 422);
    }

    const { token, newPassword } = result.data;

    const storedToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      return errorResponse('Invalid or expired reset token', 400);
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: storedToken.userId },
        data: { passwordHash: hashedPassword },
      }),
      prisma.passwordResetToken.delete({
        where: { id: storedToken.id },
      }),
      prisma.refreshToken.deleteMany({
        where: { userId: storedToken.userId },
      }),
    ]);

    await createAuditLog(
      storedToken.userId,
      'PASSWORD_RESET_COMPLETED',
      `Password reset successfully for user ${storedToken.userId}`,
      req
    );

    return successResponse({}, 'Password reset successfully. Please login with your new password.');
  } catch (error) {
    console.error('Reset password error:', error);
    return serverErrorResponse();
  }
}
