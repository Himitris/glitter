import React, { useState, useEffect, useRef } from "react";
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
 * Composant d'image optimisé avec :
 * - Lazy loading via IntersectionObserver
 * - Pré-décodage avec img.decode() pour éviter les saccades
 * - Skeleton animé pendant le chargement
 * - Transition fluide synchronisée avec requestAnimationFrame
 * - Fallback en cas d'erreur
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
  const [imageState, setImageState] = useState<"loading" | "decoded" | "error">(
    "loading"
  );
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);
  const [hasBeenVisible, setHasBeenVisible] = useState(priority); // Track si l'image a déjà été visible
  const mountedRef = useRef(true);

  // Configuration de l'IntersectionObserver
  const { ref: containerRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "400px 0px",
    threshold: 0,
    skip: priority,
  });

  // Une fois visible, toujours rester visible (ne jamais cacher l'image)
  useEffect(() => {
    if (inView && !hasBeenVisible) {
      setHasBeenVisible(true);
    }
  }, [inView, hasBeenVisible]);

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

  // Précharger ET pré-décoder l'image avant de l'afficher
  useEffect(() => {
    if (!currentSrc || !hasBeenVisible) return;

    const img = new Image();
    img.src = currentSrc;

    const handleLoad = async () => {
      try {
        // Pré-décoder l'image pour éviter les saccades
        // decode() garantit que l'image est prête à être affichée sans jank
        await img.decode();

        if (!mountedRef.current) return;

        // Synchroniser avec le prochain frame pour une transition fluide
        requestAnimationFrame(() => {
          if (mountedRef.current) {
            setImageState("decoded");
            onLoad?.();
          }
        });
      } catch {
        // decode() peut échouer sur certains navigateurs anciens
        // Dans ce cas, on affiche quand même l'image
        if (mountedRef.current) {
          setImageState("decoded");
          onLoad?.();
        }
      }
    };

    const handleError = () => {
      if (!mountedRef.current) return;

      if (currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
      } else {
        setImageState("error");
        onError?.();
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      // Image déjà en cache
      handleLoad();
    } else {
      img.onload = handleLoad;
      img.onerror = handleError;
    }

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [currentSrc, hasBeenVisible, fallbackSrc, onLoad, onError]);

  // Calculer le style du conteneur
  const containerStyle: React.CSSProperties = {
    backgroundColor: imageState !== "decoded" ? placeholderColor : undefined,
    ...(aspectRatio ? { aspectRatio } : {}),
    ...(width && height && !aspectRatio
      ? { aspectRatio: `${width} / ${height}` }
      : {}),
  };

  const shouldRenderImage = hasBeenVisible && imageState !== "error";
  const isVisible = imageState === "decoded";

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${containerClassName}`}
      style={containerStyle}
    >
      {/* Skeleton de chargement avec animation shimmer */}
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
      {shouldRenderImage && (
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
          style={{
            objectFit,
            willChange: isVisible ? "auto" : "opacity",
          }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
