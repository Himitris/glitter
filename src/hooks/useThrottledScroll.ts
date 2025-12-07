import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook personnalisé pour throttler les événements de scroll
 * Améliore les performances en limitant la fréquence d'exécution
 *
 * @param callback - Fonction à exécuter lors du scroll
 * @param delay - Délai en millisecondes entre chaque exécution (défaut: 100ms)
 */
export const useThrottledScroll = (callback: () => void, delay = 100) => {
  const timeoutRef = useRef<number>();
  const callbackRef = useRef(callback);

  // Mettre à jour la référence du callback pour éviter les stale closures
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const throttledCallback = useCallback(() => {
    if (timeoutRef.current) return;

    timeoutRef.current = window.setTimeout(() => {
      callbackRef.current();
      timeoutRef.current = undefined;
    }, delay);
  }, [delay]);

  useEffect(() => {
    // Utiliser { passive: true } pour améliorer les performances
    window.addEventListener('scroll', throttledCallback, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledCallback);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [throttledCallback]);
};
