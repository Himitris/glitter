import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Navigation from './Navigation';
import { colors } from '../../utils/theme';

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

  const logoClassName = `
    text-2xl font-bold bg-gradient-to-r
    ${colors.gradient.primary} text-transparent bg-clip-text
  `;

  return (
    <header className={headerClassName}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className={logoClassName}>
            Glitter Production
          </Link>

          <Navigation />

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-sm">
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