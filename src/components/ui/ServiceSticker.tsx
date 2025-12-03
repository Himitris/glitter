import React from 'react';
import { motion } from 'framer-motion';

interface ServiceStickerProps {
  service: 'administration' | 'dir-prod' | 'management' | 'production' | 'regie-artiste' | 'regie-site';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animated?: boolean;
}

/**
 * Composant pour afficher les stickers de services
 * Utilise les stickers officiels de la charte graphique
 */
const ServiceSticker: React.FC<ServiceStickerProps> = ({
  service,
  size = 'md',
  className = '',
  animated = true,
}) => {
  // Mapping des tailles
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  // Mapping des noms de services pour l'alt text
  const serviceNames = {
    'administration': 'Administration',
    'dir-prod': 'Direction de Production',
    'management': 'Management',
    'production': 'Production',
    'regie-artiste': 'Régie Artiste',
    'regie-site': 'Régie Site',
  };

  // Props d'animation
  const animationProps = animated
    ? {
        whileHover: { scale: 1.1, rotate: 5 },
        whileTap: { scale: 0.95 },
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }
    : {};

  const Component = animated ? motion.img : 'img';

  return (
    <Component
      src={`/images/logos/stickers/services/${service}.webp`}
      alt={serviceNames[service]}
      className={`${sizes[size]} object-contain ${className}`}
      loading="lazy"
      {...animationProps}
    />
  );
};

export default ServiceSticker;
