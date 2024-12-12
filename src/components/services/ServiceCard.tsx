import React from 'react';
import {  Music, Film } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  icon: string;
  description: string;
  features: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon, description, features }) => {
  const IconComponent = {
    
    Music,
    Film
  }[icon] || Music;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors">
      <div className="mb-6">
        <IconComponent className="w-12 h-12 text-pink-500" />
      </div>
      
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-300">
            <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mr-3" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard;