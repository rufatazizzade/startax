import { NextRequest } from 'next/server';
import { userProfileSchema } from '@/src/lib/validation';
import { prisma } from '@/src/lib/db';
import { verifyAccessToken } from '@/src/lib/auth';
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  serverErrorResponse,
} from '@/src/lib/api-response';
import { sendWelcomeEmail } from '@/src/services/email';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return unauthorizedResponse('Missing or invalid authorization header');
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyAccessToken(token);

    if (!payload) {
      return unauthorizedResponse('Invalid or expired access token');
    }

    const body = await req.json();
    const result = userProfileSchema.safeParse(body);

    if (!result.success) {
      return errorResponse(result.error.errors[0].message, 422);
    }

    const userProfile = await prisma.userProfile.upsert({
      where: { userId: payload.userId },
      update: {
        country: result.data.country,
        businessType: result.data.businessType,
        monthlyRevenueRange: result.data.monthlyRevenueRange,
        currency: result.data.currency,
        numEmployees: result.data.numEmployees,
      },
      create: {
        userId: payload.userId,
        country: result.data.country,
        businessType: result.data.businessType,
        monthlyRevenueRange: result.data.monthlyRevenueRange,
        currency: result.data.currency,
        numEmployees: result.data.numEmployees,
      },
    });

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (user) {
      await sendWelcomeEmail(user.email, user.firstName || 'User');
    }

    return successResponse(userProfile, 'Onboarding completed successfully');
  } catch (error) {
    console.error('Onboarding complete error:', error);
    return serverErrorResponse();
  }
}
