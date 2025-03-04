import React, { useEffect, useState, useId } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxBannerProps {
  image: string;
  height?: string;
  children: React.ReactNode;
  className?: string;
}

const ParallaxBanner: React.FC<ParallaxBannerProps> = ({ 
  image,
  height = "40vh",
  children,
  className = ""
}) => {
  // Générer un ID unique pour chaque instance du composant
  const uniqueId = useId();
  const containerId = `parallax-container-${uniqueId}`;
  
  const [elementTop, setElementTop] = useState(0);
  const { scrollY } = useScroll();
  
  useEffect(() => {
    const updatePosition = () => {
      const element = document.getElementById(containerId);
      if (element) {
        const { top } = element.getBoundingClientRect();
        setElementTop(top + window.scrollY);
      }
    };
    
    // Mettre à jour la position initiale
    updatePosition();
    
    // Réagir aux changements de taille de fenêtre
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [containerId]);

  const y = useTransform(
    scrollY,
    [elementTop - 300, elementTop + 300],
    [0, 100] // Réduire l'amplitude du parallaxe
  );

  return (
    <div 
      id={containerId}
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
    >
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center h-[120%]"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30" />
      </motion.div>
      <div className="relative h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default ParallaxBanner;