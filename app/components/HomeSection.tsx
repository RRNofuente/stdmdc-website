// components/sections/HomeSection.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { JSX } from 'react';

interface HomeSectionProps {
  isClient: boolean;
}

const sectionVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

export default function HomeSection({ isClient }: HomeSectionProps): JSX.Element {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white" />
      </div>
      {isClient && (
        <motion.div
          initial="initial"
          animate="animate"
          variants={sectionVariants}
          className="relative z-10 text-center text-green-800 flex flex-col items-center md:flex-row"
        >
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif">
              Dedicated to Delivering Quality Care for Workers&apos; Pre-Employment Health
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-serif mb-6">
              Ensuring health and well-being for every worker stepping toward their future.
            </p>
          </div>

          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute left-0 bottom-10 md:bottom-16 bg-green-900 text-white px-6 py-3 rounded-lg text-lg font-semibold 
                    hover:bg-green-800 transition duration-300 ease-in-out"
          >
            Contact Us
          </button>
          <Image
            src="/container.png"
            alt="St. Thomas Diagnostic"
            width={500}
            height={500}
            className="w-full sm:w-1/2 md:w-1/3 h-auto object-cover object-center rounded-lg md:mr-8"
          />
        </motion.div>
      )}
    </section>
  );
}