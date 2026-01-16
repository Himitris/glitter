// src/components/layout/PageTransition.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  // Animation variants pour la transition des pages
  // Réduit le déplacement Y pour une transition plus subtile et performante
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  // Configuration ultra-rapide pour navigation instantanée
  const pageTransition = {
    type: "tween",
    ease: "easeOut", // Ease simple plus performant que cubic-bezier
    duration: 0.15 // Réduit à 0.15s pour navigation quasi-instantanée
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      style={{
        willChange: 'opacity', // Seulement opacity pour maximum performance
        transform: 'translateZ(0)', // Force GPU layer
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;