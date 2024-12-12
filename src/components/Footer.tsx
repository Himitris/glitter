import React from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-transparent bg-clip-text">
              Glitter Production
            </h3>
            <p className="text-gray-400">
              Faire briller chaque moment, ensemble !
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">Email: contact@glitterproduction.com</p>
            <p className="text-gray-400">Tel: +33 (0)1 23 45 67 89</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/glitter_prod/" className="text-white hover:text-pink-400 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-white hover:text-pink-400 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-white hover:text-pink-400 transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Glitter Production. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;