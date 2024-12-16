import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import TeamMember from '../components/ui/TeamMember';
import ValueCard from '../components/ui/ValueCard';
import { teamMembers } from '../data/team';
import { Star, Heart, Sparkles } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Star,
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque projet, chaque détail compte."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "La passion pour l'art et la musique guide chacune de nos actions."
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Nous repoussons les limites pour créer des expériences uniques."
    }
  ];

  return (
    <div>
      <PageHeader
        title="À Propos de Nous"
        subtitle="Une équipe passionnée au service de vos événements"
        backgroundImage="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&auto=format&fit=crop&q=80"
      />

      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 text-transparent bg-clip-text">
            Notre Histoire
          </h2>
          <p className="text-gray-300 mb-8">
            Fondée en 2020, Glitter Production est née de la passion pour la création d'événements uniques et mémorables. 
            Notre mission est de faire briller chaque moment en créant des expériences qui marquent les esprits et touchent les cœurs.
          </p>
          <p className="text-gray-300">
            Aujourd'hui, nous sommes fiers de collaborer avec des artistes talentueux et des partenaires de confiance 
            pour donner vie à vos projets les plus ambitieux.
          </p>
        </div>
      </Section>

      <Section className="bg-black/50">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 text-transparent bg-clip-text">
          Nos Valeurs
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <ValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 text-transparent bg-clip-text">
          Notre Équipe
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default About;