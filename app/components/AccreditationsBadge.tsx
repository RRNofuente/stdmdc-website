'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface AccreditationBadgeProps {
  image: string;  // Updated from any to string
  title: string;
}

export default function AccreditationBadge({ image, title }: AccreditationBadgeProps) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="relative w-32 h-32 mb-4"
        whileHover={{
          scale: 1.2,
          rotateX: 10,
          rotateY: 10,
          boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        whileTap={{
          scale: 0.95,
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
          transition: { duration: 0.1 }
        }}
      >
        <Image
          src={image}
          alt={title}
          width={128}  // Specified width for consistency
          height={128} // Specified height for consistency
          className="object-contain"
        />
      </motion.div>
      <motion.p
        className="text-gray-700 font-medium"
        whileHover={{
          color: "#FFD700",
          scale: 1.1,
          transition: { duration: 0.3 }
        }}
      >
        {title}
      </motion.p>
    </div>
  );
}
