import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface ImageWithFallbackProps {
  src: string | undefined;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  priority?: boolean;
}

/**
 * Composant Image avec fallback automatique vers placeholder
 * Inclut lazy loading avec skeleton, pré-décodage et transitions fluides
 */
const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc = "/images/placeholder.jpg",
  alt,
  className = "",
  width,
  height,
  loading = "lazy",
  priority = false,
}) => {
  const [imageState, setImageState] = useState<"loading" | "decoded" | "error">(
    "loading"
  );
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);
  const mountedRef = useRef(true);

  // Configuration de l'IntersectionObserver
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "400px 0px",
    threshold: 0,
    skip: priority || loading === "eager",
  });

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Réinitialiser quand src change
  useEffect(() => {
    setCurrentSrc(src || fallbackSrc);
    setImageState("loading");
  }, [src, fallbackSrc]);

  // Précharger et pré-décoder l'image
  useEffect(() => {
    const shouldLoad = priority || loading === "eager" || inView;
    if (!currentSrc || !shouldLoad) return;

    const img = new Image();
    img.src = currentSrc;

    const handleLoad = async () => {
      try {
        // Pré-décoder l'image pour éviter les saccades
        await img.decode();

        if (!mountedRef.current) return;

        // Synchroniser avec le prochain frame
        requestAnimationFrame(() => {
          if (mountedRef.current) {
            setImageState("decoded");
          }
        });
      } catch {
        // Fallback si decode() n'est pas supporté
        if (mountedRef.current) {
          setImageState("decoded");
        }
      }
    };

    const handleError = () => {
      if (!mountedRef.current) return;

      if (currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
      } else {
        setImageState("error");
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      handleLoad();
    } else {
      img.onload = handleLoad;
      img.onerror = handleError;
    }

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [currentSrc, inView, priority, loading, fallbackSrc]);

  const shouldRenderImage = priority || loading === "eager" || inView;
  const isVisible = imageState === "decoded";

  // Calculer l'aspect ratio pour éviter le layout shift
  const aspectRatio = width && height ? `${width} / ${height}` : undefined;

  return (
    <div
      ref={ref}
      className="relative overflow-hidden w-full h-full"
      style={{ aspectRatio }}
    >
      {/* Skeleton de chargement */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ease-out ${
          isVisible ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{ willChange: isVisible ? "auto" : "opacity" }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"
          style={{ backgroundSize: "200% 100%" }}
        />
      </div>

      {/* Image */}
      {shouldRenderImage && imageState !== "error" && (
        <img
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={`w-full h-full transition-opacity duration-300 ease-out ${
            isVisible ? "opacity-100" : "opacity-0"
          } ${className}`}
          style={{ willChange: isVisible ? "auto" : "opacity" }}
        />
      )}

      {/* Placeholder d'erreur */}
      {imageState === "error" && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <svg
            className="w-8 h-8 text-gray-400"
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
    </div>
  );
};

export default ImageWithFallback;
