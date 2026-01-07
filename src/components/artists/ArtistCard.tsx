import React, { memo, useState } from "react";
import { Music, Instagram, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { Artist } from "../../types";
import ArtistModal from "./ArtistModal";
import { ImageWithFallback } from "../ui";

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = memo(({ artist }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = Array.isArray(artist.image) ? artist.image : [artist.image];
  const hasMultipleImages = images.length > 1;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="w-full h-full group">
        {/* Carte simple - hover CSS natif pour performance */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-[#0B0B0B] rounded-3xl h-full bg-[#FFFFF6] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ease-out flex flex-col cursor-pointer"
        >

        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          {/* Image avec transition CSS simple */}
          <ImageWithFallback
            src={images[currentImageIndex]}
            alt={artist.name}
            width={400}
            height={400}
            className="w-full h-full object-cover transition-opacity duration-200"
            loading="lazy"
          />

          {/* Boutons de navigation pour images multiples */}
          {hasMultipleImages && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white active:scale-95 z-10"
              >
                <ChevronLeft size={20} className="text-[#0B0B0B]" />
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white active:scale-95 z-10"
              >
                <ChevronRight size={20} className="text-[#0B0B0B]" />
              </button>

              {/* Indicateurs de points */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex
                        ? "bg-white w-6"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Overlay au hover avec liens sociaux - CSS natif */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 via-[#0B0B0B]/40 to-transparent flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex gap-4">
              {artist.socialLinks.spotify && (
                <a
                  href={artist.socialLinks.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 hover:scale-110 active:scale-95 transition-all duration-150"
                >
                  <Music size={20} className="text-white" />
                </a>
              )}
              {artist.socialLinks.instagram && (
                <a
                  href={artist.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 hover:scale-110 active:scale-95 transition-all duration-150"
                >
                  <Instagram size={20} className="text-white" />
                </a>
              )}
              {artist.socialLinks.website && (
                <a
                  href={artist.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 hover:scale-110 active:scale-95 transition-all duration-150"
                >
                  <Globe size={20} className="text-white" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-2xl font-bold mb-3 text-[#0B0B0B]">
            {artist.name}
          </h3>

          <p className="text-[#0B0B0B]/70 text-sm leading-relaxed line-clamp-3">
            {artist.description}
          </p>
        </div>

      </div>
    </div>

    {/* Modal */}
    <ArtistModal
      artist={artist}
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    />
  </>
  );
});

ArtistCard.displayName = 'ArtistCard';

export default ArtistCard;
