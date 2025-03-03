import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import ServiceCard from '../components/services/ServiceCard';
import { Music, FileText, Users, Calendar, DollarSign, FileCheck } from 'lucide-react';
import { colors } from '../utils/theme';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
    }
  ];

  return (
    <div>
      <PageHeader
        title="Nos Services"
        subtitle="Des services adaptés aux besoins des artistes et des événements"
        backgroundImage="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&auto=format&fit=crop&q=80"
      />

      <Section>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 text-transparent bg-clip-text animate-gradient bg-[length:200%_200%]">
            Services aux Projets Artistiques
          </h2>
          <p className="text-gray-300">
            Chez Glitter Productions, nous accompagnons les projets artistiques à chaque étape de leur parcours artistique et professionnel.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {artistServices.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </Section>

      <Section className="bg-black/50">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 text-transparent bg-clip-text">
            Services aux Organisateurs d'Événements
          </h2>
          <p className="text-gray-300">
            Glitter Productions propose des services de régie pour tous types d'événements artistiques.
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-1 max-w-2xl mx-auto">
          {eventServices.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Services;