import React from 'react';
import { Instagram, Globe, Music } from 'lucide-react';
import GradientText from './GradientText';
import Star from './Star';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  description: string;
  department?: 'production' | 'administration' | 'management' | 'prestation';
  socialLinks?: {
    instagram?: string;
    website?: string;
    spotify?: string;
  };
}

const TeamMember: React.FC<TeamMemberProps> = ({ 
  name, 
  role, 
  image, 
  description, 
  department = 'production',
  socialLinks 
}) => {
  // Map des couleurs par département
  const colorMap = {
    'production': '#8C52FF',
    'administration': '#FF4D8F',
    'management': '#FF8C60',
    'prestation': '#FFC74F'
  };
  
  const departmentColor = colorMap[department];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden group">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Ajouter une étoile selon la charte */}
        <div className="absolute top-4 right-4">
          <Star className={`text-[${departmentColor}]`} size="sm" />
        </div>
      </div>
      <div className="p-6">
        <GradientText as="h3" gradient={department} className="text-2xl font-bold mb-2">
          {name}
        </GradientText>
        <p className={`text-[${departmentColor}] mb-4 uppercase tracking-wider text-sm`}>{role}</p>
        <p className="text-gray-600 mb-6">{description}</p>
        
        {socialLinks && (
          <div className="flex space-x-4">
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-600 hover:text-[${departmentColor}] transition-colors`}
              >
                <Instagram size={20} />
              </a>
            )}
            {socialLinks.website && (
              <a
                href={socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-600 hover:text-[${departmentColor}] transition-colors`}
              >
                <Globe size={20} />
              </a>
            )}
            {socialLinks.spotify && (
              <a
                href={socialLinks.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-600 hover:text-[${departmentColor}] transition-colors`}
              >
                <Music size={20} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMember;