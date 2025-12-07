import React from 'react';
import { components, effects } from '../../../utils/theme';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  borderVariant?: 'violet' | 'rose' | 'jaune' | 'orange' | 'none';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  glass = false,
  borderVariant = 'none',
}) => {
  // Choisir la bordure selon la variante
  const borderClass = borderVariant !== 'none'
    ? components.card[`border${borderVariant.charAt(0).toUpperCase()}${borderVariant.slice(1)}` as keyof typeof components.card]
    : 'border-[#0B0B0B]/10';

  // Si on a une bordure gradient, on utilise une structure avec wrapper
  if (borderVariant !== 'none') {
    return (
      <div className={`${borderClass} rounded-3xl ${hover ? components.card.hover : ''} ${className}`}>
        <div className={`${components.card.base} ${glass ? effects.glass : ''} w-full h-full`}>
          {children}
        </div>
      </div>
    );
  }

  // Sinon, carte simple
  const baseClassName = `
    ${components.card.base}
    ${hover ? components.card.hover : ''}
    ${glass ? effects.glass : ''}
    border-[#0B0B0B]/10
    ${className}
  `;

  return (
    <div className={baseClassName}>
      {children}
    </div>
  );
};

export default Card;