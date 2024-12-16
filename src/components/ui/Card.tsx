import React from 'react';
import { components, effects } from '../../utils/theme';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  glass = false,
}) => {
  const baseClassName = `
    ${components.card.base}
    ${hover ? components.card.hover : ''}
    ${glass ? effects.glass : ''}
    ${className}
  `;

  return (
    <div className={baseClassName}>
      {children}
    </div>
  );
};

export default Card;