import { NextRequest } from 'next/server';
import { prisma } from '@/src/lib/db';
import { successResponse, errorResponse } from '@/src/lib/api-response';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token } = body;

    if (!token) {
      return errorResponse('Token is required', 400);
    }

    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken || verificationToken.expires < new Date()) {
      return errorResponse('Invalid or expired verification token', 400);
    }

    const user = await prisma.user.findUnique({
      where: { email: verificationToken.identifier },
    });

    if (!user) {
      return errorResponse('User not found', 404);
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        emailVerifiedAt: new Date(),
      },
    });

    // Delete the verification token
    await prisma.verificationToken.delete({
      where: { token },
    });

    // Create Audit Log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'EMAIL_VERIFICATION_SUCCESS',
        description: `Email verified successfully for user ${user.email}`,
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown',
        userAgent: req.headers.get('user-agent') || 'unknown',
      },
    });

    return successResponse(null, 'Email verified successfully');
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : 'Internal server error');
  }
}
