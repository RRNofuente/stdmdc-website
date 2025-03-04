'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ServiceCard from '@/app/components/ServiceCard';
import AccreditationBadge from '@/app/components/AccreditationsBadge';
import Footer from '@/app/components/Footer';

// Dynamically import the MapComponent to prevent SSR issues
const DynamicMap = dynamic(() => import('@/app/components/MapComponent'), { ssr: false });

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sectionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Home Section */}
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

      {/* About Section */}
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

       {/* Services Section */}
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

      {/* Accreditation Section */}
      <section id="accreditation" className="min-h-screen flex items-center justify-center bg-gray-50 p-8 sm:p-10 md:p-12">
        <motion.div
          initial="initial"
          animate="animate"
          variants={sectionVariants}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-green-900 mb-8 font-serif">Accreditations</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            <AccreditationBadge image="/ddb.png" title="" />
            <AccreditationBadge image="/doh_logo.png" title="" />
            <AccreditationBadge image="/technical_skills_logo.png" title="" />
            <AccreditationBadge image="/prc_logo.png" title="" />
            <AccreditationBadge image="/iso_logo.png" title="" />
            <AccreditationBadge image="/ph_flag_logo.png" title="" />
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
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

      <Footer />
    </div>
  );
}




