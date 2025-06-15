// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth/auth-utils';

// Define which paths require authentication
const protectedPaths = [
  '/dashboard',
  '/profile',
  '/settings',
  '/admin',
];

// Define admin-only paths
const adminPaths = [
  '/admin',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for non-protected paths
  if (!protectedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  // Get the token from cookies
  const token = request.cookies.get('auth_token')?.value;
  
  // If no token exists, redirect to login
  if (!token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }
  
  // Verify token
  const decoded = verifyToken(token);
  
  // If token is invalid, redirect to login
  if (!decoded) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }
  
  // Check for admin-only paths
  if (adminPaths.some(path => pathname.startsWith(path)) && decoded.role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }
  
  // Add user info to headers for use in server components/api routes
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', decoded.userId.toString());
  requestHeaders.set('x-user-email', decoded.email);
  requestHeaders.set('x-user-role', decoded.role);
  
  return NextResponse.next({
    headers: requestHeaders,
  });
}

// Configure middleware to run only on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public directory files
     * - api routes that handle their own auth
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api/auth).*)',
  ],
};