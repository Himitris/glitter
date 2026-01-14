import { useState, useCallback } from 'react';
import { useThrottledScroll } from '../../../hooks/useThrottledScroll';

const ScrollIndicator = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Optimisé avec throttling pour améliorer les performances
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const totalDocScrollLength = docHeight - windowHeight;
    const percentage = Math.min(100, Math.max(0, (scrollTop / totalDocScrollLength) * 100));

    setScrollPercentage(percentage);
  }, []);

  useThrottledScroll(handleScroll, 100);

  // Utilise CSS transform au lieu de Framer Motion pour de meilleures performances
  // transform: scaleX est GPU-accelerated et ne cause pas de re-layouts
  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#775CFF] via-[#EBABFF] to-[#FF7A42] z-50 origin-left will-change-transform"
      style={{
        transform: `scaleX(${scrollPercentage / 100})`,
        transition: 'transform 100ms ease-out',
      }}
    />
  );
};

export default ScrollIndicator;
