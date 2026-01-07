import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Music, Instagram, Globe } from "lucide-react";
import { Artist } from "../../types";
import { ImageWithFallback } from "../ui";

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

  // Reset index when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen, artist.id]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Modal Container - Overlay + Contenu */}
          <div
            className="fixed inset-0 z-50 overflow-y-auto"
            onClick={onClose}
          >
            {/* Overlay Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0B0B0B]/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <div className="min-h-screen px-4 flex items-center justify-center py-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative bg-[#FFFFF6] rounded-3xl border-2 border-[#0B0B0B] shadow-2xl max-w-4xl w-full overflow-hidden z-10 max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Bouton de fermeture */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-md"
                >
                  <X size={24} className="text-[#0B0B0B]" />
                </button>

                {/* Contenu du modal */}
                <div className="grid md:grid-cols-2 gap-0 h-full max-h-[85vh]">
                  {/* Section Image */}
                  <div className="relative h-64 md:h-full bg-[#0B0B0B]/5">
                    <ImageWithFallback
                      src={images[currentImageIndex]}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Navigation d'images */}
                    {hasMultipleImages && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg active:scale-95"
                        >
                          <ChevronLeft size={24} className="text-[#0B0B0B]" />
                        </button>

                        <button
                          onClick={handleNextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg active:scale-95"
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
                  <div className="p-8 flex flex-col h-full overflow-hidden">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0B0B0B] mb-4">
                      {artist.name}
                    </h2>

                    <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#0B0B0B]/20 scrollbar-track-transparent">
                      <p className="text-[#0B0B0B]/80 leading-relaxed whitespace-pre-line">
                        {artist.description}
                      </p>
                    </div>

                    {/* Liens sociaux */}
                    {(artist.socialLinks.spotify || artist.socialLinks.instagram || artist.socialLinks.website) && (
                      <div className="mt-6 pt-6 border-t border-[#0B0B0B]/10">
                        <p className="text-sm text-[#0B0B0B]/60 mb-3 font-medium">
                          Suivez {artist.name}
                        </p>
                        <div className="flex gap-3">
                          {artist.socialLinks.spotify && (
                            <a
                              href={artist.socialLinks.spotify}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 bg-[#775CFF] text-white px-4 py-2 rounded-full hover:bg-[#5a45cc] transition-colors"
                            >
                              <Music size={18} />
                              <span className="text-sm font-medium">Spotify</span>
                            </a>
                          )}
                          {artist.socialLinks.instagram && (
                            <a
                              href={artist.socialLinks.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 bg-gradient-to-r from-[#FF4D8F] to-[#EBABFF] text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                            >
                              <Instagram size={18} />
                              <span className="text-sm font-medium">Instagram</span>
                            </a>
                          )}
                          {artist.socialLinks.website && (
                            <a
                              href={artist.socialLinks.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 bg-[#0B0B0B] text-white px-4 py-2 rounded-full hover:bg-[#0B0B0B]/80 transition-colors"
                            >
                              <Globe size={18} />
                              <span className="text-sm font-medium">Site Web</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ArtistModal;
