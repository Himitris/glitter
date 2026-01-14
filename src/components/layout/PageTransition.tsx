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

  // Configuration rapide et fluide pour la transition
  const pageTransition = {
    type: "tween",
    ease: [0.25, 0.1, 0.25, 1], // Cubic-bezier pour une transition plus naturelle
    duration: 0.25 // Réduit de 0.4s à 0.25s pour une navigation plus réactive
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      style={{ willChange: 'opacity, transform' }} // Optimisation GPU
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;