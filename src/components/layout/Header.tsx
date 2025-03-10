import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Navigation from './Navigation';
import LogoSVG from '../ui/LogoSVG'; // Importez votre composant Logo SVG

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClassName = `
    fixed w-full z-50 transition-all duration-300
    ${isScrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'}
  `;

  return (
    <header className={headerClassName}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Utilisation du logo SVG */}
          <LogoSVG colorScheme="dark" />

          {/* Navigation principale cachée en dessous de 1024px */}
          <div className="hidden lg:flex">
            <Navigation />
          </div>

          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-sm">
            <Navigation
              isMobile
              onItemClick={() => setIsMenuOpen(false)}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
