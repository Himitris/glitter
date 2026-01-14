import React, { memo } from 'react';
import { Globe, Music } from 'lucide-react';
import { GradientText } from '../text';
import { Star } from '../decorative';
import OptimizedImage from './OptimizedImage';

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

const TeamMember: React.FC<TeamMemberProps> = memo(({
  name,
  role,
  image,
  description,
  department = 'production',
  socialLinks
}) => {
  // Map des couleurs par département - Charte graphique 2025
  const colorMap = {
    'production': '#775CFF',
    'administration': '#EBABFF',
    'management': '#FF7A42',
    'prestation': '#FFFF73'
  };

  const departmentColor = colorMap[department];

  return (
    <div className="bg-white border border-[#0B0B0B]/10 rounded-2xl overflow-hidden group">
      <div className="aspect-square relative overflow-hidden bg-gray-100">
        <OptimizedImage
          src={image}
          alt={name}
          aspectRatio="1/1"
          priority
          className="transition-transform duration-300 group-hover:scale-105 will-change-transform"
          containerClassName="w-full h-full"
        />
        {/* Ajouter une étoile selon la charte */}
        <div className="absolute top-4 right-4 z-10">
          <Star className={`text-[${departmentColor}]`} size="sm" />
        </div>
      </div>
      <div className="p-6">
        <GradientText
          as="h3"
          gradient={department}
          className="text-2xl font-bold mb-2"
        >
          {name}
        </GradientText>
        <p
          className={`text-[${departmentColor}] mb-4 uppercase tracking-wider text-sm`}
        >
          {role}
        </p>
        <div className="text-gray-600 mb-6 whitespace-pre-line">
          {description}
        </div>

        {socialLinks && (
          <div className="flex space-x-4">
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <img
                  src="/images/Réseaux sociaux/Instagram.png"
                  alt="Instagram"
                  className="w-6 h-6 object-contain"
                />
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
});

TeamMember.displayName = 'TeamMember';

export default TeamMember;