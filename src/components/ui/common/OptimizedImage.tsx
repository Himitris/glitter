import React, { useState, useCallback, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface OptimizedImageProps {
  src: string | undefined;
  alt: string;
  className?: string;
  containerClassName?: string;
  width?: number;
  height?: number;
  aspectRatio?: string; // ex: "4/3", "1/1", "16/9"
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  fallbackSrc?: string;
  priority?: boolean; // Pour les images above-the-fold
  placeholderColor?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Composant d'image optimisé avec :
 * - Lazy loading via IntersectionObserver
 * - Skeleton animé pendant le chargement
 * - Transition fluide à l'apparition
 * - Fallback en cas d'erreur
 * - Support des dimensions fixes pour éviter le layout shift
 * - Mode priorité pour les images critiques (above-the-fold)
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
  const [imageState, setImageState] = useState<"loading" | "loaded" | "error">(
    "loading"
  );
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);
  const imageRef = useRef<HTMLImageElement>(null);

  // Configuration de l'IntersectionObserver
  const { ref: containerRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px 0px", // Précharge 300px avant d'être visible
    threshold: 0,
    skip: priority, // Skip l'observer si c'est une image prioritaire
  });

  // Réinitialiser quand src change
  useEffect(() => {
    setCurrentSrc(src || fallbackSrc);
    setImageState("loading");
  }, [src, fallbackSrc]);

  // Précharger l'image en mémoire pour une transition plus fluide
  useEffect(() => {
    if (!currentSrc || (!inView && !priority)) return;

    const img = new Image();
    img.src = currentSrc;

    if (img.complete) {
      setImageState("loaded");
      onLoad?.();
    } else {
      img.onload = () => {
        setImageState("loaded");
        onLoad?.();
      };
      img.onerror = () => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        } else {
          setImageState("error");
          onError?.();
        }
      };
    }

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [currentSrc, inView, priority, fallbackSrc, onLoad, onError]);

  const handleImageLoad = useCallback(() => {
    setImageState("loaded");
    onLoad?.();
  }, [onLoad]);

  const handleImageError = useCallback(() => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setImageState("error");
      onError?.();
    }
  }, [currentSrc, fallbackSrc, onError]);

  // Calculer le style du conteneur
  const containerStyle: React.CSSProperties = {
    backgroundColor: imageState !== "loaded" ? placeholderColor : undefined,
    ...(aspectRatio ? { aspectRatio } : {}),
    ...(width && height && !aspectRatio
      ? { aspectRatio: `${width} / ${height}` }
      : {}),
  };

  const shouldRenderImage = priority || inView;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${containerClassName}`}
      style={containerStyle}
    >
      {/* Skeleton de chargement avec animation shimmer */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-out ${
          imageState === "loaded" ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"
          style={{ backgroundSize: "200% 100%" }}
        />
      </div>

      {/* Placeholder d'erreur */}
      {imageState === "error" && (
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

      {/* Image - rendue seulement quand visible ou prioritaire */}
      {shouldRenderImage && imageState !== "error" && (
        <img
          ref={imageRef}
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`w-full h-full transition-opacity duration-500 ease-out ${
            imageState === "loaded" ? "opacity-100" : "opacity-0"
          } ${className}`}
          style={{ objectFit }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
