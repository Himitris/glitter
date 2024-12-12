import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import ArtistCard from '../components/artists/ArtistCard';
import { artists } from '../data/artists';
import { Music } from 'lucide-react';

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
          <div className="flex justify-center mb-6">
            <Music className="w-12 h-12 text-pink-500" />
          </div>
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
            Une Communauté d'Artistes Passionnés
          </h2>
          <p className="text-gray-300">
            Nous accompagnons des artistes talentueux dans leur développement artistique,
            en leur offrant un environnement propice à la création et à l'expression de leur art.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </Section>

      <Section className="bg-black/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
            Rejoignez Notre Collectif
          </h2>
          <p className="text-gray-300 mb-8">
            Vous êtes un artiste et souhaitez collaborer avec nous ?
            Nous sommes toujours à la recherche de nouveaux talents pour enrichir notre communauté.
          </p>
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Contactez-nous
          </a>
        </div>
      </Section>
    </div>
  );
};

export default Artists;