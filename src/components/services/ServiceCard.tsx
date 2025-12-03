import React from 'react';
import { Music, Film, Calendar, FileText, Users } from 'lucide-react';
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

  return (
    <div className="h-full">
      {/* Bordure gradient */}
      <div className={`bg-gradient-to-br ${borderGradients[color]} p-[2px] rounded-3xl h-full group hover:shadow-2xl hover:shadow-[#EBABFF]/30 transition-all duration-300`}>
        <div className="relative bg-[#FFFFF6] rounded-3xl p-8 w-full h-full flex flex-col">
          {/* Icon with gradient background */}
          <div className="relative w-16 h-16 mb-6">
            <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient[color]} rounded-lg opacity-20 blur`} />
            <div className="relative flex items-center justify-center h-full">
              <IconComponent className={`w-8 h-8 ${colorMap[color]}`} />
            </div>
          </div>

          {/* Title with gradient text */}
          <GradientText as="h3" gradient={color} className="text-2xl font-bold mb-4">
            {title}
          </GradientText>

          <p className="text-[#0B0B0B]/70 mb-6 flex-grow">{description}</p>

          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-[#0B0B0B]/80 group/item">
                {/* Animated gradient dot */}
                <div className="relative w-2 h-2 mr-3 rounded-full overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient[color]} animate-gradient bg-[length:200%_200%]`} />
                </div>
                <span className={`group-hover/item:${colorMap[color]} transition-colors`}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
