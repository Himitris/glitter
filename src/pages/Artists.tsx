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
import { getAllArtists, FirebaseServiceError } from "../services/artistService";
import { Artist } from "../types";
import { useToast } from "../contexts/ToastContext";

const Artists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getAllArtists();
        setArtists(data);
      } catch (error) {
        console.error("Erreur lors du chargement des artistes:", error);
        if (error instanceof FirebaseServiceError) {
          showToast(error.message, "error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [showToast]);

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
        {/* Hero Section */}
        <ColorfulBackground variant="full-spectrum" intensity="strong" className="min-h-[45vh] flex items-center justify-center pt-32 pb-16">
          <div className="text-center container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#0B0B0B]">
              Nos Artistes
            </h1>
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

        {/* Section Services */}
        <section className="relative py-20 bg-[#FFFFF6]">
          <div className="container mx-auto px-4">
            {/* Titre de section */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block bg-[#EBABFF]/20 text-[#0B0B0B] px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Ce que nous proposons
                </span>
                <h2 className={`${typography.heading.h2} text-[#0B0B0B] mb-4`}>
                  Nos Services pour Artistes
                </h2>
                <p className="text-[#0B0B0B]/60 max-w-2xl mx-auto">
                  Un accompagnement complet pour développer votre carrière artistique
                </p>
              </motion.div>
            </div>

            {/* Grille de services */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
              {artistServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : index * 0.1 }}
                  className="flex h-full"
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Artistes */}
        <section className="relative py-20 bg-[#FFFFF6]">
          <div className="container mx-auto px-4">
            {/* Titre de section */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block bg-[#775CFF]/20 text-[#0B0B0B] px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Notre famille artistique
                </span>
                <h2 className={`${typography.heading.h2} text-[#0B0B0B] mb-4`}>
                  Les Artistes Glitter
                </h2>
                <p className="text-[#0B0B0B]/60 max-w-2xl mx-auto">
                  Des talents uniques que nous accompagnons avec passion
                </p>
              </motion.div>
            </div>

            {/* Grille d'artistes */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard key={index} variant="artist" />
                ))
              ) : (
                artists.map((artist, index) => (
                  <motion.div
                    key={artist.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : Math.min(index, 5) * 0.1 }}
                    className="h-full"
                  >
                    <ArtistCard artist={artist} />
                  </motion.div>
                ))
              )}
            </div>

            {artists.length === 0 && !loading && (
              <div className="text-center text-[#0B0B0B]/50 py-12">
                <p>Aucun artiste trouvé.</p>
              </div>
            )}
          </div>
        </section>

        {/* Section CTA - Rejoignez-nous */}
        <section className="relative py-24 bg-[#FFFFF6]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className={`${typography.heading.h2} text-[#0B0B0B] mb-6`}>
                REJOIGNEZ-NOUS!
              </h2>
              <div className="text-[#0B0B0B]/70 mb-8 text-lg flex flex-wrap items-center justify-center gap-2">
                <span>Vous êtes un artiste et souhaitez collaborer avec nous ? Nous sommes toujours à la recherche de</span>
                <HighlightBadge color="yellow" rotation={1} className="text-sm md:text-base">
                  NOUVEAUX TALENTS
                </HighlightBadge>
                <span>pour enrichir notre communauté.</span>
              </div>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-[#0B0B0B] text-white px-8 py-4 rounded-full hover:bg-[#0B0B0B]/80 transition-colors font-semibold shadow-lg"
              >
                Contactez-nous
              </motion.a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Artists;
