import { useState } from 'react';
import { motion } from 'framer-motion';
import Section from '../components/ui/Section';
import ArtistCard from '../components/artists/ArtistCard';
import GradientText from '../components/ui/GradientText';
import Star from '../components/ui/Star';
import { Disc, Music, MusicIcon } from 'lucide-react';
import { dj } from '../data/artists';
import { typography } from '../utils/theme';
import ParallaxBanner from '../components/ui/ParallaxBanner';
import AnimatedGradientText from '../components/ui/AnimatedGradientText';

const DJs = () => {

  // Préparer une version future avec possibilité de filtrer par genre musical
  const djCategories = [
    { id: 'all', label: 'Tous' },
    { id: 'electro', label: 'Électro' },
    { id: 'house', label: 'House' },
    { id: 'techno', label: 'Techno' }
  ];

  // Dans le futur, implémenter la fonctionnalité de filtrage réelle
  const filteredDJs = dj;

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
            DJ & Producteurs
          </AnimatedGradientText>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200"
          >
            Vibrez au rythme de nos talents
          </motion.p>
        </div>
      </ParallaxBanner>

      <Section>
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Star className="text-[#8C52FF]" size="sm" />
            <Disc className="w-10 h-10 text-[#8C52FF]" />
            <Star className="text-[#8C52FF]" size="sm" />
          </div>
          <GradientText as="h2" gradient="production" className={typography.heading.h2 + " mb-8"}>
            Nos DJ 
          </GradientText>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Découvrez les DJ et producteurs qui font vibrer vos événements avec leurs sets uniques et leur énergie contagieuse.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDJs.map((dj, index) => (
            <motion.div
              key={dj.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ArtistCard artist={dj} />
            </motion.div>
          ))}
        </div>

        {filteredDJs.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            <p className="mb-4">Aucun DJ trouvé dans cette catégorie.</p>
            <Star className="text-[#8C52FF] mx-auto" size="md" />
          </div>
        )}
      </Section>

      <Section className="bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <GradientText as="h2" gradient="production" className={typography.heading.h2 + " mb-6"}>
            Vous cherchez un DJ pour votre événement ?
          </GradientText>
          <p className="text-gray-600 mb-8">
            Glitter Productions vous propose des DJ talentueux pour tous types d'événements :
            soirées privées, mariages, festivals, événements d'entreprise...
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <Music className="w-10 h-10 text-[#8C52FF] mb-4 mx-auto" />
              <h3 className="text-lg font-bold mb-2">Style varié</h3>
              <p className="text-gray-600 text-sm">Tous genres musicaux selon vos préférences</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <Disc className="w-10 h-10 text-[#8C52FF] mb-4 mx-auto" />
              <h3 className="text-lg font-bold mb-2">Équipement pro</h3>
              <p className="text-gray-600 text-sm">Matériel de sonorisation haut de gamme</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <MusicIcon className="w-10 h-10 text-[#8C52FF] mb-4 mx-auto" />
              <h3 className="text-lg font-bold mb-2">Expérience</h3>
              <p className="text-gray-600 text-sm">DJ confirmés avec des références solides</p>
            </div>
          </div>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-block bg-gradient-to-r from-[#8C52FF] to-[#FF4D8F] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity uppercase tracking-wider text-sm"
          >
            Réserver un DJ
          </motion.a>
        </div>
      </Section>
    </div>
  );
};

export default DJs;