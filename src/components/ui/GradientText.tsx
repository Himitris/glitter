import React from 'react';
import { typography } from '../../utils/theme';

interface GradientTextProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  animate?: boolean;
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  as = 'p',
  className = '',
  animate = false,
}) => {
  const Tag = as;
  const baseClassName = `
    ${typography.text.gradient}
    ${animate ? 'animate-gradient bg-[size:400%_400%]' : ''}
    ${className}
  `;
  
  return (
    <Tag className={baseClassName}>
      {children}
    </Tag>
  );
};

export default GradientText;