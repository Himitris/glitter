import React, { memo } from "react";
import { motion } from "framer-motion";
import { Music, Instagram, Globe } from "lucide-react";
import { Artist } from "../../types";

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = memo(({ artist }) => {
  // Obtenir la première image (ou l'image unique)
  const mainImage = Array.isArray(artist.image) ? artist.image[0] : artist.image;
  const hasMultipleImages = Array.isArray(artist.image) && artist.image.length > 1;

  return (
    <motion.div
      className="w-full h-full group"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Bordure gradient */}
      <div className="bg-gradient-to-br from-[#775CFF] to-[#EBABFF] p-[2px] rounded-3xl h-full hover:shadow-2xl hover:shadow-[#775CFF]/20 transition-all duration-300">
        <div className="bg-[#FFFFF6] rounded-3xl overflow-hidden h-full flex flex-col">

          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={mainImage}
              alt={artist.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Indicateur d'images multiples */}
            {hasMultipleImages && (
              <div className="absolute bottom-3 right-3 bg-[#0B0B0B]/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                +{Array.isArray(artist.image) ? artist.image.length - 1 : 0}
              </div>
            )}

            {/* Overlay au hover avec liens sociaux */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 via-[#0B0B0B]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
              <div className="flex gap-4">
                {artist.socialLinks.spotify && (
                  <motion.a
                    href={artist.socialLinks.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Music size={20} className="text-white" />
                  </motion.a>
                )}
                {artist.socialLinks.instagram && (
                  <motion.a
                    href={artist.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Instagram size={20} className="text-white" />
                  </motion.a>
                )}
                {artist.socialLinks.website && (
                  <motion.a
                    href={artist.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Globe size={20} className="text-white" />
                  </motion.a>
                )}
              </div>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-[#775CFF] to-[#EBABFF] text-transparent bg-clip-text">
              {artist.name}
            </h3>

            <p className="text-[#0B0B0B]/70 text-sm leading-relaxed line-clamp-3">
              {artist.description}
            </p>
          </div>

        </div>
      </div>
    </motion.div>
  );
});

ArtistCard.displayName = 'ArtistCard';

export default ArtistCard;
