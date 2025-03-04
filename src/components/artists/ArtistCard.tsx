import React from 'react';
import { Music, Instagram, Globe } from 'lucide-react';
import { Artist } from '../../types';
import GradientText from '../ui/GradientText';
import Star from '../ui/Star';
import LazyImage from '../ui/LazyImage';

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden group relative">
      {/* Hover effect avec le dégradé selon la charte graphique */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#8C52FF] via-[#FF4D8F] to-[#FF8C60] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

      <div className="aspect-square relative overflow-hidden">
        {/* Remplacer la balise img par */}
        <LazyImage
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Ajouter une petite étoile en haut à droite */}
        <div className="absolute top-3 right-3">
          <Star className="text-white" size="sm" />
        </div>
      </div>

      <div className="p-6">
        <GradientText as="h3" gradient="primary" className="text-2xl font-bold mb-3">
          {artist.name}
        </GradientText>
        <p className="text-gray-400 mb-6">{artist.description}</p>

        <div className="flex space-x-4">
          {artist.socialLinks.spotify && (
            <a
              href={artist.socialLinks.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#FF4D8F] transition-colors"
            >
              <Music size={20} />
            </a>
          )}
          {artist.socialLinks.instagram && (
            <a
              href={artist.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#FF4D8F] transition-colors"
            >
              <Instagram size={20} />
            </a>
          )}
          {artist.socialLinks.website && (
            <a
              href={artist.socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#FF4D8F] transition-colors"
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