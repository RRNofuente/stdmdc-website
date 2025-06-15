import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/db/db';
import { users } from '@/app/db/schema';
import { eq } from 'drizzle-orm';
import { verifyPassword, generateToken, setAuthCookie } from '@/lib/auth/auth-utils';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!existingUser) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const passwordMatch = await verifyPassword(password, existingUser.passwordHash); // Assuming passwordHash is the column name in your database

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Generate token
    const token = generateToken(existingUser.id, existingUser.email, existingUser.role);

    // Set the auth cookie
    const response = NextResponse.json({ message: 'Login successful', token: token, user: existingUser }, { status: 200 });
    await setAuthCookie(token);

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Login failed' }, { status: 500 });
  }
}