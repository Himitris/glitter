import React, { useState } from "react";
import { motion } from "framer-motion";
import { Music, Instagram, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { Artist } from "../../types";
import GradientText from "../ui/GradientText";
import Star from "../ui/Star";
import ImageCarousel from "../ui/ImageCarousel"; // Assurez-vous d'importer le nouveau composant

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Gestion des images multiples ou simples
  const artistImages = Array.isArray(artist.image)
    ? artist.image
    : [artist.image];

  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden h-full flex flex-col"
      initial={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
      whileHover={{
        boxShadow:
          "0 10px 25px -5px rgba(140, 82, 255, 0.15), 0 10px 10px -5px rgba(255, 77, 143, 0.1)",
        borderColor: "rgba(255, 140, 96, 0.3)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Carte avec effet de survol amélioré */}
      <div className="aspect-square relative overflow-hidden">
        <ImageCarousel
          images={artistImages}
          alt={artist.name}
          className="w-full h-full"
          isHovered={isHovered}
        />
        {/* Ajouter une petite étoile en haut à droite avec animation */}
        <motion.div
          className="absolute top-3 right-3 z-10"
          animate={
            isHovered
              ? {
                  rotate: [0, 15, 0, -15, 0],
                  scale: [1, 1.2, 1],
                }
              : {}
          }
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 3,
          }}
        >
          <Star className="text-white drop-shadow-lg" size="sm" />
        </motion.div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <motion.div
          animate={isHovered ? { y: [0, -3, 0] } : {}}
          transition={{
            duration: 1,
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 2,
          }}
        >
          <GradientText
            as="h3"
            gradient="primary"
            className="text-2xl font-bold mb-3"
          >
            {artist.name}
          </GradientText>
        </motion.div>

        <div className="relative flex-grow mb-4">
          <p className={`text-gray-600 mb-2 ${expanded ? "" : "line-clamp-4"}`}>
            {artist.description}
          </p>

          {artist.description.length > 150 && (
            <motion.button
              onClick={() => setExpanded(!expanded)}
              className="text-[#FF4D8F] hover:text-[#FF8C60] transition-colors flex items-center text-sm font-medium mt-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
            </motion.button>
          )}
        </div>

        <div className="flex space-x-4 mt-auto">
          {artist.socialLinks.spotify && (
            <motion.a
              href={artist.socialLinks.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#FF4D8F] transition-colors z-10"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Music size={20} />
            </motion.a>
          )}
          {artist.socialLinks.instagram && (
            <motion.a
              href={artist.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#FF4D8F] transition-colors z-10"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Instagram size={20} />
            </motion.a>
          )}
          {artist.socialLinks.website && (
            <motion.a
              href={artist.socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#FF4D8F] transition-colors z-10"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Globe size={20} />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistCard;
