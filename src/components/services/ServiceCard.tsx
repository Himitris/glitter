import React, { memo } from 'react';
import { Music, Film, Calendar, FileText, Users } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <motion.div
      className="w-full h-full"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Carte simple avec contour noir */}
      <div className="border-2 border-[#0B0B0B] rounded-3xl h-[480px] bg-[#FFFFF6] hover:shadow-xl transition-all duration-300">
        <div className="p-6 sm:p-8 h-full flex flex-col">

          {/* Icon avec fond léger */}
          <div
            className="w-14 h-14 mb-6 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${accentColors[color]}15` }}
          >
            <IconComponent
              className="w-7 h-7"
              style={{ color: accentColors[color] }}
              strokeWidth={2}
            />
          </div>

          {/* Title sobre */}
          <h3 className="text-xl sm:text-2xl font-bold mb-4 text-[#0B0B0B]">
            {title}
          </h3>

          {/* Description */}
          <p className="text-[#0B0B0B]/60 mb-6 text-sm sm:text-base leading-relaxed">
            {description}
          </p>

          {/* Liste des features */}
          <ul className="space-y-3 mt-auto">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start text-[#0B0B0B]/70 text-sm sm:text-base"
              >
                {/* Bullet point noir simple */}
                <div className="w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0 bg-[#0B0B0B]" />
                <span className="leading-relaxed">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
