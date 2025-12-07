import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useThrottledScroll } from '../../../hooks/useThrottledScroll';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Optimisé avec throttling pour améliorer les performances
  const toggleVisibility = useCallback(() => {
    if (window.pageYOffset > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  useThrottledScroll(toggleVisibility, 100);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          className="fixed right-6 bottom-6 w-12 h-12 rounded-full bg-gradient-to-r from-[#775CFF] to-[#EBABFF] flex items-center justify-center text-white shadow-lg z-40"
          onClick={scrollToTop}
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;