import React from 'react';

interface ColorfulBackgroundProps {
  variant?: 'violet-rose' | 'rose-orange' | 'orange-jaune' | 'full-spectrum';
  className?: string;
  children?: React.ReactNode;
  intensity?: 'light' | 'medium' | 'strong';
}

/**
 * Composant de fond avec l'image de nuages rose/violet
 * Utilise l'image background.webp de la charte graphique Glitter 2025
 */
const ColorfulBackground: React.FC<ColorfulBackgroundProps> = ({
  className = '',
  children,
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/background.webp')" }}
      />

      {/* Overlay léger pour améliorer la lisibilité du texte */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Contenu */}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default ColorfulBackground;
