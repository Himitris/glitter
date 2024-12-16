import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { colors, components } from '../../utils/theme';
import { animations } from '../../utils/animations';

interface GradientSectionProps {
  children: React.ReactNode;
  className?: string;
  gradient?: keyof typeof colors.gradient;
  animate?: boolean;
}

const GradientSection: React.FC<GradientSectionProps> = ({
  children,
  className = '',
  gradient = 'dark',
  animate = true
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const Content = animate ? motion.div : 'div';

  return (
    <section className={`
      relative py-20 overflow-hidden
      bg-gradient-to-br ${colors.gradient[gradient]}
      ${className}
    `}>
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-orange-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <Content
        ref={ref}
        initial={animate ? animations.fadeIn.initial : undefined}
        animate={inView && animate ? animations.fadeIn.animate : undefined}
        transition={animations.fadeIn.transition}
        className={components.container}
      >
        {children}
      </Content>
    </section>
  );
};