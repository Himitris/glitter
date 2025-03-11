// src/components/layout/PageTransition.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  // Animation variants pour la transition des pages
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 10,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -10,
    },
  };

  // Configuration plus lisse pour la transition
  const pageTransition = {
    type: "tween", 
    ease: "easeInOut",
    duration: 0.4
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      // Suppression de la classe pt-20 qui est maintenant gérée dans App.tsx
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;