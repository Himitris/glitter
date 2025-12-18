import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import { LogoSVG } from "../ui";
import { useThrottledScroll } from '../../hooks/useThrottledScroll';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  // Optimisé avec throttling pour améliorer les performances
  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;

    // Définir si l'on a scrollé (navbar devient blanche)
    setIsScrolled(currentScrollPos > 20);

    // Basculer la visibilité en fonction de la direction du scroll
    if (currentScrollPos <= 20) {
      setVisible(true);
    } else {
      setVisible(prevScrollPos > currentScrollPos || isMenuOpen);
    }

    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos, isMenuOpen]);

  useThrottledScroll(handleScroll, 100);

  // Empêcher le défilement du body quand le menu mobile est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const headerClassName = `
    fixed w-full z-50 transition-all duration-500
    ${isScrolled ? 'bg-[#FFFFF6]/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}
    ${visible ? 'translate-y-0' : '-translate-y-full'}
  `;

  return (
    <header className={headerClassName}>
      {/* Bordure gradient colorée en bas du header (visible seulement quand scrollé) */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#775CFF] via-[#EBABFF] via-[#FF7A42] to-[#FFFF73]" />
      )}

      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            {/* Monogramme en haut, logo complet après scroll */}
            {!isScrolled ? (
              <Link to="/" className="block">
                <img
                  src="/images/Logo/Monogramme/Monogramme-blanc.webp"
                  alt="Glitter"
                  className="h-12 sm:h-14 w-auto"
                />
              </Link>
            ) : (
              <>
                <LogoSVG
                  colorScheme="light"
                  size="small"
                  className="block sm:hidden"
                />
                <LogoSVG
                  colorScheme="light"
                  size="medium"
                  className="hidden sm:block"
                />
              </>
            )}
          </motion.div>

          {/* Navigation principale cachée en dessous de 1024px */}
          <div className="hidden lg:flex">
            <Navigation />
          </div>

          <motion.button
            className={`lg:hidden p-2 transition-colors duration-300 ${isScrolled ? 'text-[#0B0B0B]' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu - plein écran avec slide depuis la droite */}
        <AnimatePresence mode="wait">
          {isMenuOpen && (
            <motion.div
              className="lg:hidden fixed inset-0 z-[60]"
              style={{ backgroundColor: '#FFFFF6' }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Bordure gradient en haut */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#775CFF] via-[#EBABFF] via-[#FF7A42] to-[#FFFF73] z-10" />

              {/* Header du menu avec logo et bouton fermer */}
              <div className="relative z-10 flex items-center justify-between px-6 py-6">
                <div onClick={() => setIsMenuOpen(false)} className="cursor-pointer">
                  <LogoSVG colorScheme="light" size="small" />
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-[#0B0B0B] hover:text-[#775CFF] transition-colors"
                  aria-label="Fermer le menu"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Navigation centrée */}
              <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-150px)]">
                <Navigation isMobile onItemClick={() => setIsMenuOpen(false)} />
              </div>

              {/* Décoration en bas */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFFF73] via-[#FF7A42] via-[#EBABFF] to-[#775CFF] z-10" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;