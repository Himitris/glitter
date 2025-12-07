import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { components } from '../../../utils/theme';

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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const baseClassName = `
    ${components.section.base}
    ${variant === 'light' ? components.section.light : ''}
    ${className}
  `;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className={baseClassName}
    >
      <div className={components.container}>
        {children}
      </div>
    </motion.section>
  );
};

export default Section;