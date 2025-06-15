// components/sections/AccreditationSection.tsx
'use client';

import { motion } from 'framer-motion';
import AccreditationBadge from '@/app/components/AccreditationsBadge';
import { JSX } from 'react';

const sectionVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

export default function AccreditationSection(): JSX.Element {
  return (
    <section id="accreditation" className="min-h-screen flex items-center justify-center bg-gray-50 p-8 sm:p-10 md:p-12">
      <motion.div
        initial="initial"
        animate="animate"
        variants={sectionVariants}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold text-green-900 mb-8 font-serif">Accreditations</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-center items-center">
          <AccreditationBadge image="/ddb.png" title="" />
          <AccreditationBadge image="/doh_logo.png" title="" />
          <AccreditationBadge image="/technical_skills_logo.png" title="" />
          <AccreditationBadge image="/prc_logo.png" title="" />
          <AccreditationBadge image="/iso_logo.png" title="" />
          <AccreditationBadge image="/ph_flag_logo.png" title="" />
          <AccreditationBadge image="/sgs_logo.png" title="" />
          <AccreditationBadge image="/Ukas_logo.png" title="" />
          <AccreditationBadge image="/tigers_logo.png" title="" />
          <AccreditationBadge image="/marina_logo.png" title="" />
          <AccreditationBadge image="/globe_logo.png" title="" />
        </div>
      </motion.div>
    </section>
  );
}