import { motion } from "framer-motion";
import {
  Section,
  TeamMember,
  ColorfulBackground,
  HighlightBadge,
} from "../components/ui";
import { Instagram } from "lucide-react";
import { typography } from "../utils/theme";
import Seo from "../components/seo/Seo";
import { seoConfig } from "../config/seo";
import { useOptimizedAnimation } from "../hooks/useOptimizedAnimation";

const About = () => {
  const { shouldReduceMotion, duration } = useOptimizedAnimation();
  // Récupérer les métadonnées SEO pour la page À propos
  const { title, description, keywords, image, canonical } = seoConfig.about;

  const founders = [
    {
      name: "Chloé Jolly",
      role: "Co-fondatrice",
      image: "/images/about/chloe.webp",
      description:
        "Son domaine c'est la paie!\n\nMais pas que! Chloé gère différents aspects dans le domaine du spectacle vivant, tels que la coordination des projets, la gestion des contrats, la facturation.\n\nChloé possède également de nombreuses expériences sur des événements artistiques comme responsable bénévoles, directrice de production, chargée de recrutement.",
      socialLinks: {},
      department: "administration" as "administration",
    },
    {
      name: "Matisse Pellegrin",
      role: "Co-fondatrice",
      image: "/images/about/matisse.webp",
      description:
        "Son truc, c'est la prod!\n\nMais Matisse a aussi fait ses preuves en administration et management de projets. Elle a été régisseuse de tournées pour différents groupes de musique.\n\nMatisse possède aussi des compétences en régie d'événements suite à ses expériences de directrice de production adjointe, régisseuse artistes et logistiques!",
      socialLinks: {},
      department: "production" as "production",
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

      <div>
        <ColorfulBackground
          variant="full-spectrum"
          intensity="strong"
          className="min-h-[45vh] flex items-center justify-center pt-32 pb-16"
        >
          <div className="text-center container mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-[#0B0B0B]">
              À Propos de Nous
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/95 drop-shadow-md flex flex-wrap items-center justify-center gap-2"
            >
              <span>Une structure</span>
              <HighlightBadge color="yellow" rotation={-1}>
                DÉDIÉE
              </HighlightBadge>
              <span>à la production, l'administration et le management</span>
            </motion.div>
          </div>
        </ColorfulBackground>

        <Section>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className={`${typography.heading.h2} text-[#0B0B0B] mb-6`}>
              Notre Histoire
            </h2>
            <p className="text-[#0B0B0B]/70 mb-8">
              Créée en 2024 par Chloé Jolly et Matisse Pellegrin, Glitter
              Productions est une structure dédiée à la production,
              l'administration et le management dans le domaine de la musique et
              du spectacle vivant, située entre les Landes et le Tarn.
            </p>
            <p className="text-[#0B0B0B]/70 flex flex-wrap items-center justify-center gap-2">
              <span>Forte de la passion et de l'expertise de ses fondatrices, Glitter Productions propose des services</span>
              <HighlightBadge color="yellow" rotation={1}>
                ADAPTÉS
              </HighlightBadge>
              <span>aux besoins des artistes et des événements artistiques en se positionnant comme un véritable partenaire.</span>
            </p>
          </div>
        </Section>

        <Section>
          <div className="text-center mb-12">
            <h2 className={`${typography.heading.h2} text-[#0B0B0B] mb-6`}>
              Nos Fondatrices
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {founders.map((member, index) => (
              <div
                key={index}
                className="animate-fade-in"
                style={{
                  animationDelay: shouldReduceMotion ? '0ms' : `${index * 100}ms`,
                  animationDuration: shouldReduceMotion ? '0.1s' : `${duration.slow}s`,
                }}
              >
                <TeamMember {...member} />
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-[#0B0B0B]/70 mb-8">
              Leur complémentarité et leur vision commune de l'accompagnement
              artistique sont au cœur de la réussite de Glitter Productions.
            </p>
            <motion.a
              href="https://instagram.com/glitter_prod"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 text-[#EBABFF] hover:text-[#FF7A42] transition-colors"
            >
              <Instagram size={20} />
              @glitter_prod
            </motion.a>
          </div>
        </Section>
      </div>
    </>
  );
};

export default About;
