import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Event } from '../../types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden group">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <span className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${event.type === 'concert' ? 'bg-pink-500/80' : ''}
            ${event.type === 'show' ? 'bg-purple-500/80' : ''}
            ${event.type === 'private' ? 'bg-orange-500/80' : ''}
          `}>
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{event.title}</h3>
        
        <div className="flex items-center text-gray-400 mb-2">
          <Calendar size={16} className="mr-2" />
          <span>{event.date}</span>
        </div>
        
        <div className="flex items-center text-gray-400 mb-4">
          <MapPin size={16} className="mr-2" />
          <span>{event.location}</span>
        </div>
        
        <p className="text-gray-400 mb-6">{event.description}</p>
        
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
    </div>
  );
}

export default EventCard;