import React from 'react';
import { Music, Film, Calendar, FileText, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import GradientText from '../ui/GradientText';
import { colors } from '../../utils/theme';

interface ServiceCardProps {
  title: string;
  icon: string;
  description: string;
  features: string[];
  color: "production" | "administration" | "management" | "prestation";
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon, description, features, color }) => {
  const IconComponent = {
    Music,
    Film,
    Calendar,
    FileText,
    Users
  }[icon] || Music;

  // Associe chaque couleur au département correspondant
  const colorMap = {
    "production": "text-[#775CFF]",
    "administration": "text-[#EBABFF]",
    "management": "text-[#FF7A42]",
    "prestation": "text-[#FFFF73]"
  };

  // Bordures gradient par couleur
  const borderGradients = {
    "production": 'from-[#775CFF] to-[#EBABFF]',
    "administration": 'from-[#EBABFF] to-[#FF7A42]',
    "management": 'from-[#FF7A42] to-[#EBABFF]',
    "prestation": 'from-[#FFFF73] to-[#EBABFF]'
  };

  // Fonds colorés subtils pour harmoniser avec le nouveau design
  const backgroundGradients = {
    "production": 'from-[#775CFF]/5 via-[#EBABFF]/5 to-transparent',
    "administration": 'from-[#EBABFF]/5 via-[#FF7A42]/5 to-transparent',
    "management": 'from-[#FF7A42]/5 via-[#EBABFF]/5 to-transparent',
    "prestation": 'from-[#FFFF73]/5 via-[#EBABFF]/5 to-transparent'
  };

  // Couleurs pour les icônes en arrière-plan
  const iconBackgrounds = {
    "production": 'from-[#775CFF]/20 to-[#EBABFF]/20',
    "administration": 'from-[#EBABFF]/20 to-[#FF7A42]/20',
    "management": 'from-[#FF7A42]/20 to-[#EBABFF]/20',
    "prestation": 'from-[#FFFF73]/20 to-[#EBABFF]/20'
  };

  return (
    <motion.div
      className="h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Bordure gradient avec effet de hover */}
      <div className={`bg-gradient-to-br ${borderGradients[color]} p-[3px] rounded-3xl h-full group hover:shadow-2xl hover:shadow-${color === 'production' ? '[#775CFF]' : color === 'administration' ? '[#EBABFF]' : color === 'management' ? '[#FF7A42]' : '[#FFFF73]'}/40 transition-all duration-300`}>
        {/* Fond avec gradient subtil coloré */}
        <div className={`relative bg-gradient-to-br ${backgroundGradients[color]} backdrop-blur-sm rounded-3xl p-8 w-full h-full flex flex-col overflow-hidden`}>
          {/* Fond blanc avec opacité */}
          <div className="absolute inset-0 bg-[#FFFFF6]/95 rounded-3xl" />

          {/* Blob décoratif en arrière-plan */}
          <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${iconBackgrounds[color]} rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />

          {/* Contenu */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Icon with gradient background */}
            <motion.div
              className="relative w-16 h-16 mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${iconBackgrounds[color]} rounded-2xl blur-sm`} />
              <div className={`relative flex items-center justify-center h-full bg-gradient-to-br ${iconBackgrounds[color]} rounded-2xl`}>
                <IconComponent className={`w-8 h-8 ${colorMap[color]}`} strokeWidth={2.5} />
              </div>
            </motion.div>

            {/* Title with gradient text */}
            <GradientText as="h3" gradient={color} className="text-2xl font-bold mb-4">
              {title}
            </GradientText>

            <p className="text-[#0B0B0B]/70 mb-6 flex-grow leading-relaxed">{description}</p>

            <ul className="space-y-3">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start text-[#0B0B0B]/80 group/item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Animated gradient dot with pulse */}
                  <div className="relative w-2 h-2 mr-3 mt-2 rounded-full overflow-hidden flex-shrink-0">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${colors.gradient[color]}`}
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                      }}
                    />
                  </div>
                  <span className="group-hover/item:translate-x-1 transition-transform duration-200">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
