import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollIndicator = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const totalDocScrollLength = docHeight - windowHeight;
      const scrollPercentage = Math.min(100, Math.max(0, (scrollTop / totalDocScrollLength) * 100));
      
      setScrollPercentage(scrollPercentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8C52FF] via-[#FF4D8F] to-[#FF8C60] z-50"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollPercentage / 100 }}
      transition={{ ease: "easeOut" }}
      style={{ transformOrigin: "0% 50%" }}
    />
  );
};

export default ScrollIndicator;