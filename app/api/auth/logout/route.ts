// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookie } from '@/lib/auth/auth-utils';

export async function POST() {
  // Clear the auth cookie
  clearAuthCookie();
  
  return NextResponse.json({
    message: 'Logged out successfully'
  });
}