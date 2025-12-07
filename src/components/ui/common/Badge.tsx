import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'violet' | 'rose' | 'orange' | 'jaune' | 'outlined' | 'solid';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

/**
 * Badge component avec les couleurs de la charte Glitter
 */
const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'solid',
  size = 'md',
  className = '',
  animated = false,
}) => {
  // Styles par variante
  const variantStyles = {
    violet: 'bg-gradient-to-r from-[#775CFF] to-[#EBABFF] text-[#FFFFF6]',
    rose: 'bg-gradient-to-r from-[#EBABFF] to-[#FF7A42] text-[#0B0B0B]',
    orange: 'bg-gradient-to-r from-[#FF7A42] to-[#EBABFF] text-[#0B0B0B]',
    jaune: 'bg-gradient-to-r from-[#FFFF73] to-[#EBABFF] text-[#0B0B0B]',
    outlined: 'bg-[#FFFFF6] border-2 border-[#0B0B0B] text-[#0B0B0B]',
    solid: 'bg-[#0B0B0B] text-[#FFFFF6]',
  };

  // Tailles
  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const Component = animated ? motion.span : 'span';
  const animationProps = animated
    ? {
        whileHover: { scale: 1.1 },
        transition: { type: 'spring', stiffness: 400, damping: 10 },
      }
    : {};

  return (
    <Component
      className={`
        inline-flex items-center justify-center
        rounded-full
        font-semibold
        uppercase tracking-wide
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...animationProps}
    >
      {children}
    </Component>
  );
};

export default Badge;
