import React, { memo, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

interface ServiceCardProps {
  title: string;
  sticker?: string;
  description: string;
  features: string[];
  color: "production" | "administration" | "management" | "prestation";
}

// Mapping des couleurs vers les stickers par défaut
const defaultStickers: Record<string, string> = {
  "administration": "/images/Stickers/Administration.webp",
  "production": "/images/Stickers/Production.webp",
  "management": "/images/Stickers/Management.webp",
  "prestation": "/images/Stickers/Dir-Prod.webp",
};

const ServiceCard: React.FC<ServiceCardProps> = memo(({ title, sticker, description, features, color }) => {
  // Utiliser le sticker fourni ou celui par défaut selon la couleur
  const stickerSrc = sticker || defaultStickers[color];
  const [imageLoaded, setImageLoaded] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <div className="w-full h-full" ref={ref}>
      {/* Carte compacte et centrée */}
      <div className="border-2 border-[#0B0B0B] rounded-2xl bg-[#FFFFF6] hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ease-out h-full">
        <div className="p-5 sm:p-6 h-full flex flex-col items-center text-center">

          {/* Sticker centré avec lazy loading */}
          <div className="w-14 h-14 mb-4 flex items-center justify-center relative">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-100 rounded-lg animate-pulse" />
            )}
            {inView && (
              <img
                src={stickerSrc}
                alt={title}
                loading="lazy"
                decoding="async"
                onLoad={handleImageLoad}
                className={`w-full h-full object-contain transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
          </div>

          {/* Title centré */}
          <h3 className="text-lg sm:text-xl font-bold mb-4 text-[#0B0B0B]">
            {title}
          </h3>

          {/* Liste des features - centrée et compacte */}
          <ul className="space-y-2 text-left w-full">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start text-[#0B0B0B]/70 text-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 mr-2.5 flex-shrink-0 bg-[#0B0B0B]/40" />
                <span className="leading-snug">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
