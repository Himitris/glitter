import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import GradientText from "../ui/GradientText";
import Star from "../ui/Star";
import AnimatedGradientText from "../ui/AnimatedGradientText";
import { typography } from "../../utils/theme";

// Type pour l'événement
interface EventData {
  title: string;
  date: string;
  location: string;
  image: string;
}

interface UpcomingEventProps {
  event?: EventData;
}

const UpcomingEvent: React.FC<UpcomingEventProps> = ({
  event = {
    title: "Summer Vibes Festival",
    date: "15 Juillet 2024",
    location: "Parc des Expositions, Paris",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1600&auto=format&fit=crop&q=80",
  },
}) => {
  const [ref, inView] = React.useState<{
    current: HTMLDivElement | null;
    inView: boolean;
  }>({ current: null, inView: true });

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2">
            <Star className="text-[#FFC74F]" size="sm" />
            <AnimatedGradientText
              as="h2"
              gradient="prestation"
              className={typography.heading.h2 + " inline-block"}
              speed="fast"
            >
              Prochain Événement
            </AnimatedGradientText>
            <Star className="text-[#FFC74F]" size="sm" />
          </div>
        </div>

        <motion.div
          ref={(el) => {
            ref.current = el;
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md group hover:border-[#FFC74F]/30 transition-all"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-64 md:h-full overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay dégradé */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {/* Étoile décorative */}
              <Star className="absolute top-4 right-4 text-white" size="sm" />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <GradientText
                as="h4"
                gradient="prestation"
                className="text-3xl font-bold mb-4"
              >
                {event.title}
              </GradientText>
              <p className="text-gray-600 mb-2 flex items-center">
                <Calendar size={16} className="mr-2 text-[#FFC74F]" />
                {event.date}
              </p>
              <p className="text-gray-600 mb-6 flex items-center">
                <span className="mr-2">📍</span> {event.location}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-r from-[#FFC74F] to-[#FF8C60] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity self-start uppercase tracking-wider text-sm"
              >
                Réserver
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UpcomingEvent;
