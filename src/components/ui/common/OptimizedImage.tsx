import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface OptimizedImageProps {
  src: string | undefined;
  alt: string;
  className?: string;
  containerClassName?: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  fallbackSrc?: string;
  priority?: boolean;
  placeholderColor?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Composant d'image optimisé simplifié :
 * - Lazy loading natif du navigateur (loading="lazy")
 * - Décodage asynchrone (decoding="async")
 * - Transition CSS pure sans JavaScript
 * - Skeleton minimal avec animate-pulse
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  containerClassName = "",
  width,
  height,
  aspectRatio,
  objectFit = "cover",
  fallbackSrc = "/images/placeholder.jpg",
  priority = false,
  placeholderColor = "#e5e7eb",
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);

  // IntersectionObserver pour déclencher le rendu de l'image
  const { ref: containerRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "100px 0px", // Zone tampon pour éviter rechargements lors scroll rapide
    threshold: 0.01, // Commence à charger dès que 1% de l'image est visible
    skip: priority,
  });

  // Réinitialiser quand src change
  useEffect(() => {
    setCurrentSrc(src || fallbackSrc);
    setIsLoaded(false);
    setHasError(false);
  }, [src, fallbackSrc]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
      onError?.();
    }
  };

  const shouldShowImage = priority || inView;

  const containerStyle: React.CSSProperties = {
    backgroundColor: !isLoaded ? placeholderColor : undefined,
    ...(aspectRatio ? { aspectRatio } : {}),
    ...(width && height && !aspectRatio
      ? { aspectRatio: `${width} / ${height}` }
      : {}),
  };

  return (
    <div
      ref={containerRef}
      className={`optimized-image-container relative overflow-hidden ${containerClassName}`}
      style={containerStyle}
    >
      {/* Skeleton avec indicateur de chargement */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: placeholderColor }}
        >
          {/* Spinner élégant aux couleurs Glitter */}
          <div className="w-8 h-8 rounded-full border-2 border-gray-300 border-t-[#775CFF] animate-spin" />
        </div>
      )}

      {/* Placeholder d'erreur */}
      {hasError && (
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

      {/* Image - le navigateur gère tout via loading="lazy" et decoding="async" */}
      {shouldShowImage && !hasError && (
        <img
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full transition-opacity duration-200 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${className}`}
          style={{ objectFit }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
