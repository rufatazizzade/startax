import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/src/lib/auth';

export function withAuth(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - No token provided' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Invalid token' },
        { status: 401 }
      );
    }

    (req as any).user = payload;

    return handler(req);
  };
}

export function withAdmin(handler: (req: NextRequest) => Promise<NextResponse>) {
  return withAuth(async (req: NextRequest) => {
    const user = (req as any).user;

    if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    return handler(req);
  });
}
