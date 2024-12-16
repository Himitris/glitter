import React from 'react';
import { motion } from 'framer-motion';
import GradientText from '../ui/GradientText';
import { typography, effects } from '../../utils/theme';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&auto=format&fit=crop&q=80"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30" />
      </div>
      
      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GradientText as="h1" className={typography.heading.h1}>
            Faire briller chaque moment,
            <br />
            ensemble !
          </GradientText>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${typography.body.large} mt-6`}
          >
            Production d'événements uniques et mémorables
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};