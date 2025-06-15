// components/sections/ContactSection.tsx
'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { JSX } from 'react';

const DynamicMap = dynamic(() => import('@/app/components/MapComponent'), { ssr: false });

interface ContactSectionProps {
  isClient: boolean;
}

const sectionVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

export default function ContactSection({ isClient }: ContactSectionProps): JSX.Element {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center p-8 sm:p-10 md:p-12">
      <motion.div
        initial="initial"
        animate="animate"
        variants={sectionVariants}
        className="max-w-6xl mx-auto w-full"
      >
        <h2 className="text-3xl font-bold text-center text-green-900 mb-12">Contact Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
            {isClient && <input type="text" placeholder="Name" className="w-full p-3 border rounded-lg" />}
            {isClient && <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg" />}
            {isClient && <textarea placeholder="Message" rows={5} className="w-full p-3 border rounded-lg" />}
            {isClient && <button className="bg-green-900 text-white px-6 py-3 rounded-lg">Send Message</button>}
          </div>

          {/* Map Component */}
          <div className="relative h-80 sm:h-96 md:h-96 w-full rounded-lg overflow-hidden">
            <DynamicMap />
          </div>
        </div>
      </motion.div>
    </section>
  );
}