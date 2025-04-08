import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LazyImage from "./LazyImage";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
  autoplayInterval?: number; // en ms
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  alt,
  className = "",
  autoplayInterval = 5000, // 5 secondes par défaut
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
    if (!isHovered && images.length > 1) {
      const interval = setInterval(nextImage, autoplayInterval);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [isHovered, autoplayInterval, images.length]);

  // Si une seule image, pas besoin de carousel
  if (images.length <= 1) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <LazyImage
          src={images[0]}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          <LazyImage
            src={images[currentIndex]}
            alt={`${alt} - image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Indicateurs de navigation (points) */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Voir l'image ${index + 1}`}
          />
        ))}
      </div>

      {/* Boutons de navigation gauche/droite (visibles au survol) */}
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.8, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 rounded-full p-1 text-white hover:bg-black/50 transition-colors"
              onClick={prevImage}
              aria-label="Image précédente"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 0.8, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 rounded-full p-1 text-white hover:bg-black/50 transition-colors"
              onClick={nextImage}
              aria-label="Image suivante"
            >
              <ChevronRight size={20} />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageCarousel;
