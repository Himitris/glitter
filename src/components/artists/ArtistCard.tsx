import React from 'react';
import { Music, Instagram, Globe } from 'lucide-react';
import { Artist } from '../../types';

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden group">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3">{artist.name}</h3>
        <p className="text-gray-400 mb-6">{artist.description}</p>
        
        <div className="flex space-x-4">
          {artist.socialLinks.spotify && (
            <a
              href={artist.socialLinks.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-400 transition-colors"
            >
              <Music size={20} />
            </a>
          )}
          {artist.socialLinks.instagram && (
            <a
              href={artist.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-400 transition-colors"
            >
              <Instagram size={20} />
            </a>
          )}
          {artist.socialLinks.website && (
            <a
              href={artist.socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-400 transition-colors"
            >
              <Globe size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;