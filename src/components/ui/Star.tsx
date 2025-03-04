// Créez un nouveau composant src/components/ui/Star.tsx
import React from 'react';

interface StarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Star: React.FC<StarProps> = ({ className = '', size = 'md' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`${sizes[size]} ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M12 0L14.5 9L24 12L14.5 15L12 24L9.5 15L0 12L9.5 9L12 0Z" 
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export default Star;