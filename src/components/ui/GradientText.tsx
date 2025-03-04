import React from 'react';
import { typography, colors } from '../../utils/theme';

interface GradientTextProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  animate?: boolean;
  gradient?: 'primary' | 'secondary' | 'production' | 'administration' | 'management' | 'prestation';
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  as = 'p',
  className = '',
  animate = false,
  gradient = 'primary'
}) => {
  const Tag = as;
  
  // Sélectionner le gradient approprié basé sur l'activité
  let gradientClasses = '';
  
  switch(gradient) {
    case 'primary':
      gradientClasses = 'from-[#8C52FF] via-[#FF4D8F] via-[#FF8C60] to-[#FFC74F]';
      break;
    case 'secondary':
      gradientClasses = 'from-[#FF4D8F] to-[#FF8C60]';
      break;
    case 'production':
      gradientClasses = 'from-[#8C52FF] to-[#8C52FF]';
      break;
    case 'administration':
      gradientClasses = 'from-[#FF4D8F] to-[#FF4D8F]';
      break;
    case 'management':
      gradientClasses = 'from-[#FF8C60] to-[#FF8C60]';
      break;
    case 'prestation':
      gradientClasses = 'from-[#FFC74F] to-[#FFC74F]';
      break;
    default:
      gradientClasses = 'from-[#8C52FF] via-[#FF4D8F] via-[#FF8C60] to-[#FFC74F]';
  }
  
  const baseClassName = `
    bg-gradient-to-r ${gradientClasses} text-transparent bg-clip-text
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