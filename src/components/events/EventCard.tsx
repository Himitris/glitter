import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import GradientText from '../ui/GradientText';
import Star from '../ui/Star';
import { Event } from '../../types';
import { eventTypeColors } from '../../utils/eventStyles';
import { typography } from '../../utils/theme';
import LazyImage from '../ui/LazyImage';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  // Map pour les couleurs de gradient selon le type d'événement
  const gradientMap: { [key: string]: 'production' | 'administration' | 'prestation' | 'primary' } = {
    'concert': 'production',
    'show': 'administration',
    'private': 'prestation'
  };

  // Déterminer le gradient à utiliser
  const gradientType = gradientMap[event.type] || 'primary';

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden group hover:shadow-lg hover:shadow-[#8C52FF]/10 transition-all h-full flex flex-col">
      <div className="aspect-video relative overflow-hidden">
        <LazyImage
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <span className={`
            px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wider
            ${eventTypeColors[event.type]}
          `}>
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </span>
        </div>
        {/* Ajouter une petite étoile stylisée */}
        <div className="absolute bottom-4 left-4">
          <Star className="text-white/70" size="sm" />
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <GradientText as="h3" gradient={gradientType} className={`${typography.heading.h3} mb-4`}>
          {event.title}
        </GradientText>

        <div className={`flex items-center ${typography.body.base} mb-2`}>
          <Calendar size={16} className="mr-2 text-[#FF4D8F]" />
          <span>{event.date}</span>
        </div>

        <div className={`flex items-center ${typography.body.base} mb-4`}>
          <MapPin size={16} className="mr-2 text-[#FF4D8F]" />
          <span>{event.location}</span>
        </div>

        <p className={`${typography.body.base} mb-6 flex-grow`}>{event.description}</p>

        <div className="mt-auto">
          {event.ticketLink ? (
            <a
              href={event.ticketLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-[#8C52FF] via-[#FF4D8F] to-[#FF8C60] text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity uppercase tracking-wider text-xs"
            >
              Réserver
            </a>
          ) : (
            <div className="h-8"></div> // Espace réservé pour conserver la même hauteur
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;