import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react"; // Utilisation de l'icône Sparkles de Lucide React

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = "" }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Réinitialiser l'état quand la source change
    setImageLoaded(false);

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageLoaded(true);
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Fond avec dégradé animé */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse" />

          {/* Symbole de chargement avec animation */}
          <motion.div
            className="flex flex-col items-center justify-center z-10"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="text-[#FF4D8F] h-8 w-8 mb-2" />
            <motion.div
              className="h-1 w-16 rounded-full bg-gradient-to-r from-[#8C52FF] via-[#FF4D8F] to-[#FF8C60]"
              animate={{
                scaleX: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      )}
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className={className}
      />
    </div>
  );
};

export default LazyImage;
