import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Section,
  GradientText,
  Star,
  ColorfulBackground,
  AnimatedGradientText,
  Loader,
  HighlightBadge,
} from "../components/ui";
import ArtistCard from "../components/artists/ArtistCard";
import { useInView } from "react-intersection-observer";
import { typography } from "../utils/theme";
import ServiceCard from "../components/services/ServiceCard";
import Seo from "../components/seo/Seo";
import { seoConfig } from "../config/seo";
import { getAllDjs } from "../services/artistService";
import { Artist } from "../types";

// Services mis à jour pour les DJs
const djServicesUpdated = [
  {
    title: "Administration et Gestion",
    icon: "FileText",
    description: "",
    features: [
      "Édition des contrats de cession et des factures",
      "Gestion de la paie des artistes et techniciens",
      "Accompagnement à l'intermittence",
      "Gestion des droits d'auteur",
    ],
    color: "administration",
  },
  {
    title: "Production Musicale",
    icon: "Music",
    description: "",
    features: [
      "Accompagnement artistique",
      "Coordination technique",
      "Production d'albums",
      "Stratégie de sortie",
    ],
    color: "production",
  },
  {
    title: "Production de Tournée",
    icon: "Calendar",
    description: "",
    features: [
      "Élaboration des budgets de tournée",
      "Gestion de la logistique (transport, hébergement)",
      "Organisation des résidences",
      "Recherche de financements",
    ],
    color: "prestation",
  },
];

const DJs = () => {
  const [artistsRef, artistsInView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: "0px 0px -20% 0px",
  });

  const [djs, setDjs] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

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
        <ColorfulBackground variant="full-spectrum" intensity="strong" className="min-h-[45vh] flex items-center justify-center pt-32 pb-16">
          <div className="text-center container mx-auto px-4">
            <AnimatedGradientText
              as="h2"
              gradient="primary"
              className="text-4xl md:text-6xl font-bold mb-4"
              speed="medium"
            >
              DJs & Producteurs
            </AnimatedGradientText>

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
          <div className="grid md:grid-cols-3 gap-8 mb-20 items-stretch" ref={artistsRef}>
            {djServicesUpdated.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={artistsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex h-full"
              >
                <ServiceCard
                  key={index}
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

          {loading ? (
            <div className="flex justify-center p-12">
              <Loader size="lg" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {djs.map((dj, index) => (
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
          )}

          {djs.length === 0 && !loading && (
            <div className="text-center text-[#0B0B0B]/50 py-12">
              <p className="mb-4">Aucun DJ trouvé dans cette catégorie.</p>
              <Star className="text-[#775CFF] mx-auto" size="md" />
            </div>
          )}
        </Section>

        <Section className="bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center items-center gap-2 mb-6">
              <Star className="text-[#775CFF]" size="sm" />
              <GradientText
                as="h2"
                gradient="administration"
                className={typography.heading.h2 + " mb-6"}
              >
                REJOIGNEZ-NOUS!
              </GradientText>
              <Star className="text-[#775CFF]" size="sm" />
            </div>
            <div className="text-[#0B0B0B]/70 mb-8 flex flex-wrap items-center justify-center gap-2">
              <span>Vous êtes un artiste et souhaitez</span>
              <HighlightBadge color="yellow" rotation={-1} className="text-sm md:text-base">
                COLLABORER
              </HighlightBadge>
              <span>avec nous ? Nous sommes toujours à la recherche de nouveaux talents pour enrichir notre communauté.</span>
            </div>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="inline-block bg-gradient-to-r from-[#775CFF] via-[#EBABFF] to-[#FF7A42] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Contactez-nous
            </motion.a>
          </div>
        </Section>
      </div>
    </>
  );
};

export default DJs;
