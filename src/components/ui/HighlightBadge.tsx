import React from 'react';
import { motion } from 'framer-motion';

interface HighlightBadgeProps {
  children: React.ReactNode;
  color?: 'yellow' | 'pink' | 'violet' | 'orange';
  rotation?: number;
  className?: string;
  animate?: boolean;
}

const HighlightBadge: React.FC<HighlightBadgeProps> = ({
  children,
  color = 'yellow',
  rotation = 0,
  className = '',
  animate = true
}) => {
  // Couleurs de la charte graphique 2025
  const colorMap = {
    yellow: 'bg-[#FFFF73]',
    pink: 'bg-[#EBABFF]',
    violet: 'bg-[#775CFF]',
    orange: 'bg-[#FF7A42]'
  };

  const textColorMap = {
    yellow: 'text-[#0B0B0B]',
    pink: 'text-[#0B0B0B]',
    violet: 'text-white',
    orange: 'text-white'
  };

  const badgeClasses = `
    inline-block
    ${colorMap[color]}
    ${textColorMap[color]}
    px-4 py-1.5
    md:px-6 md:py-2
    rounded-full
    border-2 border-[#0B0B0B]
    shadow-lg
    font-bold
    ${className}
  `;

  if (!animate) {
    return (
      <span
        className={badgeClasses}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {children}
      </span>
    );
  }

  return (
    <motion.span
      className={badgeClasses}
      initial={{ opacity: 0, scale: 0.8, rotate: rotation }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      whileHover={{ scale: 1.05, rotate: rotation + 2 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      {children}
    </motion.span>
  );
};

export default HighlightBadge;
