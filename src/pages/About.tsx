import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import TeamMember from '../components/ui/TeamMember';
import ValueCard from '../components/ui/ValueCard';
import { Star, Heart, Sparkles } from 'lucide-react';
import GradientText from '../components/ui/GradientText';

const About = () => {
  const founders = [
    {
      name: "Chloé Jolly",
      role: "Co-fondatrice",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80",
      description: "Professionnelle expérimentée et polyvalente dans l'administration et la production de spectacle vivant. Son expertise s'étend de la gestion de contrats à la direction de production d'événements.",
      socialLinks: {
        instagram: "https://instagram.com"
      }
    },
    {
      name: "Matisse Pellegrin",
      role: "Co-fondatrice",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=80",
      description: "Professionnelle accomplie dans l'administration, la production et le management de groupes musicaux. Son expérience englobe la régie d'événements et la coordination technique.",
      socialLinks: {
        instagram: "https://instagram.com"
      }
    }
  ];

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
      title: "Créativité",
      description: "Nous repoussons les limites pour créer des expériences uniques et mémorables."
    }
  ];

  return (
    <div>
      <PageHeader
        title="À Propos de Nous"
        subtitle="Une structure dédiée à la production, l'administration et le management"
        backgroundImage="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&auto=format&fit=crop&q=80"
      />

      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <GradientText as="h2" className="text-3xl font-bold mb-6">
            Notre Histoire
          </GradientText>
          <p className="text-gray-300 mb-8">
            Créée en 2024 par Chloé Jolly et Matisse Pellegrin, Glitter Productions est une structure dédiée à la production, 
            l'administration et le management dans le domaine de la musique et du spectacle vivant, située entre les Landes et le Tarn.
          </p>
          <p className="text-gray-300">
            Forte de la passion et de l'expertise de ses fondatrices, Glitter Productions propose des services adaptés aux besoins 
            des artistes et des événements artistiques en se positionnant comme un véritable partenaire.
          </p>
        </div>
      </Section>

      <Section className="bg-black/50">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#8C52FF] via-[#FF4D8F] to-[#FF8C60] text-transparent bg-clip-text">
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
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#8C52FF] via-[#FF4D8F] to-[#FF8C60] text-transparent bg-clip-text">
          Nos Fondatrices
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {founders.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-gray-300 mb-8">
            Leur complémentarité et leur vision commune de l'accompagnement artistique sont au cœur de la réussite de Glitter Productions.
          </p>
          <a href="https://instagram.com/glitter_prod" target="_blank" rel="noopener noreferrer" className="text-[#FF4D8F] hover:text-[#FF8C60] transition-colors">
            Instagram: @glitter_prod
          </a>
        </div>
      </Section>
    </div>
  );
};

export default About;