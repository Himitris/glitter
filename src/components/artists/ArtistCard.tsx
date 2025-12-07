import React, { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Instagram, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { Artist } from "../../types";

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = memo(({ artist }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = Array.isArray(artist.image) ? artist.image : [artist.image];
  const hasMultipleImages = images.length > 1;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

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
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={artist.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
              />
            </AnimatePresence>

            {/* Boutons de navigation pour images multiples */}
            {hasMultipleImages && (
              <>
                <motion.button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft size={20} className="text-[#0B0B0B]" />
                </motion.button>

                <motion.button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight size={20} className="text-[#0B0B0B]" />
                </motion.button>

                {/* Indicateurs de points */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentImageIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? "bg-white w-6"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Overlay au hover avec liens sociaux */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 via-[#0B0B0B]/40 to-transparent flex items-end justify-center pb-6"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
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
            </motion.div>
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
