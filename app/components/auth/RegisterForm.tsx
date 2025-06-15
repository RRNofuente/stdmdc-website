// app/components/auth/RegisterForm.tsx
'use client';

import { JSX, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { hashPassword, generateToken, setAuthCookie } from '@/lib/auth/auth-utils';
import { db } from '@/app/db/db';
import { users } from '@/app/db/schema';

interface RegisterFormProps {
    onSubmit?: (name: string, email: string, password: string, phone: string) => Promise<void>;
    isLoading?: boolean;
  }
  
  export default function RegisterForm({ onSubmit, isLoading: externalIsLoading }: RegisterFormProps): JSX.Element {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(externalIsLoading || false);
    const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Hash the password
      const hashedPassword = await hashPassword(formData.password);
      
      // Create user in database
const [newUser] = await db.insert(users).values({
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    passwordHash: hashedPassword, // Changed from password to passwordHash
    phone: formData.phone || null,
    dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : null,
    role: 'patient',
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();
      if (!newUser || !newUser.id) {
        throw new Error('Failed to create account');
      }
      
      // Generate JWT token
      const token = generateToken(newUser.id, newUser.email, newUser.role);
      
      // Set auth cookie
      await setAuthCookie(token);
      
      // Redirect to dashboard or home page
      router.push('/dashboard');
      
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle duplicate email
      if ((error as Error).message.includes('unique constraint')) {
        setError('Email already exists. Please use a different email address.');
      } else {
        setError((error as Error).message || 'Failed to create account. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-900">Create an Account</h1>
        <p className="mt-2 text-gray-600">Sign up to book your appointments</p>
      </div>
      
      {error && (
        <div className="p-4 mt-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name *
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-green-900 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </div>
      </form>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-green-900 hover:text-green-800">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}