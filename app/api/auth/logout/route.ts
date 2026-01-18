import { NextRequest } from 'next/server';
import { prisma } from '@/src/lib/db';
import { successResponse, serverErrorResponse } from '@/src/lib/api-response';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refreshToken')?.value;

    if (refreshToken) {
      await prisma.refreshToken.deleteMany({
        where: { token: refreshToken },
      });
    }

    const response = successResponse({}, 'Logged out successfully');
    response.cookies.set('refreshToken', '', { maxAge: 0 });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return serverErrorResponse();
  }
}
