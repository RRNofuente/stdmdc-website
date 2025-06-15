// lib/auth/server-auth-utils.ts
import { cookies } from 'next/headers';
import { getUserFromToken, verifyToken } from './auth-utils';

// Server-side cookie operations
export async function setAuthCookieServer(token: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'auth_token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function clearAuthCookieServer() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
}

export async function getAuthTokenServer() {
  const cookieStore = await cookies();
  return cookieStore.get('auth_token')?.value;
}

// Get current user from server context
export async function getCurrentUser() {
  const token = await getAuthTokenServer();
  
  if (!token) {
    return null;
  }
  
  return getUserFromToken(token);
}