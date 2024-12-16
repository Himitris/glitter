import React from 'react';
import { Music, Film, Calendar } from 'lucide-react';
import { colors, effects } from '../../utils/theme';

interface ServiceCardProps {
  title: string;
  icon: string;
  description: string;
  features: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon, description, features }) => {
  const IconComponent = {
    Music,
    Film,
    Calendar
  }[icon] || Music;

  return (
    <div className="relative group">
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
      
      <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm group-hover:border-transparent transition-all">
        {/* Icon with gradient background */}
        <div className="relative w-16 h-16 mb-6">
          <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient.primary} rounded-lg opacity-20 blur`} />
          <div className="relative flex items-center justify-center h-full">
            <IconComponent className="w-8 h-8 text-pink-500" />
          </div>
        </div>
        
        {/* Title with gradient text */}
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 text-transparent bg-clip-text">
          {title}
        </h3>
        
        <p className="text-gray-400 mb-6">{description}</p>
        
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-300 group/item">
              {/* Animated gradient dot */}
              <div className="relative w-2 h-2 mr-3 rounded-full overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient.primary} animate-gradient bg-[length:200%_200%]`} />
              </div>
              <span className="group-hover/item:text-pink-400 transition-colors">
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