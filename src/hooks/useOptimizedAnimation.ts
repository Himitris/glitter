import { useEffect, useState } from 'react';

/**
 * Hook pour optimiser les animations selon les préférences utilisateur
 * et les capacités de l'appareil
 */
export const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Vérifier la préférence utilisateur
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

/**
 * Détecter si l'appareil est mobile ou peu puissant
 */
export const useIsLowPowerDevice = (): boolean => {
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    // Détecter mobile par la taille d'écran ou le touch
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Détecter les appareils avec peu de mémoire (si disponible)
    const hasLowMemory = (navigator as any).deviceMemory !== undefined
      && (navigator as any).deviceMemory < 4;

    // Détecter peu de coeurs CPU (si disponible)
    const hasLowCPU = navigator.hardwareConcurrency !== undefined
      && navigator.hardwareConcurrency < 4;

    setIsLowPower(isMobile || hasLowMemory || hasLowCPU);
  }, []);

  return isLowPower;
};

/**
 * Hook combiné pour obtenir les paramètres d'animation optimisés
 */
export const useOptimizedAnimation = () => {
  const prefersReducedMotion = useReducedMotion();
  const isLowPower = useIsLowPowerDevice();

  const shouldReduceMotion = prefersReducedMotion || isLowPower;

  return {
    // Désactiver les animations si nécessaire
    shouldAnimate: !prefersReducedMotion,

    // Réduire la complexité sur appareils peu puissants
    shouldReduceMotion,

    // Variantes d'animation optimisées
    fadeIn: shouldReduceMotion
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
      : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } },

    // Hover simplifié (désactivé sur mobile)
    hoverScale: shouldReduceMotion
      ? {}
      : { whileHover: { scale: 1.02 }, transition: { duration: 0.2 } },

    // Hover lift (désactivé sur mobile)
    hoverLift: shouldReduceMotion
      ? {}
      : { whileHover: { y: -4 }, transition: { duration: 0.2 } },

    // Viewport options optimisées
    viewportOptions: {
      once: true,
      margin: shouldReduceMotion ? '0px' : '-50px',
      amount: shouldReduceMotion ? 0 : 0.1,
    },

    // Durées réduites
    duration: {
      fast: shouldReduceMotion ? 0.1 : 0.2,
      normal: shouldReduceMotion ? 0.15 : 0.3,
      slow: shouldReduceMotion ? 0.2 : 0.5,
    },
  };
};

export default useOptimizedAnimation;
