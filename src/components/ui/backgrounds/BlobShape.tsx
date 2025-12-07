import React from 'react';
import { motion } from 'framer-motion';

interface BlobShapeProps {
  variant?: 'violet' | 'rose' | 'jaune' | 'orange';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
  children?: React.ReactNode;
}

const BlobShape: React.FC<BlobShapeProps> = ({
  variant = 'violet',
  size = 'md',
  className = '',
  animate = false,
  children,
}) => {
  // Définir les couleurs de bordure selon la variante
  const borderColors = {
    violet: 'from-[#775CFF] to-[#EBABFF]',
    rose: 'from-[#EBABFF] to-[#FF7A42]',
    jaune: 'from-[#FFFF73] to-[#EBABFF]',
    orange: 'from-[#FF7A42] to-[#EBABFF]',
  };

  // Définir les tailles
  const sizes = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    xl: 'w-96 h-96',
  };

  // Animation de rotation douce
  const animationVariants = animate
    ? {
        animate: {
          rotate: [0, 5, -5, 0],
          scale: [1, 1.02, 1],
        },
        transition: {
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse' as const,
          ease: 'easeInOut',
        },
      }
    : {};

  return (
    <motion.div
      className={`${sizes[size]} ${className} relative`}
      {...animationVariants}
    >
      {/* Bordure gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${borderColors[variant]} rounded-[40%_60%_70%_30%/50%_40%_60%_50%] p-[3px]`}
      >
        {/* Contenu intérieur */}
        <div className="w-full h-full bg-[#FFFFF6] rounded-[40%_60%_70%_30%/50%_40%_60%_50%] flex items-center justify-center p-6">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default BlobShape;
