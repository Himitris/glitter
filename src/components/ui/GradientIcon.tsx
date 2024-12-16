import React from 'react';
import { colors } from '../../utils/theme';

interface GradientIconProps {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const GradientIcon: React.FC<GradientIconProps> = ({
  icon,
  size = 'md',
  className = ''
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <div className={`
        absolute inset-0 bg-gradient-to-r ${colors.gradient.primary}
        rounded-lg opacity-20 blur
      `} />
      <div className="relative flex items-center justify-center h-full">
        {icon}
      </div>
    </div>
  );
};