// lib/auth/auth-utils.ts
import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { db } from '@/app/db/db';
import { users } from '@/app/db/schema';
import { eq } from 'drizzle-orm';

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

// Password verification
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(userId: number, email: string, role: string): string {
  return sign(
    { userId, email, role },
    process.env.JWT_SECRET || 'super-secret-key',
    { expiresIn: '7d' }
  );
}

// Verify JWT token
export function verifyToken(token: string): any {
  try {
    return verify(token, process.env.JWT_SECRET || 'super-secret-key');
  } catch (error) {
    return null;
  }
}

// Get user from token
export async function getUserFromToken(token: string) {
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return null;
  }
  
  const user = await db.query.users.findFirst({
    where: eq(users.id, decoded.userId),
  });
  
  return user;
}

// Cookie handling that works in both app and pages router
export const cookies = {
  // Set cookie
  set: (name: string, value: string, options: Record<string, any> = {}) => {
    if (typeof document !== 'undefined') {
      // Client-side cookie setting
      const cookieOptions: {
        path: string;
        maxAge: number;
        secure?: boolean;
        httpOnly?: boolean;
        sameSite?: 'strict' | 'lax' | 'none';
      } = {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        ...options,
      };
      
      let cookieString = `${name}=${encodeURIComponent(value)}`;
      
      if (cookieOptions.maxAge) {
        cookieString += `; Max-Age=${cookieOptions.maxAge}`;
      }
      
      if (cookieOptions.path) {
        cookieString += `; Path=${cookieOptions.path}`;
      }
      
      if (cookieOptions.secure) {
        cookieString += `; Secure`;
      }
      
      if (cookieOptions.httpOnly) {
        cookieString += `; HttpOnly`;
      }
      
      if (cookieOptions.sameSite) {
        cookieString += `; SameSite=${cookieOptions.sameSite}`;
      }
      
      document.cookie = cookieString;
    }
  },
  
  // Get cookie value
  get: (name: string): string | undefined => {
    if (typeof document !== 'undefined') {
      // Client-side cookie getting
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
          return decodeURIComponent(cookieValue);
        }
      }
    }
    return undefined;
  },
  
  // Delete cookie
  delete: (name: string) => {
    if (typeof document !== 'undefined') {
      // Client-side cookie deletion
      document.cookie = `${name}=; Path=/; Max-Age=0`;
    }
  },
};

// Authentication cookie functions
export function setAuthCookie(token: string) {
  cookies.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export function clearAuthCookie() {
  cookies.delete('auth_token');
}

export function getAuthToken() {
  return cookies.get('auth_token');
}