import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken } from '@/src/lib/auth';

const PUBLIC_ROUTES = [
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/',
];
const AUTH_ROUTES = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if it's a public route
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) =>
      pathname === route ||
      pathname.startsWith('/verify-email/') ||
      pathname.startsWith('/reset-password/')
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route);

  // In Next.js middleware, we usually check for a session cookie
  const token = request.cookies.get('accessToken')?.value;

  if (!token && !isPublicRoute) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  if (token) {
    const payload = verifyAccessToken(token);

    if (!payload && !isPublicRoute) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(pathname));
      const response = NextResponse.redirect(url);
      response.cookies.delete('accessToken');
      return response;
    }

    if (payload && isAuthRoute) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (payload && pathname.startsWith('/admin')) {
      if (payload.role !== 'ADMIN' && payload.role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
