// Créez un nouveau fichier src/components/ui/ParallaxBanner.tsx
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxBannerProps {
  image: string;
  height?: string;
  children: React.ReactNode;
}

const ParallaxBanner: React.FC<ParallaxBannerProps> = ({ 
  image,
  height = "40vh",
  children 
}) => {
  const [elementTop, setElementTop] = useState(0);
  const { scrollY } = useScroll();
  
  useEffect(() => {
    const element = document.getElementById('parallax-container');
    if (element) {
      const { top } = element.getBoundingClientRect();
      setElementTop(top + window.scrollY);
    }
  }, []);

  const y = useTransform(
    scrollY,
    [elementTop - 500, elementTop + 500],
    [0, 200]
  );

  return (
    <div 
      id="parallax-container"
      className="relative overflow-hidden" 
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