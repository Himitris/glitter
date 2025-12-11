import React, { useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  width?: number;
  height?: number;
  placeholderColor?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = "",
  containerClassName = "",
  width,
  height,
  placeholderColor = "#e5e7eb",
  objectFit = "cover",
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Utiliser IntersectionObserver pour un meilleur contrôle du lazy loading
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px", // Précharger 200px avant d'être visible
    threshold: 0,
  });

  const handleLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setImageError(true);
  }, []);

  // Style pour le placeholder avec aspect ratio préservé
  const placeholderStyle: React.CSSProperties = {
    backgroundColor: placeholderColor,
    ...(width && height ? { aspectRatio: `${width} / ${height}` } : {}),
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${containerClassName}`}
      style={placeholderStyle}
    >
      {/* Skeleton de chargement avec animation shimmer */}
      {!imageLoaded && !imageError && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer"
          style={{ backgroundSize: "200% 100%" }}
        />
      )}

      {/* Placeholder d'erreur */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      {/* Image - ne charge que si visible */}
      {inView && !imageError && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          } ${className}`}
          style={{ objectFit }}
        />
      )}
    </div>
  );
};

export default LazyImage;
