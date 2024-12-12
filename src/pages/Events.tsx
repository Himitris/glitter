import React, { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import EventCard from '../components/events/EventCard';
import EventFilter from '../components/events/EventFilter';
import { events } from '../data/events';
import { Event } from '../types';

const Events = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredEvents = events.filter((event: Event) => 
    activeFilter === 'all' ? true : event.type === activeFilter
  );

  return (
    <div>
      <PageHeader
        title="Nos Événements"
        subtitle="Découvrez nos prochains événements"
        backgroundImage="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1600&auto=format&fit=crop&q=80"
      />

      <Section>
        <EventFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            Aucun événement trouvé pour cette catégorie.
          </div>
        )}
      </Section>
    </div>
  );
};

export default Events;