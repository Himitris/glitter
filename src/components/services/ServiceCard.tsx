import React, { memo } from 'react';
import { Music, Film, Calendar, FileText, Users } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  icon: string;
  description: string;
  features: string[];
  color: "production" | "administration" | "management" | "prestation";
}

const ServiceCard: React.FC<ServiceCardProps> = memo(({ title, icon, description, features, color }) => {
  const IconComponent = {
    Music,
    Film,
    Calendar,
    FileText,
    Users
  }[icon] || Music;

  // Couleur d'accent simple pour l'icône
  const accentColors = {
    "production": "#775CFF",
    "administration": "#EBABFF",
    "management": "#FF7A42",
    "prestation": "#D4A500"
  };

  return (
    <div className="w-full h-full">
      {/* Carte compacte et centrée */}
      <div className="border-2 border-[#0B0B0B] rounded-2xl bg-[#FFFFF6] hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ease-out h-full">
        <div className="p-5 sm:p-6 h-full flex flex-col items-center text-center">

          {/* Icon centré avec fond léger */}
          <div
            className="w-12 h-12 mb-4 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${accentColors[color]}15` }}
          >
            <IconComponent
              className="w-6 h-6"
              style={{ color: accentColors[color] }}
              strokeWidth={2}
            />
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
