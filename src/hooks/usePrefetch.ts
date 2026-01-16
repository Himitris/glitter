// Hook pour précharger les routes au hover
// Améliore la perception de performance en chargeant les pages avant le clic
import { useCallback } from 'react';

// Mapping des routes vers leurs modules lazy
const routeModules: Record<string, () => Promise<any>> = {
  '/': () => import('../pages/Home'),
  '/about': () => import('../pages/About'),
  '/artists': () => import('../pages/Artists'),
  '/djs': () => import('../pages/DJS'),
  '/services': () => import('../pages/Services'),
  '/contact': () => import('../pages/Contact'),
};

// Set pour tracker les routes déjà préchargées
const prefetchedRoutes = new Set<string>();

export const usePrefetch = () => {
  const prefetch = useCallback((path: string) => {
    // Ne précharger qu'une seule fois
    if (prefetchedRoutes.has(path)) {
      return;
    }

    const importFn = routeModules[path];
    if (importFn) {
      prefetchedRoutes.add(path);
      // Précharge le module en arrière-plan
      importFn().catch(() => {
        // Si ça échoue, retirer du set pour réessayer plus tard
        prefetchedRoutes.delete(path);
      });
    }
  }, []);

  return { prefetch };
};
