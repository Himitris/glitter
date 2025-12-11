import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Section,
  ColorfulBackground,
  HighlightBadge,
  SkeletonCard,
} from "../components/ui";
import ArtistCard from "../components/artists/ArtistCard";
import { typography } from "../utils/theme";
import ServiceCard from "../components/services/ServiceCard";
import Seo from "../components/seo/Seo";
import { seoConfig } from "../config/seo";
import { getAllDjs } from "../services/artistService";
import { Artist } from "../types";

// Services mis à jour pour les DJs avec stickers
const djServicesUpdated = [
  {
    title: "Administration et Gestion",
    sticker: "/images/Stickers/Administration.webp",
    description: "",
    features: [
      "Édition des contrats de cession et des factures",
      "Gestion de la paie des artistes et techniciens",
      "Accompagnement à l'intermittence",
      "Gestion des droits d'auteur",
    ],
    color: "administration" as const,
  },
  {
    title: "Production Musicale",
    sticker: "/images/Stickers/Production.webp",
    description: "",
    features: [
      "Accompagnement artistique",
      "Coordination technique",
      "Production d'albums",
      "Stratégie de sortie",
    ],
    color: "production" as const,
  },
  {
    title: "Production de Tournée",
    sticker: "/images/Stickers/Dir-Prod.webp",
    description: "",
    features: [
      "Élaboration des budgets de tournée",
      "Gestion de la logistique (transport, hébergement)",
      "Organisation des résidences",
      "Recherche de financements",
    ],
    color: "prestation" as const,
  },
];

const DJs = () => {
  const [djs, setDjs] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const fetchDjs = async () => {
      try {
        const data = await getAllDjs();
        setDjs(data);
      } catch (error) {
        console.error("Erreur lors du chargement des DJs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDjs();
  }, []);

  const { title, description, keywords, image, canonical } = seoConfig.djs;

  return (
    <>
      <Seo
        title={title}
        description={description}
        keywords={keywords}
        image={image}
        canonical={canonical}
      />
      <div>
        <ColorfulBackground
          variant="full-spectrum"
          intensity="strong"
          className="min-h-[45vh] flex items-center justify-center pt-32 pb-16"
        >
          <div className="text-center container mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-[#0B0B0B]">
              DJs & Producteurs
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-[#0B0B0B]/80 flex flex-wrap items-center justify-center gap-2"
            >
              <span>Découvrez les</span>
              <HighlightBadge color="yellow" rotation={-2}>
                DJs & PRODUCTEURS
              </HighlightBadge>
              <span>qui nous font confiance</span>
            </motion.div>
          </div>
        </ColorfulBackground>

        <Section>
          <div className="grid md:grid-cols-3 gap-8 mb-20 items-stretch">
            {djServicesUpdated.map((service, index) => (
              <div
                key={index}
                className="flex h-full animate-fade-in"
                style={{
                  animationDelay: prefersReducedMotion
                    ? "0ms"
                    : `${index * 50}ms`,
                }}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading
              ? // Skeleton cards pendant le chargement
                Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard key={index} variant="artist" />
                ))
              : djs.map((dj, index) => (
                  <div
                    key={dj.id}
                    className="animate-fade-in"
                    style={{
                      animationDelay: prefersReducedMotion
                        ? "0ms"
                        : `${Math.min(index, 5) * 50}ms`,
                    }}
                  >
                    <ArtistCard artist={dj} />
                  </div>
                ))}
          </div>

          {djs.length === 0 && !loading && (
            <div className="text-center text-[#0B0B0B]/50 py-12">
              <p>Aucun DJ trouvé dans cette catégorie.</p>
            </div>
          )}
        </Section>

        <Section className="bg-[#FFFFF6] py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className={`${typography.heading.h2} text-[#0B0B0B] mb-6`}>
                REJOIGNEZ-NOUS!
              </h2>
              <div className="text-[#0B0B0B]/70 mb-8 flex flex-wrap items-center justify-center gap-2">
                <span>Vous êtes un artiste et souhaitez</span>
                <HighlightBadge
                  color="yellow"
                  rotation={-1}
                  className="text-sm md:text-base"
                >
                  COLLABORER
                </HighlightBadge>
                <span>
                  avec nous ? Nous sommes toujours à la recherche de nouveaux
                  talents pour enrichir notre communauté.
                </span>
              </div>
              <a
                href="/contact"
                className="inline-block bg-[#0B0B0B] text-white px-8 py-3 rounded-full hover:bg-[#0B0B0B]/80 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Contactez-nous
              </a>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
};

export default DJs;
