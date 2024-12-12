import React from 'react';

interface EventFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const EventFilter: React.FC<EventFilterProps> = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'Tous' },
    { id: 'concert', label: 'Concerts' },
    { id: 'show', label: 'Spectacles' },
    { id: 'private', label: 'Événements Privés' },
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-12">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`
            px-6 py-2 rounded-full transition-all
            ${activeFilter === filter.id
              ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }
          `}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default EventFilter;