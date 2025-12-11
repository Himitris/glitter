import { Instagram, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { LogoSVG } from "../ui";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[#FFFFF6] via-[#FFFFF6] to-[#EBABFF]/10 text-[#0B0B0B] py-16 overflow-hidden">
      {/* Bordure gradient colorée en haut */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#775CFF] via-[#EBABFF] via-[#FF7A42] to-[#FFFF73]" />

      {/* Formes organiques décoratives en arrière-plan - animation seulement quand visible */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br from-[#775CFF]/20 to-[#EBABFF]/20 rounded-[40%_60%_70%_30%/50%_40%_60%_50%] blur-3xl"
          initial={{ rotate: 0, scale: 1 }}
          whileInView={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#FF7A42]/20 to-[#FFFF73]/20 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl"
          initial={{ rotate: 0, scale: 1 }}
          whileInView={{
            rotate: [0, -15, 15, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center md:items-start"
          >
            <LogoSVG
              colorScheme="light"
              size="medium"
              className="mb-4"
            />
            <p className="text-[#0B0B0B]/70 text-center md:text-left">
              Production d'événements musicaux uniques et mémorables
            </p>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center md:text-left"
          >
            <h4 className="text-xl font-bold mb-6 text-[#0B0B0B] bg-gradient-to-r from-[#775CFF] to-[#EBABFF] bg-clip-text text-transparent">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:glitterproductions24@gmail.com"
                className="flex items-center justify-center md:justify-start gap-2 text-[#0B0B0B]/70 hover:text-[#775CFF] transition-colors group"
              >
                <Mail size={18} className="group-hover:scale-110 transition-transform" />
                <span>glitterproductions24@gmail.com</span>
              </a>
              <p className="text-[#0B0B0B]/70">
                📍 Située entre les Landes et le Tarn
              </p>
            </div>
          </motion.div>

          {/* Social Media Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h4 className="text-xl font-bold mb-6 text-[#0B0B0B] bg-gradient-to-r from-[#EBABFF] to-[#FF7A42] bg-clip-text text-transparent">
              Suivez-nous
            </h4>
            <div className="flex space-x-4 justify-center md:justify-start">
              <motion.a
                href="https://instagram.com/glitter_prod"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-[#775CFF] to-[#EBABFF] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href="mailto:glitterproductions24@gmail.com"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EBABFF] to-[#FF7A42] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t-2 border-[#0B0B0B]/10 pt-8"
        >
          <p className="text-[#0B0B0B]/70 text-sm text-center">
            &copy; {new Date().getFullYear()} Glitter Productions. Tous droits réservés.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
