'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface AccreditationBadgeProps {
  image: any;
  title: string;
}

export default function AccreditationBadge({ image, title }: AccreditationBadgeProps) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="relative w-32 h-32 mb-4"
        whileHover={{
          scale: 1.2,           // Scale up for 3D pop effect
          rotateX: 10,          // Add 3D rotation on X axis
          rotateY: 10,          // Add 3D rotation on Y axis
          boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",  // Shadow to create the "floating" effect
          transition: { 
            duration: 0.3,      // Smooth transition
            ease: "easeOut"     // Ease-out for a smooth effect
          }
        }}
        whileTap={{
          scale: 0.95,          // Slightly scale down on tap for press effect
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",  // Lighter shadow on tap
          transition: { duration: 0.1 }
        }}
      >
        <Image src={image} alt={title} fill className="object-contain" />
      </motion.div>
      <motion.p
        className="text-gray-700 font-medium"
        whileHover={{
          color: "#FFD700",      // Gold color on hover
          scale: 1.1,            // Slightly scale up the text
          transition: { duration: 0.3 }
        }}
      >
        {title}
      </motion.p>
    </div>
  );
}
