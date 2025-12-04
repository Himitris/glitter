import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './Navigation';
import LogoSVG from '../ui/LogoSVG';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  // Effet pour la gestion du défilement et de la visibilité de la navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Définir si l'on a scrollé 
      setIsScrolled(currentScrollPos > 20);

      // Basculer la visibilité en fonction de la direction du scroll
      // Ne pas cacher la navbar si on est en haut de la page
      if (currentScrollPos <= 20) {
        setVisible(true);
      } else {
        setVisible(prevScrollPos > currentScrollPos || isMenuOpen);
      }
      
      setPrevScrollPos(currentScrollPos);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, isMenuOpen]);

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
            {/* Logo avec taille adaptative et couleur selon scroll */}
            <LogoSVG
              colorScheme={isScrolled ? "light" : "dark"}
              size="small"
              className="block sm:hidden" // Petite taille sur mobile
            />
            <LogoSVG
              colorScheme={isScrolled ? "light" : "dark"}
              size="medium"
              className="hidden sm:block" // Taille moyenne sur tablette et desktop
            />
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

        {/* Mobile Menu avec animation améliorée */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden fixed top-16 sm:top-20 left-0 right-0 bottom-0 bg-[#FFFFF6]/95 backdrop-blur-md z-40"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "calc(100vh - 4rem)" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Navigation isMobile onItemClick={() => setIsMenuOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;