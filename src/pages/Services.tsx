import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Section from '../components/ui/Section';
import ServiceCard from '../components/services/ServiceCard';
import GradientText from '../components/ui/GradientText';
import Star from '../components/ui/Star';
import { typography } from '../utils/theme';
import ParallaxBanner from '../components/ui/ParallaxBanner';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,  // Réduire à 5% au lieu de 10%
    rootMargin: '0px 0px -10% 0px'  // Déclencher l'animation avant même que l'élément entre dans la vue
  });

  const [artistsRef, artistsInView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: '0px 0px -20% 0px'  // Ceci déclenchera l'animation encore plus tôt
  });

  const artistServices = [
    {
      title: "Administration et Gestion",
      icon: "FileText",
      description: "Nous prenons en charge les aspects administratifs et financiers, permettant aux artistes de se concentrer pleinement sur leur créativité.",
      features: [
        "Édition des contrats de cession et des factures",
        "Gestion de la paie des artistes et techniciens",
        "Accompagnement à l'intermittence",
        "Gestion des droits d'auteur"
      ],
      color: "administration"
    },
    {
      title: "Production Musicale",
      icon: "Music",
      description: "De la pré-production à la post-production, nous travaillons en étroite collaboration avec les artistes pour les aider dans l'élaboration des enregistrements.",
      features: [
        "Accompagnement artistique",
        "Coordination technique",
        "Production d'albums",
        "Stratégie de sortie"
      ],
      color: "production"
    },
    {
      title: "Production de Tournée",
      icon: "Calendar",
      description: "Organisation complète de vos tournées pour vous permettre de vous concentrer sur votre art.",
      features: [
        "Élaboration des budgets de tournée",
        "Gestion de la logistique (transport, hébergement)",
        "Organisation des résidences",
        "Recherche de financements"
      ],
      color: "production"
    },
    {
      title: "Management Artistique",
      icon: "Users",
      description: "Nous développons des stratégies sur mesure pour maximiser votre visibilité et votre évolution artistique.",
      features: [
        "Gestion de l'image",
        "Relations publiques",
        "Coordination des tournées",
        "Développement stratégique"
      ],
      color: "management"
    }
  ];

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
      {/* Remplacer le PageHeader par */}
      <ParallaxBanner
        image="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&auto=format&fit=crop&q=80"
        height="45vh"
        className="mt-0"
      >
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-transparent bg-clip-text">
              Nos Services
            </span>
          </motion.h1>

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

      <Section>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Star className="text-[#8C52FF]" size="sm" />
            <GradientText as="h2" gradient="primary" className={typography.heading.h2}>
              Services aux Projets Artistiques
            </GradientText>
            <Star className="text-[#FF4D8F]" size="sm" />
          </div>
          <p className="text-gray-300">
            Chez Glitter Productions, nous accompagnons les projets artistiques à chaque étape de leur parcours artistique et professionnel.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20" ref={artistsRef}>
          {artistServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={artistsInView ? { opacity: 1, y: 0 } : {}}  // Utilisez artistsInView au lieu de inView
              transition={{ duration: 0.5, delay: index * 0.1 }}
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

      <Section className="bg-black/50">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Star className="text-[#FFC74F]" size="sm" />
            <GradientText as="h2" gradient="prestation" className={typography.heading.h2}>
              Services aux Organisateurs d'Événements
            </GradientText>
            <Star className="text-[#FFC74F]" size="sm" />
          </div>
          <p className="text-gray-300">
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