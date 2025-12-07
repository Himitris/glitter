import React from 'react';
import { motion } from 'framer-motion';

interface ColorfulBackgroundProps {
  variant?: 'violet-rose' | 'rose-orange' | 'orange-jaune' | 'full-spectrum';
  className?: string;
  children?: React.ReactNode;
  intensity?: 'light' | 'medium' | 'strong';
}

/**
 * Composant de fond avec des couleurs VRAIMENT prononcées et assumées
 * Inspiré directement de l'image de la charte graphique Glitter 2025
 * Fonds colorés vibrants violet-rose-orange avec effet nuageux
 */
const ColorfulBackground: React.FC<ColorfulBackgroundProps> = ({
  variant = 'full-spectrum',
  className = '',
  children,
  intensity = 'strong',
}) => {
  // Définir les palettes de couleurs selon la variante
  const colorSchemes = {
    'violet-rose': {
      base: 'from-[#775CFF] via-[#A87FFF] to-[#EBABFF]',
      layer1: 'from-[#775CFF]/80 via-[#9B6FFF]/70 to-transparent',
      layer2: 'from-transparent via-[#EBABFF]/60 to-[#C48FFF]/50',
      accent: 'from-[#775CFF]/40 to-[#EBABFF]/40',
    },
    'rose-orange': {
      base: 'from-[#EBABFF] via-[#FFB8D9] to-[#FF7A42]',
      layer1: 'from-[#EBABFF]/80 via-[#FFA8C8]/70 to-transparent',
      layer2: 'from-transparent via-[#FFB8A8]/60 to-[#FF7A42]/50',
      accent: 'from-[#EBABFF]/40 to-[#FF7A42]/40',
    },
    'orange-jaune': {
      base: 'from-[#FF7A42] via-[#FFB85C] to-[#FFFF73]',
      layer1: 'from-[#FF7A42]/80 via-[#FFA65C]/70 to-transparent',
      layer2: 'from-transparent via-[#FFEB73]/60 to-[#FFFF73]/50',
      accent: 'from-[#FF7A42]/40 to-[#FFFF73]/40',
    },
    'full-spectrum': {
      base: 'from-[#775CFF] via-[#EBABFF] via-[#FFB8D9] to-[#FF7A42]',
      layer1: 'from-[#775CFF]/70 via-[#A87FFF]/60 to-transparent',
      layer2: 'from-transparent via-[#EBABFF]/70 via-[#FFB8D9]/60 to-transparent',
      layer3: 'from-transparent via-[#FFA8C8]/50 to-[#FF7A42]/60',
      accent: 'from-[#775CFF]/30 via-[#EBABFF]/30 to-[#FF7A42]/30',
    },
  };

  const colors = colorSchemes[variant];

  // Intensité du blur selon le paramètre
  const blurIntensity = {
    light: 'blur-2xl',
    medium: 'blur-xl',
    strong: 'blur-lg',
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Fond de base avec gradient principal */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.base}`} />

      {/* Couches de gradients animés pour effet nuageux */}
      <div className="absolute inset-0">
        {/* Couche 1 - Haut gauche */}
        <motion.div
          className={`absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-gradient-to-br ${colors.layer1} ${blurIntensity[intensity]} opacity-90`}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />

        {/* Couche 2 - Centre droit */}
        <motion.div
          className={`absolute top-[10%] -right-[10%] w-[60%] h-[80%] bg-gradient-to-bl ${colors.layer2} ${blurIntensity[intensity]} opacity-85`}
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />

        {/* Couche 3 - Bas (uniquement pour full-spectrum) */}
        {variant === 'full-spectrum' && colors.layer3 && (
          <motion.div
            className={`absolute -bottom-[10%] left-[20%] w-[70%] h-[60%] bg-gradient-to-t ${colors.layer3} ${blurIntensity[intensity]} opacity-80`}
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        )}

        {/* Accents lumineux subtils */}
        <motion.div
          className={`absolute top-[30%] left-[15%] w-[40%] h-[40%] bg-gradient-to-br ${colors.accent} blur-3xl opacity-60`}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className={`absolute bottom-[20%] right-[20%] w-[35%] h-[35%] bg-gradient-to-tl ${colors.accent} blur-3xl opacity-50`}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      {/* Overlay léger pour adoucir si nécessaire */}
      <div className="absolute inset-0 bg-white/5" />

      {/* Contenu */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ColorfulBackground;
