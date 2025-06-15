// components/sections/AboutSection.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { JSX } from 'react';

const sectionVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

export default function AboutSection(): JSX.Element {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-gray-50 p-8 sm:p-10 md:p-12">
      <motion.div
        initial="initial"
        animate="animate"
        variants={sectionVariants}
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-12 items-center"
      >
        <div className="relative h-60 sm:h-80 md:h-96 w-full rounded-lg overflow-hidden">
          <Image src="/container2.png" alt="About Us" width={500} height={500} className="object-cover" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-green-900 mb-6 font-serif">Get to know us</h2>
          <p className="text-lg text-gray-600 font-serif">
            St. Thomas Diagnostic Medical and Dental Clinic has been a trusted provider of reliable, compassionate,
            and client-focused healthcare services since 1992.
          </p>
        </div>
      </motion.div>
    </section>
  );
}