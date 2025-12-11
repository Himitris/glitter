import React, { useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = "",
  width,
  height,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton de chargement */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse" />
      )}

      {/* Image avec lazy loading natif */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        className={`transition-opacity duration-300 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        } ${className}`}
      />
    </div>
  );
};

export default LazyImage;
