// Modification du composant ValueCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon: Icon, title, description, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      {/* Card with gradient background */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 group-hover:border-[color:var(--icon-color)] transition-all duration-300" style={{'--icon-color': color} as any}>
        {/* Icon */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-[color:var(--icon-color)] opacity-10" style={{'--icon-color': color} as any} />
          <div className="relative flex items-center justify-center h-full">
            <Icon className="w-8 h-8" style={{ color }} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-4 text-center uppercase" style={{ color }}>
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-center">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default ValueCard;