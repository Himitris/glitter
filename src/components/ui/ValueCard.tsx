import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      {/* Card with gradient background */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-orange-500/20 backdrop-blur-sm transition-all duration-500">
        {/* Icon */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="relative flex items-center justify-center h-full">
            <Icon className="w-8 h-8 text-pink-400" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-4 text-center text-white">
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