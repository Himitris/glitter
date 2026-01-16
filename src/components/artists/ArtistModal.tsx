import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Music, Globe } from "lucide-react";
import { Artist } from "../../types";
import { OptimizedImage } from "../ui";

interface ArtistModalProps {
  artist: Artist;
  isOpen: boolean;
  onClose: () => void;
}

const ArtistModal: React.FC<ArtistModalProps> = ({ artist, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = Array.isArray(artist.image) ? artist.image : [artist.image];
  const hasMultipleImages = images.length > 1;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Bloquer le scroll du body de manière simple
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen, artist.id]);

  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Overlay Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0B0B0B]/85"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#FFFFF6] rounded-3xl border-2 border-[#0B0B0B] shadow-2xl max-w-4xl w-full overflow-hidden max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton de fermeture */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white/95 p-2 rounded-full hover:bg-white transition-colors shadow-md"
            >
              <X size={24} className="text-[#0B0B0B]" />
            </button>

            {/* Contenu du modal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-h-[90vh]">
              {/* Section Image */}
              <div className="relative h-48 sm:h-56 md:h-full bg-[#0B0B0B]/5 min-h-[400px]">
                <OptimizedImage
                  src={images[currentImageIndex]}
                  alt={artist.name}
                  className="object-contain md:object-cover"
                  containerClassName="w-full h-full"
                  priority
                />

                {/* Navigation d'images */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 p-3 rounded-full hover:bg-white transition-colors shadow-lg active:scale-95"
                    >
                      <ChevronLeft size={24} className="text-[#0B0B0B]" />
                    </button>

                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 p-3 rounded-full hover:bg-white transition-colors shadow-lg active:scale-95"
                    >
                      <ChevronRight size={24} className="text-[#0B0B0B]" />
                    </button>

                    {/* Indicateurs */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`h-2 rounded-full transition-all duration-200 ${
                            index === currentImageIndex
                              ? "bg-white w-8"
                              : "bg-white/50 w-2 hover:bg-white/75"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Section Informations */}
              <div className="p-4 sm:p-6 md:p-8 flex flex-col overflow-y-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B0B0B] mb-2 sm:mb-3 md:mb-4 flex-shrink-0">
                  {artist.name}
                </h2>

                <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#0B0B0B]/20 scrollbar-track-transparent min-h-0 mb-3">
                  <p className="text-[#0B0B0B]/80 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {artist.description}
                  </p>
                </div>

                {/* Liens sociaux - toujours visibles */}
                {(artist.socialLinks.spotify || artist.socialLinks.instagram || artist.socialLinks.website) && (
                  <div className="flex-shrink-0 pt-3 border-t border-[#0B0B0B]/10">
                    <p className="text-xs sm:text-sm text-[#0B0B0B]/60 mb-2 font-medium">
                      Suivez {artist.name}
                    </p>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {artist.socialLinks.spotify && (
                        <a
                          href={artist.socialLinks.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 md:gap-2 bg-[#775CFF] text-white px-3 md:px-4 py-2 rounded-full hover:bg-[#5a45cc] transition-colors text-xs sm:text-sm"
                        >
                          <Music size={16} className="sm:w-[18px] sm:h-[18px]" />
                          <span className="font-medium">Spotify</span>
                        </a>
                      )}
                      {artist.socialLinks.instagram && (
                        <a
                          href={artist.socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-[#FF4D8F] to-[#EBABFF] text-white px-3 md:px-4 py-2 rounded-full hover:opacity-90 transition-opacity text-xs sm:text-sm"
                        >
                          <img
                            src="/images/Réseaux sociaux/Instagram.png"
                            alt="Instagram"
                            className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                          />
                          <span className="font-medium">Instagram</span>
                        </a>
                      )}
                      {artist.socialLinks.website && (
                        <a
                          href={artist.socialLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 md:gap-2 bg-[#0B0B0B] text-white px-3 md:px-4 py-2 rounded-full hover:bg-[#0B0B0B]/80 transition-colors text-xs sm:text-sm"
                        >
                          <Globe size={16} className="sm:w-[18px] sm:h-[18px]" />
                          <span className="font-medium">Site Web</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default ArtistModal;
