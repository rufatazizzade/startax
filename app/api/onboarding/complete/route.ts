import { NextRequest } from 'next/server';
import { prisma } from '@/src/lib/db';
import { verifyToken } from '@/src/lib/auth';
import {
  successResponse,
  unauthorizedResponse,
  errorResponse,
  validationErrorResponse,
} from '@/src/lib/api-response';
import { sendWelcomeEmail } from '@/src/services/email';

const COUNTRIES = ['DE', 'FR', 'IT', 'ES', 'GB', 'BE', 'NL', 'AT', 'PL', 'SE'];
const BUSINESS_TYPES = ['SOLE_TRADER', 'LLC', 'FREELANCER', 'STARTUP', 'PARTNERSHIP'];
const REVENUE_RANGES = ['0_5K', '5K_25K', '25K_100K', '100K_500K', '500K_PLUS'];
const CURRENCIES = ['EUR', 'GBP', 'SEK', 'PLN', 'ATS'];

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return unauthorizedResponse('Missing or invalid authorization header');
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);

    if (!payload) {
      return unauthorizedResponse('Invalid or expired token');
    }

    const body = await req.json();
    const { country, business_type, monthly_revenue_range, currency, num_employees } = body;

    // Validation
    if (
      !country ||
      !business_type ||
      !monthly_revenue_range ||
      !currency ||
      num_employees === undefined
    ) {
      return validationErrorResponse('All fields are required');
    }

    if (!COUNTRIES.includes(country)) {
      return validationErrorResponse('Invalid country');
    }

    if (!BUSINESS_TYPES.includes(business_type)) {
      return validationErrorResponse('Invalid business type');
    }

    if (!REVENUE_RANGES.includes(monthly_revenue_range)) {
      return validationErrorResponse('Invalid revenue range');
    }

    if (!CURRENCIES.includes(currency)) {
      return validationErrorResponse('Invalid currency');
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return unauthorizedResponse('User not found');
    }

    const profile = await prisma.userProfile.upsert({
      where: { userId: user.id },
      update: {
        country,
        businessType: business_type,
        monthlyRevenueRange: monthly_revenue_range,
        currency,
        numEmployees: parseInt(num_employees),
      },
      create: {
        userId: user.id,
        country,
        businessType: business_type,
        monthlyRevenueRange: monthly_revenue_range,
        currency,
        numEmployees: parseInt(num_employees),
      },
    });

    await sendWelcomeEmail(user.email, user.firstName || 'User');

    // Create Audit Log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'ONBOARDING_COMPLETE',
        description: `User ${user.email} completed onboarding`,
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown',
        userAgent: req.headers.get('user-agent') || 'unknown',
      },
    });

    return successResponse({ profile }, 'Onboarding completed successfully');
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : 'Internal server error');
  }
}
