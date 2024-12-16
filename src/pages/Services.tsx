import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import ServiceCard from '../components/services/ServiceCard';
import ProductionStep from '../components/ui/ProductionStep';
import { services } from '../data/services';
import { Star, Music, Video, Users } from 'lucide-react';
import { colors } from '../utils/theme';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const productionSteps = [
    {
      title: "Pré-production",
      description: "Planification détaillée, budgétisation et coordination avec les artistes et prestataires.",
      icon: <Music className="w-8 h-8 text-pink-500" />
    },
    {
      title: "Production",
      description: "Gestion technique, coordination des équipes et supervision artistique le jour J.",
      icon: <Video className="w-8 h-8 text-purple-500" />
    },
    {
      title: "Post-production",
      description: "Montage vidéo, retours d'expérience et optimisation pour les futurs événements.",
      icon: <Users className="w-8 h-8 text-orange-500" />
    }
  ];

  return (
    <div>
      <PageHeader
        title="Nos Services"
        subtitle="Une expertise complète pour vos projets"
        backgroundImage="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&auto=format&fit=crop&q=80"
      />

      <Section>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient.primary} blur-xl opacity-50`} />
              <Star className="relative w-12 h-12 text-pink-500" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 text-transparent bg-clip-text animate-gradient bg-[length:200%_200%]">
            Une Production Sur Mesure
          </h2>
          <p className="text-gray-300">
            De la conception à la réalisation, nous vous accompagnons dans toutes les étapes
            de votre projet pour créer des moments inoubliables.
          </p>
        </div>

        {/* Production Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {productionSteps.map((step, index) => (
            <ProductionStep
              key={index}
              {...step}
              index={index + 1}
            />
          ))}
        </div>

        {/* Services Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </Section>

      {/* Rest of the component remains the same */}
    </div>
  );
};

export default Services;