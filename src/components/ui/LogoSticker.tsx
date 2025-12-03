import React from 'react';
import { motion } from 'framer-motion';

interface LogoStickerProps {
  variant: 'sticker-01' | 'sticker-02' | 'sticker-03' | 'sticker-05' | 'sticker-06' | 'sticker-07' | 'sticker-08' | 'sticker-09' | 'sticker-10';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  animated?: boolean;
}

/**
 * Composant pour afficher les stickers de logo avec blob backgrounds
 * Sticker-01 et 02 sont en SVG, les autres en WebP optimisés
 */
const LogoSticker: React.FC<LogoStickerProps> = ({
  variant,
  size = 'md',
  className = '',
  animated = true,
}) => {
  // Mapping des tailles
  const sizes = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64',
    '2xl': 'w-96 h-96',
  };

  // Déterminer l'extension (SVG pour 01/02, WebP pour les autres)
  const getExtension = () => {
    return variant === 'sticker-01' || variant === 'sticker-02' ? 'svg' : 'webp';
  };

  const imagePath = `/images/logos/stickers/logo/${variant}.${getExtension()}`;

  // Animation de rotation légère
  const animationProps = animated
    ? {
        whileHover: { scale: 1.05, rotate: 3 },
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }
    : {};

  const Component = animated ? motion.img : 'img';

  return (
    <Component
      src={imagePath}
      alt="Glitter Production Logo Sticker"
      className={`${sizes[size]} object-contain ${className}`}
      loading="lazy"
      {...animationProps}
    />
  );
};

export default LogoSticker;
