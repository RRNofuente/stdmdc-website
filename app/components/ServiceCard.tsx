import { motion } from 'framer-motion'; // Import framer-motion

interface ServiceCardProps {
  title: string;
  description: string[];
  additionalInfo: string;
}

export default function ServiceCard({ title, description, additionalInfo }: ServiceCardProps) {
  return (
    <div className="w-96 h-auto bg-white rounded-lg shadow-lg p-6">
      {/* Title with Framer Motion */}
      <motion.h3
        className="text-3xl font-bold text-green-800 mb-3"
        whileHover={{ scale: 1.1, color: "#FFD700" }} // Scale up and change color to gold
        transition={{ duration: 0.3 }} // Smooth transition
      >
        {title}
      </motion.h3>

      {/* Description List */}
      <div className="overflow-y-auto">
        <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Optional Additional Info */}
      {additionalInfo && <p className="text-gray-600 text-sm mt-2">{additionalInfo}</p>}
    </div>
  );
}
