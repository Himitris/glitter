import React, { useState } from "react";
import { Music, Instagram, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { Artist } from "../../types";
import GradientText from "../ui/GradientText";
import Star from "../ui/Star";
import LazyImage from "../ui/LazyImage";

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden group relative h-full flex flex-col">
      {/* Hover effect avec le dégradé selon la charte graphique */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#8C52FF] via-[#FF4D8F] to-[#FF8C60] opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

      <div className="aspect-square relative overflow-hidden">
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

      <div className="p-6 flex flex-col flex-grow">
        <GradientText
          as="h3"
          gradient="primary"
          className="text-2xl font-bold mb-3"
        >
          {artist.name}
        </GradientText>

        <div className="relative flex-grow mb-4">
          <p className={`text-gray-600 mb-2 ${expanded ? "" : "line-clamp-4"}`}>
            {artist.description}
          </p>

          {artist.description.length > 150 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-[#FF4D8F] hover:text-[#FF8C60] transition-colors flex items-center text-sm font-medium mt-1"
            >
              {expanded ? (
                <>
                  Voir moins <ChevronUp size={16} className="ml-1" />
                </>
              ) : (
                <>
                  Lire plus <ChevronDown size={16} className="ml-1" />
                </>
              )}
            </button>
          )}
        </div>

        <div className="flex space-x-4 mt-auto">
          {artist.socialLinks.spotify && (
            <a
              href={artist.socialLinks.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#FF4D8F] transition-colors z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <Music size={20} />
            </a>
          )}
          {artist.socialLinks.instagram && (
            <a
              href={artist.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#FF4D8F] transition-colors z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <Instagram size={20} />
            </a>
          )}
          {artist.socialLinks.website && (
            <a
              href={artist.socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#FF4D8F] transition-colors z-10"
              onClick={(e) => e.stopPropagation()}
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
