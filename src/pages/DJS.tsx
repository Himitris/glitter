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
import { getAllDjs, FirebaseServiceError } from "../services/artistService";
import { Artist } from "../types";
import { useToast } from "../contexts/ToastContext";

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
  const { showToast } = useToast();

  useEffect(() => {
    const fetchDjs = async () => {
      try {
        const data = await getAllDjs();
        setDjs(data);
      } catch (error) {
        console.error("Erreur lors du chargement des DJs:", error);
        if (error instanceof FirebaseServiceError) {
          showToast(error.message, "error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDjs();
  }, [showToast]);

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
        {/* Hero Section */}
        <ColorfulBackground variant="full-spectrum" intensity="strong" className="min-h-[45vh] flex items-center justify-center pt-32 pb-16">
          <div className="text-center container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#0B0B0B]">
              DJs & Producteurs
            </h1>

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

        {/* Section Services - avec background gradient subtil */}
        <section className="relative py-20 bg-gradient-to-b from-[#FFFFF6] to-[#775CFF]/5 overflow-hidden">
          {/* Éléments décoratifs */}
          <div className="absolute top-10 right-10 w-28 h-28 opacity-20 pointer-events-none hidden lg:block">
            <img
              src="/images/Stickers/Boule-disco.webp"
              alt=""
              className="w-full h-full object-contain animate-float-slow"
            />
          </div>
          <div className="absolute bottom-16 left-10 w-20 h-20 opacity-15 pointer-events-none hidden lg:block">
            <img
              src="/images/Stickers/Strass/Strass-05.webp"
              alt=""
              className="w-full h-full object-contain animate-float"
              style={{ animationDelay: '1.5s' }}
            />
          </div>

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
                  Ce que nous proposons
                </span>
                <h2 className={`${typography.heading.h2} text-[#0B0B0B] mb-4`}>
                  Nos Services pour DJs
                </h2>
                <p className="text-[#0B0B0B]/60 max-w-2xl mx-auto">
                  Un accompagnement sur-mesure pour booster votre carrière
                </p>
              </motion.div>
            </div>

            {/* Grille de services */}
            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              {djServicesUpdated.map((service, index) => (
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

        {/* Séparateur décoratif */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#EBABFF]/40 to-transparent" />

        {/* Section DJs - avec background différent */}
        <section className="relative py-20 bg-[#FFFFF6] overflow-hidden">
          {/* Blob décoratif en arrière-plan */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-gradient-to-br from-[#EBABFF]/15 to-[#775CFF]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#FF7A42]/10 to-[#FFFF73]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Stickers décoratifs flottants */}
          <div className="absolute top-32 left-16 w-16 h-16 opacity-15 pointer-events-none hidden xl:block">
            <img
              src="/images/Stickers/Strass/Strass-09.webp"
              alt=""
              className="w-full h-full object-contain animate-float"
              style={{ animationDelay: '0.5s' }}
            />
          </div>
          <div className="absolute bottom-40 right-20 w-20 h-20 opacity-10 pointer-events-none hidden xl:block">
            <img
              src="/images/Stickers/Strass/Strass-02.webp"
              alt=""
              className="w-full h-full object-contain animate-float-slow"
            />
          </div>
          <div className="absolute top-1/2 right-8 w-12 h-12 opacity-20 pointer-events-none hidden xl:block">
            <img
              src="/images/Stickers/Strass/Strass-04.webp"
              alt=""
              className="w-full h-full object-contain animate-float"
              style={{ animationDelay: '2s' }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Titre de section */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block bg-[#EBABFF]/20 text-[#0B0B0B] px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Notre roster
                </span>
                <h2 className={`${typography.heading.h2} text-[#0B0B0B] mb-4`}>
                  Les DJs Glitter
                </h2>
                <p className="text-[#0B0B0B]/60 max-w-2xl mx-auto">
                  Des artistes passionnés qui font vibrer les dance floors
                </p>
              </motion.div>
            </div>

            {/* Grille de DJs */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard key={index} variant="artist" />
                ))
              ) : (
                djs.map((dj, index) => (
                  <motion.div
                    key={dj.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : Math.min(index, 5) * 0.1 }}
                    className="h-full"
                  >
                    <ArtistCard artist={dj} />
                  </motion.div>
                ))
              )}
            </div>

            {djs.length === 0 && !loading && (
              <div className="text-center text-[#0B0B0B]/50 py-12">
                <p>Aucun DJ trouvé dans cette catégorie.</p>
              </div>
            )}
          </div>
        </section>

        {/* Section CTA - Rejoignez-nous */}
        <section className="relative py-24 bg-gradient-to-br from-[#EBABFF]/10 via-[#775CFF]/5 to-[#FFFF73]/10 overflow-hidden">
          {/* Bordures décoratives */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EBABFF]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#775CFF]/30 to-transparent" />

          {/* Stickers décoratifs */}
          <div className="absolute top-1/2 -translate-y-1/2 left-10 w-28 h-28 opacity-20 pointer-events-none hidden lg:block">
            <img
              src="/images/Stickers/Coeur-01.webp"
              alt=""
              className="w-full h-full object-contain animate-float"
            />
          </div>
          <div className="absolute bottom-10 right-16 w-24 h-24 opacity-15 pointer-events-none hidden lg:block">
            <img
              src="/images/Stickers/Boule-disco.webp"
              alt=""
              className="w-full h-full object-contain animate-float-slow"
              style={{ animationDelay: '1s' }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
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
                <span>Vous êtes un DJ et souhaitez</span>
                <HighlightBadge color="yellow" rotation={-1} className="text-sm md:text-base">
                  COLLABORER
                </HighlightBadge>
                <span>avec nous ? Nous sommes toujours à la recherche de nouveaux talents pour enrichir notre communauté.</span>
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

export default DJs;
