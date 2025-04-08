import { motion } from "framer-motion";
import Section from "../components/ui/Section";
import TeamMember from "../components/ui/TeamMember";
import GradientText from "../components/ui/GradientText";
import Star from "../components/ui/Star";
import { Instagram } from "lucide-react";
import { typography } from "../utils/theme";
import ParallaxBanner from "../components/ui/ParallaxBanner";
import AnimatedGradientText from "../components/ui/AnimatedGradientText";

const About = () => {
    const founders = [
      {
        name: "Chloé Jolly",
        role: "Co-fondatrice",
        image: "/images/about/chloe.jpg",
        description:
          "Son domaine c'est la paie!\n\nMais pas que! Chloé gère différents aspects dans le domaine du spectacle vivant, tels que la coordination des projets, la gestion des contrats, la facturation.\n\nChloé possède également de nombreuses expériences sur des événements artistiques comme responsable bénévoles, directrice de production, chargée de recrutement.",
        socialLinks: {
        },
        department: "administration" as "administration", 
      },
      {
        name: "Matisse Pellegrin",
        role: "Co-fondatrice",
        image: "/images/about/matisse.jpg",
        description:
          "Son truc, c'est la prod!\n\nMais Matisse a aussi fait ses preuves en administration et management de projets. Elle a été régisseuse de tournées pour différents groupes de musique.\n\nMatisse possède aussi des compétences en régie d'événements suite à ses expériences de directrice de production adjointe, régisseuse artistes et logistiques!",
        socialLinks: {
        },
        department: "production" as "production", 
      },
    ];

  return (
    <div>
      <ParallaxBanner
        image="/images/background/photo1.jpg"
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
            À Propos de Nous
          </AnimatedGradientText>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200"
          >
            Une structure dédiée à la production, l'administration et le
            management
          </motion.p>
        </div>
      </ParallaxBanner>

      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Star className="text-[#FF4D8F]" size="sm" />
            <AnimatedGradientText
              as="h2"
              className={`${typography.heading.h2}`}
            >
              Notre Histoire
            </AnimatedGradientText>
            <Star className="text-[#FF4D8F]" size="sm" />
          </div>
          <p className="text-gray-600 mb-8">
            Créée en 2024 par Chloé Jolly et Matisse Pellegrin, Glitter
            Productions est une structure dédiée à la production,
            l'administration et le management dans le domaine de la musique et
            du spectacle vivant, située entre les Landes et le Tarn.
          </p>
          <p className="text-gray-600">
            Forte de la passion et de l'expertise de ses fondatrices, Glitter
            Productions propose des services adaptés aux besoins des artistes et
            des événements artistiques en se positionnant comme un véritable
            partenaire.
          </p>
        </div>
      </Section>

      <Section>
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Star className="text-[#8C52FF]" size="sm" />
            <GradientText
              as="h2"
              gradient="management"
              className={typography.heading.h2}
            >
              Nos Fondatrices
            </GradientText>
            <Star className="text-[#8C52FF]" size="sm" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {founders.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TeamMember key={index} {...member} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-8">
            Leur complémentarité et leur vision commune de l'accompagnement
            artistique sont au cœur de la réussite de Glitter Productions.
          </p>
          <motion.a
            href="https://instagram.com/glitter_prod"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 text-[#FF4D8F] hover:text-[#FF8C60] transition-colors"
          >
            <Instagram size={20} />
            @glitter_prod
          </motion.a>
        </div>
      </Section>
    </div>
  );
};

export default About;
