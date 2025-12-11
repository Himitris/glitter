import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Section,
  ColorfulBackground,
  HighlightBadge,
  SkeletonCard,
} from "../components/ui";
import ArtistCard from "../components/artists/ArtistCard";
import { artistServices } from "../data/artists";
import { typography } from "../utils/theme";
import ServiceCard from "../components/services/ServiceCard";
import Seo from "../components/seo/Seo";
import { seoConfig } from "../config/seo";
import SchemaOrg from "../components/seo/SchemaOrg";
import { getAllArtists } from "../services/artistService";
import { Artist } from "../types";

const Artists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getAllArtists();
        setArtists(data);
      } catch (error) {
        console.error("Erreur lors du chargement des artistes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const { title, description, keywords, image, canonical } = seoConfig.artists;

  return (
    <>
      <Seo
        title={title}
        description={description}
        keywords={keywords}
        image={image}
        canonical={canonical}
      />
      <SchemaOrg
        type="Organization"
        name="Glitter Production - Artistes"
        description="Découvrez les artistes qui font confiance à Glitter Production pour leur production musicale et leur management."
        url="https://glitterprod.com/artists"
        image="/images/artists/kimia.png"
      />
      <div>
        <ColorfulBackground variant="full-spectrum" intensity="strong" className="min-h-[45vh] flex items-center justify-center pt-32 pb-16">
          <div className="text-center container mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-[#0B0B0B]">
              Nos Artistes
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-[#0B0B0B]/80 flex flex-wrap items-center justify-center gap-2"
            >
              <span>Découvrez les</span>
              <HighlightBadge color="yellow" rotation={-2}>
                TALENTS
              </HighlightBadge>
              <span>qui nous font confiance</span>
            </motion.div>
          </div>
        </ColorfulBackground>
        <Section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 items-stretch">
            {artistServices.map((service, index) => (
              <div
                key={index}
                className="flex h-full animate-fade-in"
                style={{ animationDelay: prefersReducedMotion ? '0ms' : `${index * 50}ms` }}
              >
                <ServiceCard
                  {...service}
                  color={
                    service.color as
                      | "production"
                      | "administration"
                      | "management"
                      | "prestation"
                  }
                />
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
            {loading ? (
              // Skeleton cards pendant le chargement
              Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} variant="artist" />
              ))
            ) : (
              artists.map((artist, index) => (
                <div
                  key={artist.id}
                  className="h-full animate-fade-in"
                  style={{ animationDelay: prefersReducedMotion ? '0ms' : `${Math.min(index, 5) * 50}ms` }}
                >
                  <ArtistCard artist={artist} />
                </div>
              ))
            )}
          </div>
        </Section>

        <Section className="bg-[#FFFFF6]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className={`${typography.heading.h2} text-[#0B0B0B] mb-6`}>
              REJOIGNEZ-NOUS!
            </h2>
            <div className="text-[#0B0B0B]/70 mb-8 flex flex-wrap items-center justify-center gap-2">
              <span>Vous êtes un artiste et souhaitez collaborer avec nous ? Nous sommes toujours à la recherche de</span>
              <HighlightBadge color="yellow" rotation={1} className="text-sm md:text-base">
                NOUVEAUX TALENTS
              </HighlightBadge>
              <span>pour enrichir notre communauté.</span>
            </div>
            <a
              href="/contact"
              className="inline-block bg-[#0B0B0B] text-white px-8 py-3 rounded-full hover:bg-[#0B0B0B]/80 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Contactez-nous
            </a>
          </div>
        </Section>
      </div>
    </>
  );
};

export default Artists;
