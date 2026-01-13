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

        {/* Mobile Menu - menu déroulant */}
        <AnimatePresence mode="wait">
          {isMenuOpen && (
            <>
              {/* Overlay pour fermer le menu */}
              <motion.div
                className="lg:hidden fixed inset-0 bg-[#0B0B0B]/40 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Menu content */}
              <motion.div
                className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-[#FFFFF6] rounded-2xl shadow-xl border border-gray-200 z-50 overflow-hidden"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Bordure gradient en haut */}
                <div className="h-1 bg-gradient-to-r from-[#775CFF] via-[#EBABFF] via-[#FF7A42] to-[#FFFF73]" />

                <Navigation isMobile onItemClick={() => setIsMenuOpen(false)} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;