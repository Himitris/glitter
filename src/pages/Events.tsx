import { useState } from 'react';
import { motion } from 'framer-motion';
import Section from '../components/ui/Section';
import EventCard from '../components/events/EventCard';
import EventFilter from '../components/events/EventFilter';
import GradientText from '../components/ui/GradientText';
import Star from '../components/ui/Star';
import { Calendar } from 'lucide-react';
import { events } from '../data/events';
import { filterEvents, EventFilterType } from '../utils/eventFilters';
import { typography } from '../utils/theme';
import ParallaxBanner from '../components/ui/ParallaxBanner';
import AnimatedGradientText from '../components/ui/AnimatedGradientText';

const Events = () => {
  const [activeFilter, setActiveFilter] = useState<EventFilterType>('all');
  const filteredEvents = filterEvents(events, activeFilter);

  return (
    <div>
      <ParallaxBanner
        image="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1600&auto=format&fit=crop&q=80"
        height="45vh"
        className="mt-0"
      >
        <div className="text-center">
          <AnimatedGradientText
            as="h2"
            gradient="primary"
            className="text-4xl md:text-6xl font-bold mb-4"
            speed="medium"
          >
            Nos Services
          </AnimatedGradientText>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200"
          >
            Découvrez nos prochains événements
          </motion.p>
        </div>
      </ParallaxBanner>

      <Section>
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Star className="text-[#FFC74F]" size="sm" />
            <Calendar className="w-10 h-10 text-[#FFC74F]" />
            <Star className="text-[#FFC74F]" size="sm" />
          </div>
          <GradientText as="h2" gradient="prestation" className={typography.heading.h2 + " mb-8"}>
            Programmation
          </GradientText>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10">
            Découvrez notre sélection d'événements uniques, où chaque moment est conçu pour
            briller et vous offrir une expérience inoubliable.
          </p>
        </div>

        <EventFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-4">Aucun événement trouvé pour cette catégorie.</p>
              <Star className="text-[#FF4D8F] mx-auto" size="md" />
            </motion.div>
          </div>
        )}
      </Section>

      {/* Section pour événements passés ou à venir */}
      <Section className="bg-black/50">
        <div className="text-center mb-12">
          <GradientText as="h2" gradient="primary" className={typography.heading.h2 + " mb-6"}>
            Vous souhaitez organiser un événement ?
          </GradientText>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Glitter Productions met son expertise à votre service pour créer des moments uniques
            et mémorables. Contactez-nous pour discuter de votre projet.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-block bg-gradient-to-r from-[#8C52FF] via-[#FF4D8F] to-[#FF8C60] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity uppercase tracking-wider text-sm"
          >
            Contactez-nous
          </motion.a>
        </div>
      </Section>
    </div>
  );
};

export default Events;