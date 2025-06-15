// HomePage.tsx
'use client';

import { JSX, useEffect, useState } from 'react';
import HomeSection from '@/app/components/HomeSection';
import AboutSection from '@/app/components/AboutSection';
import ServicesSection from '@/app/components/ServicesSection';
import AccreditationSection from '@/app/components/AccreditationSection';
import ContactSection from '@/app/components/ContactSection';
import Footer from '@/app/components/Footer';

export default function HomePage(): JSX.Element {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen pt-20">
      <HomeSection isClient={isClient} />
      <AboutSection />
      <ServicesSection isClient={isClient} />
      <AccreditationSection />
      <ContactSection isClient={isClient} />
      <Footer />
    </div>
  );
}