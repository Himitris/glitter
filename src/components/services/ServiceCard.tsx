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

  // Couleurs très subtiles pour les icônes
  const iconBackgrounds = {
    "production": 'from-[#775CFF]/10 to-[#EBABFF]/10',
    "administration": 'from-[#EBABFF]/10 to-[#FF7A42]/10',
    "management": 'from-[#FF7A42]/10 to-[#EBABFF]/10',
    "prestation": 'from-[#FFFF73]/10 to-[#EBABFF]/10'
  };

  return (
    <div className="h-full">
      {/* Bordure gradient subtile */}
      <div className={`bg-gradient-to-br ${borderGradients[color]} p-[2px] rounded-3xl h-full hover:shadow-lg transition-shadow duration-300`}>
        {/* Fond blanc pur, simple et élégant */}
        <div className="relative bg-white rounded-3xl p-6 sm:p-8 h-full flex flex-col">

          {/* Icon avec fond subtil */}
          <div className="relative w-14 h-14 mb-5">
            <div className={`absolute inset-0 bg-gradient-to-br ${iconBackgrounds[color]} rounded-xl`} />
            <div className="relative flex items-center justify-center h-full">
              <IconComponent className={`w-7 h-7 ${colorMap[color]}`} strokeWidth={2} />
            </div>
          </div>

          {/* Title with gradient text */}
          <GradientText as="h3" gradient={color} className="text-xl sm:text-2xl font-bold mb-3">
            {title}
          </GradientText>

          <p className="text-[#0B0B0B]/60 mb-5 flex-grow text-sm sm:text-base leading-relaxed">
            {description}
          </p>

          {/* Liste des features */}
          <ul className="space-y-2.5">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start text-[#0B0B0B]/70 text-sm sm:text-base"
              >
                {/* Simple dot coloré */}
                <div className={`w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0 bg-gradient-to-r ${colors.gradient[color]}`} />
                <span className="leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
