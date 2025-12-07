import React from 'react';
import { motion } from 'framer-motion';

interface HeroBackgroundProps {
  variant?: 'violet' | 'rose' | 'orange' | 'mixed';
  className?: string;
  children?: React.ReactNode;
}

/**
 * Composant de fond organique pour les sections hero
 * Remplace les images Unsplash avec un design cohérent avec la charte Glitter 2025
 */
const HeroBackground: React.FC<HeroBackgroundProps> = ({
  variant = 'mixed',
  className = '',
  children,
}) => {
  // Définir les couleurs selon la variante
  const colorSchemes = {
    violet: {
      bg: 'from-[#775CFF]/10 via-[#EBABFF]/5 to-[#FFFFF6]',
      blob1: 'from-[#775CFF]/30 to-[#EBABFF]/20',
      blob2: 'from-[#EBABFF]/25 to-[#775CFF]/15',
      blob3: 'from-[#775CFF]/20 to-[#EBABFF]/30',
    },
    rose: {
      bg: 'from-[#EBABFF]/10 via-[#FF7A42]/5 to-[#FFFFF6]',
      blob1: 'from-[#EBABFF]/30 to-[#FF7A42]/20',
      blob2: 'from-[#FF7A42]/25 to-[#EBABFF]/15',
      blob3: 'from-[#EBABFF]/20 to-[#FFFF73]/25',
    },
    orange: {
      bg: 'from-[#FF7A42]/10 via-[#FFFF73]/5 to-[#FFFFF6]',
      blob1: 'from-[#FF7A42]/30 to-[#FFFF73]/20',
      blob2: 'from-[#FFFF73]/25 to-[#FF7A42]/15',
      blob3: 'from-[#FF7A42]/20 to-[#EBABFF]/25',
    },
    mixed: {
      bg: 'from-[#775CFF]/5 via-[#EBABFF]/5 to-[#FFFFF6]',
      blob1: 'from-[#775CFF]/25 to-[#EBABFF]/15',
      blob2: 'from-[#EBABFF]/20 to-[#FF7A42]/15',
      blob3: 'from-[#FF7A42]/20 to-[#FFFF73]/20',
    },
  };

  const colors = colorSchemes[variant];

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${colors.bg} ${className}`}>
      {/* Formes organiques animées */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blob 1 - Haut gauche */}
        <motion.div
          className={`absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br ${colors.blob1} rounded-[40%_60%_70%_30%/50%_40%_60%_50%] blur-3xl opacity-60`}
          animate={{
            rotate: [0, 15, -15, 0],
            scale: [1, 1.15, 0.95, 1],
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />

        {/* Blob 2 - Haut droite */}
        <motion.div
          className={`absolute -top-20 -right-60 w-[600px] h-[600px] bg-gradient-to-br ${colors.blob2} rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl opacity-50`}
          animate={{
            rotate: [0, -20, 20, 0],
            scale: [1, 1.1, 0.9, 1],
            x: [0, -40, 20, 0],
            y: [0, 40, -30, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />

        {/* Blob 3 - Centre */}
        <motion.div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br ${colors.blob3} rounded-[50%_50%_40%_60%/40%_60%_50%_50%] blur-3xl opacity-40`}
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.08, 0.92, 1],
            x: [0, 20, -20, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />

        {/* Particules décoratives */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-3 h-3 bg-[#FFFF73]/60 rounded-full blur-sm"
          animate={{
            y: [0, -30, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-2/3 left-1/4 w-2 h-2 bg-[#FF7A42]/50 rounded-full blur-sm"
          animate={{
            y: [0, 20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/3 left-2/3 w-2 h-2 bg-[#EBABFF]/50 rounded-full blur-sm"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      {/* Contenu */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default HeroBackground;
