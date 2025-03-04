import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import ArtistCard from '../components/artists/ArtistCard';
import { artists } from '../data/artists';
import { Music } from 'lucide-react';
import GradientText from '../components/ui/GradientText';
import Star from '../components/ui/Star';
import { typography } from '../utils/theme';

const Artists = () => {
  return (
    <div>
      <PageHeader
        title="Nos Artistes"
        subtitle="Découvrez les talents qui nous font confiance"
        backgroundImage="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=80"
      />

      <Section>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Star className="text-[#FF4D8F]" size="sm" />
            <Music className="w-12 h-12 text-[#FF8C60]" />
            <Star className="text-[#FF4D8F]" size="sm" />
          </div>
          <GradientText as="h2" gradient="primary" className={typography.heading.h2 + " mb-6"}>
            Une Communauté d'Artistes Passionnés
          </GradientText>
          <p className="text-gray-300">
            Nous accompagnons des artistes talentueux dans leur développement artistique,
            en leur offrant un environnement propice à la création et à l'expression de leur art.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-25%" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ArtistCard artist={artist} />
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-black/50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Star className="text-[#8C52FF]" size="sm" />
            <GradientText as="h2" gradient="administration" className={typography.heading.h2 + " mb-6"}>
              Rejoignez Notre Collectif
            </GradientText>
            <Star className="text-[#8C52FF]" size="sm" />
          </div>
          <p className="text-gray-300 mb-8">
            Vous êtes un artiste et souhaitez collaborer avec nous ?
            Nous sommes toujours à la recherche de nouveaux talents pour enrichir notre communauté.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-block bg-gradient-to-r from-[#8C52FF] via-[#FF4D8F] to-[#FF8C60] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Contactez-nous
          </motion.a>
        </div>
      </Section>
    </div>
  );
};

export default Artists;