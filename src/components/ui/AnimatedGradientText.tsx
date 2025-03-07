// src/components/ui/AnimatedGradientText.tsx
import React from 'react';

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  gradient?: 'primary' | 'secondary' | 'production' | 'administration' | 'management' | 'prestation';
  speed?: 'slow' | 'medium' | 'fast';
}

const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({
  children,
  as = 'p',
  className = '',
  gradient = 'primary',
  speed = 'medium'
}) => {
  const Tag = as;
  
  // Définir les vitesses d'animation
  const animationDuration = {
    slow: '10s',
    medium: '6s',
    fast: '3s'
  }[speed];
  
  // Définir les couleurs des gradients
  const gradients = {
    primary: 'linear-gradient(to left, #8C52FF, #8C52FF, #FF4D8F, #FF4D8F, #FF8C60, #FF8C60, #FFC74F, #FFC74F, #8C52FF)',
    secondary: 'linear-gradient(to left, #FF4D8F, #FF4D8F, #FF8C60, #FF8C60, #FF4D8F, #FF4D8F)',
    production: 'linear-gradient(to left, #8C52FF, #8C52FF, #B580FF, #B580FF, #8C52FF, #8C52FF)',
    administration: 'linear-gradient(to left, #FF4D8F, #FF4D8F, #FF8AB5, #FF8AB5, #FF4D8F, #FF4D8F)',
    management: 'linear-gradient(to left, #FF8C60, #FF8C60, #FFAA8A, #FFAA8A, #FF8C60, #FF8C60)',
    prestation: 'linear-gradient(to left, #FFC74F, #FFC74F, #FFD887, #FFD887, #FFC74F, #FFC74F)'
  };
  
  // Style pour l'animation en vague
  const waveStyle: React.CSSProperties = {
    display: 'inline-block',
    background: gradients[gradient],
    backgroundSize: '200% 100%',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    animation: `wave-text ${animationDuration} linear infinite`
  };
  
  return (
    <Tag className={className} style={waveStyle}>
      {children}
    </Tag>
  );
};

export default AnimatedGradientText;