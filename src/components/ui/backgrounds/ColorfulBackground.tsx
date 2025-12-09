import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

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
 * Optimisé pour mobile avec animations réduites
 */
const ColorfulBackground: React.FC<ColorfulBackgroundProps> = ({
  variant = 'full-spectrum',
  className = '',
  children,
  intensity = 'strong',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  // Détection mobile côté client uniquement
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sur mobile ou si reduced motion, pas d'animations
  const shouldAnimate = !prefersReducedMotion && !isMobile;
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

      {/* Couches de gradients - animés sur desktop, statiques sur mobile */}
      <div className="absolute inset-0">
        {/* Couche 1 - Haut gauche */}
        {shouldAnimate ? (
          <motion.div
            className={`absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-gradient-to-br ${colors.layer1} ${blurIntensity[intensity]} opacity-90 will-change-transform`}
            animate={{
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
          />
        ) : (
          <div className={`absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-gradient-to-br ${colors.layer1} ${blurIntensity[intensity]} opacity-90`} />
        )}

        {/* Couche 2 - Centre droit */}
        {shouldAnimate ? (
          <motion.div
            className={`absolute top-[10%] -right-[10%] w-[60%] h-[80%] bg-gradient-to-bl ${colors.layer2} ${blurIntensity[intensity]} opacity-85 will-change-transform`}
            animate={{
              x: [0, -25, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
          />
        ) : (
          <div className={`absolute top-[10%] -right-[10%] w-[60%] h-[80%] bg-gradient-to-bl ${colors.layer2} ${blurIntensity[intensity]} opacity-85`} />
        )}

        {/* Couche 3 - Bas (uniquement pour full-spectrum) */}
        {variant === 'full-spectrum' && colors.layer3 && (
          shouldAnimate ? (
            <motion.div
              className={`absolute -bottom-[10%] left-[20%] w-[70%] h-[60%] bg-gradient-to-t ${colors.layer3} ${blurIntensity[intensity]} opacity-80 will-change-transform`}
              animate={{
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 28,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear',
              }}
            />
          ) : (
            <div className={`absolute -bottom-[10%] left-[20%] w-[70%] h-[60%] bg-gradient-to-t ${colors.layer3} ${blurIntensity[intensity]} opacity-80`} />
          )
        )}

        {/* Accents lumineux - seulement sur desktop */}
        {shouldAnimate && (
          <>
            <motion.div
              className={`absolute top-[30%] left-[15%] w-[40%] h-[40%] bg-gradient-to-br ${colors.accent} blur-3xl opacity-60 will-change-[opacity]`}
              animate={{
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear',
              }}
            />

            <motion.div
              className={`absolute bottom-[20%] right-[20%] w-[35%] h-[35%] bg-gradient-to-tl ${colors.accent} blur-3xl opacity-50 will-change-[opacity]`}
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear',
              }}
            />
          </>
        )}
      </div>

      {/* Overlay léger pour adoucir si nécessaire */}
      <div className="absolute inset-0 bg-white/5" />

      {/* Contenu */}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default ColorfulBackground;
