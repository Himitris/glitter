import React from 'react';

interface GradientBorderProps {
  children: React.ReactNode;
  gradient?: 'violet' | 'rose' | 'orange' | 'jaune' | 'primary';
  borderWidth?: '1' | '2' | '3' | '4';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | 'blob';
  className?: string;
  innerClassName?: string;
}

/**
 * Composant réutilisable pour créer des bordures gradient
 * Technique du wrapper pour supporter tous les navigateurs
 */
const GradientBorder: React.FC<GradientBorderProps> = ({
  children,
  gradient = 'primary',
  borderWidth = '2',
  rounded = '3xl',
  className = '',
  innerClassName = '',
}) => {
  // Définir les gradients
  const gradients = {
    violet: 'from-[#775CFF] to-[#EBABFF]',
    rose: 'from-[#EBABFF] to-[#FF7A42]',
    orange: 'from-[#FF7A42] to-[#EBABFF]',
    jaune: 'from-[#FFFF73] to-[#EBABFF]',
    primary: 'from-[#775CFF] via-[#EBABFF] via-[#FF7A42] to-[#FFFF73]',
  };

  // Définir les épaisseurs de bordure (padding)
  const borderWidths = {
    '1': 'p-[1px]',
    '2': 'p-[2px]',
    '3': 'p-[3px]',
    '4': 'p-[4px]',
  };

  // Définir les arrondis (doit être appliqué aux deux éléments)
  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
    blob: 'rounded-[40%_60%_70%_30%/50%_40%_60%_50%]',
  };

  return (
    <div
      className={`
        bg-gradient-to-br ${gradients[gradient]}
        ${borderWidths[borderWidth]}
        ${roundedClasses[rounded]}
        ${className}
      `}
    >
      <div className={`bg-[#FFFFF6] ${roundedClasses[rounded]} w-full h-full ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default GradientBorder;
