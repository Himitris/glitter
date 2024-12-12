import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Globe, Music } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  description: string;
  socialLinks?: {
    instagram?: string;
    website?: string;
    spotify?: string;
  };
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image, description, socialLinks }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <p className="text-pink-400 mb-4">{role}</p>
        <p className="text-gray-400 mb-6">{description}</p>
        
        {socialLinks && (
          <div className="flex space-x-4">
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-400 transition-colors"
              >
                <Instagram size={20} />
              </a>
            )}
            {socialLinks.website && (
              <a
                href={socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-400 transition-colors"
              >
                <Globe size={20} />
              </a>
            )}
            {socialLinks.spotify && (
              <a
                href={socialLinks.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-400 transition-colors"
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