import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { components } from '../../../utils/theme';
import { useOptimizedAnimation } from '../../../hooks/useOptimizedAnimation';

interface SectionProps {
  children: React.ReactNode;
  variant?: 'default' | 'light';
  className?: string;
  delay?: number;
}

const Section: React.FC<SectionProps> = ({
  children,
  variant = 'default',
  className = '',
  delay = 0
}) => {
  const { shouldReduceMotion, duration } = useOptimizedAnimation();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: shouldReduceMotion ? 0 : 0.05,
    rootMargin: shouldReduceMotion ? '0px' : '0px 0px -50px 0px',
  });

  const baseClassName = `
    ${components.section.base}
    ${variant === 'light' ? components.section.light : ''}
    ${className}
  `;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: duration.slow, delay: shouldReduceMotion ? 0 : delay }}
      className={baseClassName}
    >
      <div className={components.container}>
        {children}
      </div>
    </motion.section>
  );
};

export default Section;