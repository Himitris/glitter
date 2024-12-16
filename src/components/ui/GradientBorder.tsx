import React from 'react';
import { colors } from '../../utils/theme';

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GradientBorder: React.FC<GradientBorderProps> = ({
  children,
  className = '',
  hover = false
}) => {
  return (
    <div className="relative group">
      {/* Gradient border effect */}
      <div className={`
        absolute inset-0 bg-gradient-to-r ${colors.gradient.primary} rounded-2xl
        ${hover ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}
        transition-opacity duration-300 blur-xl
      `} />
      
      <div className={`
        relative bg-gradient-to-br ${colors.gradient.card}
        border border-gray-800 rounded-2xl
        backdrop-blur-sm
        ${hover ? 'group-hover:border-transparent' : ''}
        transition-all
        ${className}
      `}>
        {children}
      </div>
    </div>
  );
};