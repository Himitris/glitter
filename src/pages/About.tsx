import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import TeamMember from '../components/ui/TeamMember';
import ValueCard from '../components/ui/ValueCard';
import GradientText from '../components/ui/GradientText';
import Star from '../components/ui/Star';
import { Star as StarIcon, Heart, Sparkles, Instagram } from 'lucide-react';
import { typography } from '../utils/theme';
import ParallaxBanner from '../components/ui/ParallaxBanner';

const About = () => {
  const founders = [
    {
      name: "Chloé Jolly",
      role: "Co-fondatrice",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80",
      description: "Professionnelle expérimentée et polyvalente dans l'administration et la production de spectacle vivant. Son expertise s'étend de la gestion de contrats à la direction de production d'événements.",
      socialLinks: {
        instagram: "https://instagram.com"
      },
      department: "administration" as "administration" // Pour la couleur spécifique
    },
    {
      name: "Matisse Pellegrin",
      role: "Co-fondatrice",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=80",
      description: "Professionnelle accomplie dans l'administration, la production et le management de groupes musicaux. Son expérience englobe la régie d'événements et la coordination technique.",
      socialLinks: {
        instagram: "https://instagram.com"
      },
      department: "production" as "production" // Pour la couleur spécifique
    }
  ];

  const values = [
    {
      icon: StarIcon,
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque projet, chaque détail compte.",
      color: "#8C52FF" // Violet - Production
    },
    {
      icon: Heart,
      title: "Passion",
      description: "La passion pour l'art et la musique guide chacune de nos actions.",
      color: "#FF4D8F" // Rose - Administration
    },
    {
      icon: Sparkles,
      title: "Créativité",
      description: "Nous repoussons les limites pour créer des expériences uniques et mémorables.",
      color: "#FF8C60" // Orange - Management
    }
  ];

  return (
    <div>
      <ParallaxBanner
        image="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&auto=format&fit=crop&q=80"
        height="50vh"
      >
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-transparent bg-clip-text">
              À Propos de Nous
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200"
          >
            Une structure dédiée à la production, l'administration et le management
          </motion.p>
        </div>
      </ParallaxBanner>

      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Star className="text-[#FF4D8F]" size="sm" />
            <GradientText as="h2" className={`${typography.heading.h2}`}>
              Notre Histoire
            </GradientText>
            <Star className="text-[#FF4D8F]" size="sm" />
          </div>
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
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Star className="text-[#FFC74F]" size="sm" />
            <GradientText as="h2" gradient="prestation" className={typography.heading.h2}>
              Nos Valeurs
            </GradientText>
            <Star className="text-[#FFC74F]" size="sm" />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ValueCard
                icon={value.icon}
                title={value.title}
                description={value.description}
                color={value.color}
              />
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Star className="text-[#8C52FF]" size="sm" />
            <GradientText as="h2" gradient="management" className={typography.heading.h2}>
              Nos Fondatrices
            </GradientText>
            <Star className="text-[#8C52FF]" size="sm" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {founders.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TeamMember key={index} {...member} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-300 mb-8">
            Leur complémentarité et leur vision commune de l'accompagnement artistique sont au cœur de la réussite de Glitter Productions.
          </p>
          <motion.a
            href="https://instagram.com/glitter_prod"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 text-[#FF4D8F] hover:text-[#FF8C60] transition-colors"
          >
            <Instagram size={20} />
            @glitter_prod
          </motion.a>
        </div>
      </Section>
    </div>
  );
};

export default About;