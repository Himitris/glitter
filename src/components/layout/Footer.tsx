import { Instagram, Mail } from "lucide-react";
import LogoSVG from "../ui/LogoSVG";

const Footer = () => {
  return (
    <footer className="bg-[#FFFFF6] text-[#0B0B0B] py-12 border-t-2 border-[#0B0B0B]/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <LogoSVG
            colorScheme="light"
            size="medium"
            className="hidden sm:block"
          />

          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#0B0B0B]">Contact</h4>
            <p className="text-[#0B0B0B]/70">
              Email: glitterproductions24@gmail.com
            </p>
            <p className="text-[#0B0B0B]/70">Située entre les Landes et le Tarn</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#0B0B0B]">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/glitter_prod"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0B0B0B]/60 hover:text-[#775CFF] transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="mailto:glitterproductions24@gmail.com"
                className="text-[#0B0B0B]/60 hover:text-[#775CFF] transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#0B0B0B]/10 mt-8 pt-8 text-center text-[#0B0B0B]/70">
          <p>
            &copy; {new Date().getFullYear()} Glitter Productions. Tous droits
            réservés.
          </p>
          <div className="flex justify-center space-x-4 mt-4 text-sm">
            <a href="#" className="hover:text-[#775CFF] transition-colors">
              Politique de confidentialité
            </a>
            <span className="text-[#0B0B0B]/40">•</span>
            <a href="#" className="hover:text-[#775CFF] transition-colors">
              Conditions d'utilisation
            </a>
            <span className="text-[#0B0B0B]/40">•</span>
            <a href="#" className="hover:text-[#775CFF] transition-colors">
              Mentions légales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
