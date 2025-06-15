import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left sidebar with logo and image */}
      <div className="bg-primary w-full md:w-1/2 p-8 flex flex-col justify-between">
        <div>
          <Link href="/" className="inline-block">
            <div className="flex items-center">
              <Image 
                src="/logo.svg" 
                alt="Medical Center Logo" 
                width={40} 
                height={40} 
              />
              <span className="ml-2 text-white font-bold text-xl">STDMDC</span>
            </div>
          </Link>
        </div>
        
        <div className="hidden md:flex flex-col items-center justify-center">
          <div className="w-full flex justify-center">
            <Image
              src="/auth-illustration.svg"
              alt="Medical illustration"
              height={400}
              width={400}
              className="object-contain"
              priority
            />
          </div>
          <div className="mt-8 text-white text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">Your Health, Our Priority</h2>
            <p className="opacity-80">
              Join our platform to easily schedule appointments, 
              track your medical history, and receive personalized care.
            </p>
          </div>
        </div>
        
        <div className="hidden md:block text-white text-sm opacity-70">
          &copy; {new Date().getFullYear()} STDMDC. All rights reserved.
        </div>
      </div>
      
      {/* Right side with auth forms */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          {children}
        </div>
      </div>
    </div>
  );
}