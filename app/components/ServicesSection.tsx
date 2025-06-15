// components/sections/ServicesSection.tsx
'use client';

import { motion } from 'framer-motion';
import ServiceCard from '@/app/components/ServiceCard';
import { JSX } from 'react';

interface ServicesSectionProps {
  isClient: boolean;
}

const sectionVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

export default function ServicesSection({ isClient }: ServicesSectionProps): JSX.Element {
  return (
    <section id="services" className="min-h-screen flex items-center justify-center p-8 sm:p-10 md:p-12">
      <motion.div
        initial={isClient ? 'initial' : false}
        whileInView={isClient ? 'animate' : undefined}
        variants={sectionVariants}
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center text-green-900 mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
          <ServiceCard
            title="Pre Medical"
            description={[
              "Complete Physical Examination with Medical History Taking",
              "Chest X-ray",
              "Urinalysis",
              "Fecalysis",
              "Blood Typing",
              "Dental Examination",
              "Optical Examination",
              "Psychometric Examination",
              "Visual Acuity",
              "Color Vision Test (Ishihara)",
              "Audiometry (Hearing Test)"
            ]}
            additionalInfo=''
          />
          <ServiceCard
            title="Laboratory"
            description={[
              "Urinalysis",
              "Fecalysis",
              "Stool Culture",
              "Pregnancy Test(Serum)",
              "Hepatitis A,B,C",
              "HIV",
              "VDRI",
              "BUN, Creatinine",
              "Lipid Profile",
              "Fasting Blood Sugar (FBS)",
              "Liver Function Test",
              "AG Ratio",
              "Bilirubin (Direct, Indirect)",
              "Total Protein",
              "Drug Testing",
            ]}
            additionalInfo=''
          />
          <ServiceCard
            title="Imaging"
            description={[
              "Chest X-ray(Upper Extremities, Lower Extremities)",
              "TRANSVAGINAL",
              "PELVIC",
              "GALLBLADDER",
              "KUV",
              "LIVER",
              "HEPATOBILIARY TREE",
              "SPLEEN",
              "PROSTATE",
            ]}
            additionalInfo=''
          />
          <ServiceCard
            title="Other Services"
            description={[
              "Electrocardiography(ECG)",
              "Treadmill Stress Test",
            ]}
            additionalInfo=''
          />
        </div>
      </motion.div>
    </section>
  );
}