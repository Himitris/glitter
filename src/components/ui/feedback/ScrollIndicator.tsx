import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useThrottledScroll } from '../../../hooks/useThrottledScroll';

const ScrollIndicator = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Optimisé avec throttling pour améliorer les performances
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const totalDocScrollLength = docHeight - windowHeight;
    const scrollPercentage = Math.min(100, Math.max(0, (scrollTop / totalDocScrollLength) * 100));

    setScrollPercentage(scrollPercentage);
  }, []);

  useThrottledScroll(handleScroll, 100);

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#775CFF] via-[#EBABFF] to-[#FF7A42] z-50"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollPercentage / 100 }}
      transition={{ ease: "easeOut" }}
      style={{ transformOrigin: "0% 50%" }}
    />
  );
};

export default ScrollIndicator;