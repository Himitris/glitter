import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Section from '../components/ui/Section';
import ServiceCard from '../components/services/ServiceCard';
import GradientText from '../components/ui/GradientText';
import Star from '../components/ui/Star';
import { typography } from '../utils/theme';
import ParallaxBanner from '../components/ui/ParallaxBanner';
import AnimatedGradientText from '../components/ui/AnimatedGradientText';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,  // Réduire à 5% au lieu de 10%
    rootMargin: '0px 0px -10% 0px'  // Déclencher l'animation avant même que l'élément entre dans la vue
  });

  const eventServices = [
    {
      title: "Régie Événementielle",
      icon: "Calendar",
      description: "Services de régie pour tous types d'événements artistiques.",
      features: [
        "Régie site et logistique",
        "Régie artistes",
        "Régie cashless",
        "Régie bénévoles",
        "Direction de production",
        "Gestion des paies"
      ],
      color: "prestation"
    }
  ];

  return (
    <div>
      <ParallaxBanner
        image="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&auto=format&fit=crop&q=80"
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
            Des services adaptés aux besoins des artistes et des événements
          </motion.p>
        </div>
      </ParallaxBanner>

      <Section className="bg-gray-50">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Star className="text-[#FFC74F]" size="sm" />
            <GradientText as="h2" gradient="prestation" className={typography.heading.h2}>
              Services aux Organisateurs d'Événements
            </GradientText>
            <Star className="text-[#FFC74F]" size="sm" />
          </div>
          <p className="text-gray-600">
            Glitter Productions propose des services de régie pour tous types d'événements artistiques.
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-1 max-w-2xl mx-auto">
          {eventServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              ref={ref}
            >
              <ServiceCard
                key={index}
                {...service}
                color={service.color as "production" | "administration" | "management" | "prestation"}
              />
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Services;