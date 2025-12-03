import React from 'react';
import { motion } from 'framer-motion';

interface StickerProps {
  variant?: 'violet' | 'rose' | 'orange' | 'jaune' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

/**
 * Composant Sticker inspiré des stickers de la charte graphique
 * Style: Forme organique avec bordure gradient et fond coloré
 */
const Sticker: React.FC<StickerProps> = ({
  variant = 'gradient',
  size = 'md',
  children,
  className = '',
  animate = true,
}) => {
  // Définir les gradients selon la variante
  const gradients = {
    violet: 'from-[#775CFF] to-[#EBABFF]',
    rose: 'from-[#EBABFF] to-[#FF7A42]',
    orange: 'from-[#FF7A42] to-[#EBABFF]',
    jaune: 'from-[#FFFF73] to-[#EBABFF]',
    gradient: 'from-[#775CFF] via-[#EBABFF] via-[#FF7A42] to-[#FFFF73]',
  };

  // Définir les tailles
  const sizes = {
    sm: 'p-3 text-sm',
    md: 'p-4 text-base',
    lg: 'p-6 text-lg',
  };

  const animationProps = animate
    ? {
        whileHover: { scale: 1.05, rotate: 5 },
        whileTap: { scale: 0.95 },
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }
    : {};

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      {...animationProps}
    >
      {/* Bordure gradient avec forme organique */}
      <div
        className={`
          bg-gradient-to-br ${gradients[variant]}
          rounded-[40%_60%_70%_30%/50%_40%_60%_50%]
          p-[3px]
          shadow-lg
        `}
      >
        {/* Contenu avec fond blanc cassé */}
        <div
          className={`
            bg-[#FFFFF6]
            rounded-[40%_60%_70%_30%/50%_40%_60%_50%]
            ${sizes[size]}
            flex items-center justify-center
            font-semibold
            text-[#0B0B0B]
          `}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default Sticker;
