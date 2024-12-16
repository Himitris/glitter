import React from 'react';
import { colors, effects } from '../../utils/theme';

interface ProductionStepProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const ProductionStep: React.FC<ProductionStepProps> = ({
  title,
  description,
  icon,
  index
}) => {
  return (
    <div className="relative group">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
      
      <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm group-hover:border-transparent transition-all">
        {/* Step number with gradient */}
        <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center text-white font-bold">
          {index}
        </div>
        
        {/* Icon with gradient background */}
        <div className="relative w-16 h-16 mb-6 ml-8">
          <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient.primary} rounded-lg opacity-20 blur`} />
          <div className="relative flex items-center justify-center h-full">
            {icon}
          </div>
        </div>
        
        {/* Title with gradient */}
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 text-transparent bg-clip-text">
          {title}
        </h3>
        
        <p className="text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProductionStep;