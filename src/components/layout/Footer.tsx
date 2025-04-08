import { Instagram, Mail } from "lucide-react";
import LogoSVG from "../ui/LogoSVG";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <LogoSVG
            colorScheme="light"
            size="medium"
            className="hidden sm:block" // Taille moyenne sur tablette et desktop
          />

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-600">
              Email: glitterproductions24@gmail.com
            </p>
            <p className="text-gray-600">Située entre les Landes et le Tarn</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/glitter_prod"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-400 transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="mailto:glitterproductions24@gmail.com"
                className="text-gray-600 hover:text-pink-400 transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Glitter Productions. Tous droits
            réservés.
          </p>
          <div className="flex justify-center space-x-4 mt-4 text-sm">
            <a href="#" className="hover:text-pink-400 transition-colors">
              Politique de confidentialité
            </a>
            <span className="text-gray-400">•</span>
            <a href="#" className="hover:text-pink-400 transition-colors">
              Conditions d'utilisation
            </a>
            <span className="text-gray-400">•</span>
            <a href="#" className="hover:text-pink-400 transition-colors">
              Mentions légales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
