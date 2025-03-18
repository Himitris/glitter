import React from 'react';
import { motion } from 'framer-motion';
import { eventFilters } from '../../utils/eventFilters';

interface EventFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const EventFilter: React.FC<EventFilterProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-12">
      {eventFilters.map((filter, index) => (
        <motion.button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`
            px-6 py-2 rounded-full transition-all uppercase tracking-wider text-sm
            ${activeFilter === filter.id
              ? `bg-gradient-to-r from-[#FFC74F] to-[#FF8C60] text-white shadow-md`
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
            }
          `}
        >
          {filter.label}
        </motion.button>
      ))}
    </div>
  );
};

export default EventFilter;