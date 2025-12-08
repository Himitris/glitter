import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  ColorfulBackground,
  HighlightBadge,
} from "../components/ui";
import { typography } from "../utils/theme";
import Seo from "../components/seo/Seo";
import { seoConfig } from "../config/seo";
import SchemaOrg from "../components/seo/SchemaOrg";
import { useOptimizedAnimation } from "../hooks/useOptimizedAnimation";

const Home = () => {
  const { shouldReduceMotion, duration } = useOptimizedAnimation();

  // Récupérer les métadonnées SEO pour la page d'accueil
  const { title, description, keywords, image, canonical } = seoConfig.home;

  // Liste complète des services proposés avec stickers
  const allServices = [
    {
      sticker: "/images/Stickers/Administration.png",
      title: "ADMINISTRATION",
      description: "Gestion administrative des projets artistiques",
      color: "administration" as "administration",
    },
    {
      sticker: "/images/Stickers/Production.png",
      title: "PRODUCTION",
      description: "Accompagnement complet pour les productions artistiques",
      color: "production" as "production",
    },
    {
      sticker: "/images/Stickers/Management.png",
      title: "MANAGEMENT",
      description: "Développement de carrière et stratégie artistique",
      color: "management" as "management",
    },
    {
      sticker: "/images/Stickers/Régie-artiste.png",
      title: "RÉGIE ARTISTES",
      description:
        "Coordination des besoins des artistes durant les événements",
      color: "prestation" as "prestation",
    },
    {
      sticker: "/images/Stickers/Dir-Prod.png",
      title: "DIRECTION DE PRODUCTION",
      description: "Supervision globale de la production d'événements",
      color: "administration" as "administration",
    },
    {
      sticker: "/images/Stickers/Régie-site.png",
      title: "RÉGIE SITE",
      description: "Organisation et gestion logistique des sites d'événements",
      color: "production" as "production",
    },
  ];

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
        name="Glitter Production"
        description="Production d'événements uniques et mémorables."
        url="https://glitter-production.com"
        logo="/images/Logo/Logo-noir/Logo-noir.svg"
        sameAs={["https://instagram.com/glitter_prod"]}
      />
      <div>
        <ColorfulBackground variant="full-spectrum" intensity="strong" className="min-h-screen flex items-center justify-center pt-32 md:pt-40 relative">
          <div className="text-center container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.slow }}
              className="flex flex-col items-center gap-8"
            >
              {/* Logo Glitter */}
              <img
                src="/images/Logo/Logo-blanc/Logo-blanc-2.svg"
                alt="Glitter"
                className="w-full max-w-md md:max-w-lg h-auto drop-shadow-2xl animate-fade-in"
              />

              {/* Texte avec mots en évidence */}
              <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#0B0B0B] leading-relaxed">
                <div className="mb-3 md:mb-4">PRODUCTION D'ÉVÉNEMENTS</div>
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 lg:gap-4">
                  <HighlightBadge color="yellow" rotation={-1} className="text-lg md:text-2xl lg:text-4xl">
                    UNIQUES
                  </HighlightBadge>
                  <span className="text-lg md:text-2xl lg:text-4xl">ET</span>
                  <HighlightBadge color="yellow" rotation={1} className="text-lg md:text-2xl lg:text-4xl">
                    MÉMORABLES
                  </HighlightBadge>
                </div>
              </div>

              {/* Bouton CTA - CSS hover pour performance */}
              <div className="mt-6">
                <a
                  href="/services"
                  className="inline-block bg-white text-[#0B0B0B] px-8 py-4 rounded-full hover:bg-[#EBABFF] hover:scale-105 active:scale-95 transition-all duration-200 tracking-wide font-bold text-base md:text-lg shadow-xl border-2 border-[#0B0B0B]"
                >
                  Découvrir nos services
                </a>
              </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              <span className="text-[#0B0B0B]/60 text-sm font-medium">Découvrir</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-6 h-6 text-[#0B0B0B]/60" />
              </motion.div>
            </motion.div>
          </div>
        </ColorfulBackground>

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className={`${typography.heading.h2} text-[#0B0B0B]`}>
                Nos Services
              </h2>
              <div className="text-[#0B0B0B]/70 max-w-2xl mx-auto mt-4 flex flex-wrap items-center justify-center gap-2">
                <span>Découvrez notre gamme</span>
                <HighlightBadge color="yellow" rotation={-1} className="text-sm md:text-base">
                  COMPLÈTE
                </HighlightBadge>
                <span>de services adaptés aux besoins des artistes et des organisateurs d'événements.</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allServices.map((service, index) => (
                  <div
                    key={index}
                    className="relative group"
                  >
                    {/* Carte de service avec sticker */}
                    <div className="border-2 border-[#0B0B0B] rounded-2xl h-full group-hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ease-out">
                      <div className="relative p-6 rounded-2xl bg-[#FFFFF6] h-full flex flex-col items-center">
                        <div className="mb-4 flex justify-center">
                          <img
                            src={service.sticker}
                            alt={service.title}
                            className="w-16 h-16 object-contain"
                          />
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-center text-[#0B0B0B]">
                          {service.title}
                        </h3>
                        <p className="text-[#0B0B0B]/70 text-center text-sm">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-[#775CFF]/5 via-[#EBABFF]/5 to-[#FF7A42]/5 relative overflow-hidden">
          {/* Forme organique en arrière-plan */}
          <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-[#EBABFF]/20 to-[#FF7A42]/20 rounded-[40%_60%_70%_30%/50%_40%_60%_50%] blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-br from-[#775CFF]/20 to-[#EBABFF]/20 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-2xl" />

          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl font-bold mb-6 text-[#0B0B0B]">
              Prêt à faire briller votre projet ?
            </h2>
            <p className="text-[#0B0B0B]/70 mb-8 max-w-2xl mx-auto">
              Découvrez comment Glitter Productions peut transformer votre
              vision en réalité éclatante. Contactez-nous dès aujourd'hui pour
              discuter de vos idées.
            </p>
            <a
              href="/contact"
              className="inline-block bg-[#0B0B0B] text-white px-8 py-4 rounded-full hover:bg-[#0B0B0B]/80 hover:scale-105 active:scale-95 transition-all duration-200 tracking-wide font-semibold"
            >
              Contactez-nous
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
