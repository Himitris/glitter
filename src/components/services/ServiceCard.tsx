import React from 'react';
import { Music, Film, Calendar, FileText, Users } from 'lucide-react';
import GradientText from '../ui/GradientText';
import { colors, effects } from '../../utils/theme';

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

  // Détermine la couleur du gradient en fonction du type de service
  const gradientColor = `from-${colors.brand[color]}/20 to-${colors.brand[color]}/5`;
  const iconColor = `text-${colors.brand[color]}`;
  
  // Associe chaque couleur au département correspondant
  const colorMap = {
    "production": "text-[#8C52FF]",
    "administration": "text-[#FF4D8F]",
    "management": "text-[#FF8C60]",
    "prestation": "text-[#FFC74F]"
  };

  return (
    <div className="relative group">
      {/* Gradient Border Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient[color]} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl`} />
      
      <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm group-hover:border-transparent transition-all">
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
        
        <p className="text-gray-400 mb-6">{description}</p>
        
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-300 group/item">
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
  );
};

export default ServiceCard;