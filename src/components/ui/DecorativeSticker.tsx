import React from 'react';
import { motion } from 'framer-motion';

interface DecorativeStickerProps {
  type: 'boule-disco' | 'coeur-01' | 'coeur-02' | `strass-${number}`;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animated?: boolean;
  animationType?: 'float' | 'rotate' | 'pulse' | 'none';
}

/**
 * Composant pour afficher les stickers décoratifs
 * Inclut : boule disco, coeurs, et strass
 */
const DecorativeSticker: React.FC<DecorativeStickerProps> = ({
  type,
  size = 'md',
  className = '',
  animated = true,
  animationType = 'float',
}) => {
  // Mapping des tailles
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  // Déterminer le chemin du fichier
  const getImagePath = () => {
    if (type.startsWith('strass-')) {
      return `/images/logos/stickers/strass/${type}.webp`;
    }
    return `/images/logos/stickers/decoratifs/${type}.webp`;
  };

  // Animations personnalisées
  const animations = {
    float: {
      animate: {
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      },
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    rotate: {
      animate: {
        rotate: 360,
      },
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      },
    },
    pulse: {
      animate: {
        scale: [1, 1.05, 1],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    none: {},
  };

  const Component = animated ? motion.img : 'img';
  const animationProps = animated && animationType !== 'none'
    ? animations[animationType]
    : {};

  return (
    <Component
      src={getImagePath()}
      alt={`Sticker décoratif ${type}`}
      className={`${sizes[size]} object-contain ${className}`}
      loading="lazy"
      {...animationProps}
    />
  );
};

export default DecorativeSticker;
