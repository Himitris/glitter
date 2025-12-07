import React, { memo } from 'react';
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

const ServiceCard: React.FC<ServiceCardProps> = memo(({ title, icon, description, features, color }) => {
  const IconComponent = {
    Music,
    Film,
    Calendar,
    FileText,
    Users
  }[icon] || Music;

  // Associe chaque couleur au département correspondant - Amélioration de la lisibilité du jaune
  const colorMap = {
    "production": "text-[#775CFF]",
    "administration": "text-[#EBABFF]",
    "management": "text-[#FF7A42]",
    "prestation": "text-[#D4A500]" // Jaune plus foncé pour meilleure lisibilité
  };

  // Bordures gradient par couleur
  const borderGradients = {
    "production": 'from-[#775CFF] to-[#EBABFF]',
    "administration": 'from-[#EBABFF] to-[#FF7A42]',
    "management": 'from-[#FF7A42] to-[#EBABFF]',
    "prestation": 'from-[#D4A500] to-[#EBABFF]' // Jaune doré
  };

  // Couleurs pour les backgrounds d'icônes - plus visibles
  const iconBackgrounds = {
    "production": 'from-[#775CFF]/15 to-[#EBABFF]/15',
    "administration": 'from-[#EBABFF]/15 to-[#FF7A42]/15',
    "management": 'from-[#FF7A42]/15 to-[#EBABFF]/15',
    "prestation": 'from-[#D4A500]/15 to-[#EBABFF]/15'
  };

  // Couleurs pour les bullet points
  const bulletColors = {
    "production": 'bg-[#775CFF]',
    "administration": 'bg-[#EBABFF]',
    "management": 'bg-[#FF7A42]',
    "prestation": 'bg-[#D4A500]'
  };

  return (
    <motion.div
      className="h-full"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Bordure gradient avec ombre au hover */}
      <div className={`bg-gradient-to-br ${borderGradients[color]} p-[2px] rounded-3xl h-[480px] hover:shadow-2xl hover:shadow-${color}/20 transition-all duration-300`}>
        {/* Fond blanc avec hauteur fixe pour uniformité */}
        <div className="relative bg-[#FFFFF6] rounded-3xl p-6 sm:p-8 h-[476px] flex flex-col overflow-hidden">

          {/* Icon avec fond plus prononcé */}
          <div className="relative w-16 h-16 mb-6">
            <div className={`absolute inset-0 bg-gradient-to-br ${iconBackgrounds[color]} rounded-2xl backdrop-blur-sm`} />
            <div className="relative flex items-center justify-center h-full">
              <IconComponent className={`w-8 h-8 ${colorMap[color]}`} strokeWidth={2.5} />
            </div>
          </div>

          {/* Title avec meilleure hiérarchie */}
          <h3 className={`text-xl sm:text-2xl font-bold mb-4 ${colorMap[color]}`}>
            {title}
          </h3>

          {/* Description - flex-grow pour pousser la liste en bas */}
          <p className="text-[#0B0B0B]/60 mb-6 text-sm sm:text-base leading-relaxed">
            {description}
          </p>

          {/* Liste des features - toujours à la même hauteur */}
          <ul className="space-y-3 mt-auto">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start text-[#0B0B0B]/70 text-sm sm:text-base"
              >
                {/* Bullet point coloré plus visible */}
                <div className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${bulletColors[color]}`} />
                <span className="leading-relaxed">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
