import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production'
);

// Add routes that don't require authentication
const publicRoutes = [
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/api/auth',
];
const authRoutes = ['/login', '/signup', '/forgot-password', '/reset-password', '/verify-email'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if it's a public route
  const isPublicRoute = publicRoutes.some(
    (route) => pathname.startsWith(route) || pathname === '/'
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Get token from header or cookie
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : request.cookies.get('accessToken')?.value;

  // If no token in header or accessToken cookie, check refreshToken for auto-refresh (optional logic)
  // For simplicity, we just look for accessToken

  let payload = null;
  if (token) {
    try {
      const { payload: decoded } = await jose.jwtVerify(token, JWT_SECRET);
      payload = decoded;
    } catch (error) {
      // Token invalid or expired
    }
  }

  // Redirect authenticated users away from auth routes to dashboard
  if (isAuthRoute && payload) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect unauthenticated users from protected routes to login
  // Exclude API routes from this redirect as they should return 401 instead
  if (!isPublicRoute && !payload && !pathname.startsWith('/api/')) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
