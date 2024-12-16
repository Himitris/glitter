import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import Card from '../ui/Card';
import { Event } from '../../types';
import { eventTypeColors } from '../../utils/eventStyles';
import { typography, effects } from '../../utils/theme';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Card hover>
      <div className="aspect-video relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className={`w-full h-full object-cover ${effects.hover.scale}`}
        />
        <div className="absolute top-4 right-4">
          <span className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${eventTypeColors[event.type]}
          `}>
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className={typography.heading.h3}>{event.title}</h3>
        
        <div className={`flex items-center ${typography.body.base} mt-2`}>
          <Calendar size={16} className="mr-2" />
          <span>{event.date}</span>
        </div>
        
        <div className={`flex items-center ${typography.body.base} mt-2`}>
          <MapPin size={16} className="mr-2" />
          <span>{event.location}</span>
        </div>
        
        <p className={`${typography.body.base} mt-4 mb-6`}>{event.description}</p>
        
        {event.ticketLink && (
          <a
            href={event.ticketLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Réserver
          </a>
        )}
      </div>
    </Card>
  );
};

export default EventCard;