import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LazyImage from "./LazyImage";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
  autoplayInterval?: number; // en ms
  isHovered?: boolean; // Nouvelle prop pour coordonner avec l'état de survol du parent
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  alt,
  className = "",
  autoplayInterval = 5000, // 5 secondes par défaut
  isHovered = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localHover, setLocalHover] = useState(false);

  // Combine l'état de survol local et celui passé du parent
  const effectiveHover = localHover || isHovered;

  // Fonction pour passer à l'image suivante
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Fonction pour passer à l'image précédente
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Autoplay qui s'arrête quand on survole le carousel
  useEffect(() => {
    if (!effectiveHover && images.length > 1) {
      const interval = setInterval(nextImage, autoplayInterval);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [effectiveHover, autoplayInterval, images.length]);

  // Si une seule image, pas besoin de carousel
  if (images.length <= 1) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <motion.div
          whileHover={{ scale: 1.03 }} // Effet léger de zoom
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-full"
        >
          <LazyImage
            src={images[0]}
            alt={alt}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setLocalHover(true)}
      onMouseLeave={() => setLocalHover(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full"
        >
          <LazyImage
            src={images[currentIndex]}
            alt={`${alt} - image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Indicateurs de navigation (points) avec animation améliorée */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all backdrop-blur-sm ${
              index === currentIndex
                ? "bg-white scale-125 shadow-[0_0_5px_rgba(255,255,255,0.7)]"
                : "bg-white/50 hover:bg-white/80"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Voir l'image ${index + 1}`}
          />
        ))}
      </div>

      {/* Boutons de navigation gauche/droite (visibles au survol) */}
      <AnimatePresence>
        {effectiveHover && (
          <>
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.9, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm rounded-full p-1.5 text-white hover:bg-black/60 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Image précédente"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 0.9, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm rounded-full p-1.5 text-white hover:bg-black/60 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Image suivante"
            >
              <ChevronRight size={20} />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Overlay au survol - subtil et élégant */}
      <AnimatePresence>
        {effectiveHover && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageCarousel;
