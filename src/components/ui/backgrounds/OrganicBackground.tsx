import React from 'react';
import { motion } from 'framer-motion';

interface OrganicBackgroundProps {
  className?: string;
}

/**
 * Composant de fond avec des formes organiques décoratives
 * Inspiré de la charte graphique Glitter Production
 */
const OrganicBackground: React.FC<OrganicBackgroundProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Blob violet en haut à gauche */}
      <motion.div
        className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-[#775CFF]/10 to-[#EBABFF]/10 rounded-[40%_60%_70%_30%/50%_40%_60%_50%] blur-2xl"
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />

      {/* Blob rose en haut à droite */}
      <motion.div
        className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#EBABFF]/10 to-[#FF7A42]/10 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl"
        animate={{
          rotate: [0, -15, 15, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />

      {/* Blob jaune en bas à gauche */}
      <motion.div
        className="absolute -bottom-20 -left-32 w-80 h-80 bg-gradient-to-br from-[#FFFF73]/10 to-[#EBABFF]/10 rounded-[30%_70%_70%_30%/40%_50%_60%_50%] blur-2xl"
        animate={{
          rotate: [0, 20, -20, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />

      {/* Blob orange en bas à droite */}
      <motion.div
        className="absolute -bottom-40 -right-20 w-72 h-72 bg-gradient-to-br from-[#FF7A42]/10 to-[#EBABFF]/10 rounded-[70%_30%_50%_50%/30%_70%_40%_60%] blur-3xl"
        animate={{
          rotate: [0, -10, 10, 0],
          scale: [1, 1.08, 0.92, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default OrganicBackground;
