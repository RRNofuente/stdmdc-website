import { useState } from 'react';
import { motion } from 'framer-motion'; // Import framer-motion

interface ServiceCardProps {
  title: string;
  description: string[];
  additionalInfo: string;  // Add any additional data you want on the back of the card
}

export default function ServiceCard({ title, description, additionalInfo }: ServiceCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped((prevState) => !prevState);
  };

  return (
    <div
      className={`flip-card w-96 h-112 bg-white rounded-lg shadow-lg cursor-pointer ${isFlipped ? 'flipped' : ''}`}
      onClick={handleCardClick}
    >
      <div className="flip-card-inner">
        {/* Front Side of the Card */}
        <div className="flip-card-front text-center w-full h-full flex justify-center items-center">
          <div className="p-6 text-center">
            {/* Title with Framer Motion */}
            <motion.h3
              className="text-3xl font-bold text-white mb-3 title"
              whileHover={{ scale: 1.1, color: "#FFD700" }} // Scale up and change color to gold
              transition={{ duration: 0.3 }} // Smooth transition
            >
              {title}
            </motion.h3>
          </div>
        </div>

        {/* Back Side of the Card */}
        <div className="flip-card-back flex items-start justify-center w-full h-full bg-green-800 text-white rounded-b-lg">
          <div className="p-6 text-left flex flex-col justify-start h-full w-full">
            <motion.h3 
              className="text-3xl font-bold mb-3"
              whileHover={{ scale: 1.1, color: "#FFD700" }} // Scale up and change color to gold
              transition={{ duration: 0.3 }} // Smooth transition
            >
              More Info
            </motion.h3>

            {/* Use overflow-y-auto to make the description scrollable if it exceeds container height */}
            <div className="overflow-y-auto flex-1">
              <ul className="list-disc pl-6 space-y-2 text-sm">
                {description.map((item, index) => (
                  <li key={index} className="text-green-900">{item}</li>
                ))}
              </ul>
            </div>

            {/* Optional Additional Info */}
            <p className="text-white text-sm mt-2">{additionalInfo}</p> {/* Adjusted text size */}
          </div>
        </div>
      </div>
    </div>
  );
}
