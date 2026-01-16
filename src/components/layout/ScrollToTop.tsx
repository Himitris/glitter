import { useEffect, startTransition } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Utilise startTransition pour que le scroll ne bloque pas la navigation
    startTransition(() => {
      // Scroll instantané pour éviter conflit avec PageTransition
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;