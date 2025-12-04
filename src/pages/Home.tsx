import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Calendar,
  Music,
  Users,
  FileText,
  Briefcase,
  MapPin,
} from "lucide-react";
import GradientText from "../components/ui/GradientText";
import AnimatedGradientText from "../components/ui/AnimatedGradientText";
import Star from "../components/ui/Star";
import { typography } from "../utils/theme";
import Testimonials from "../components/home/Testimonials";
import ColorfulBackground from "../components/ui/ColorfulBackground";
import Seo from "../components/seo/Seo";
import { seoConfig } from "../config/seo";
import SchemaOrg from "../components/seo/SchemaOrg";
import UpcomingEvent from "../components/home/UpcomingEvent";

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Récupérer les métadonnées SEO pour la page d'accueil
  const { title, description, keywords, image, canonical } = seoConfig.home;

  // Liste complète des services proposés
  const allServices = [
    {
      icon: <Calendar className="w-12 h-12 text-[#EBABFF]" />,
      title: "ADMINISTRATION",
      description: "Gestion administrative des projets artistiques",
      color: "administration" as "administration",
    },
    {
      icon: <Music className="w-12 h-12 text-[#775CFF]" />,
      title: "PRODUCTION",
      description: "Accompagnement complet pour les productions artistiques",
      color: "production" as "production",
    },
    {
      icon: <Users className="w-12 h-12 text-[#FF7A42]" />,
      title: "MANAGEMENT",
      description: "Développement de carrière et stratégie artistique",
      color: "management" as "management",
    },
    {
      icon: <FileText className="w-12 h-12 text-[#FFFF73]" />,
      title: "RÉGIE ARTISTES",
      description:
        "Coordination des besoins des artistes durant les événements",
      color: "prestation" as "prestation",
    },
    {
      icon: <Briefcase className="w-12 h-12 text-[#EBABFF]" />,
      title: "DIRECTION DE PRODUCTION",
      description: "Supervision globale de la production d'événements",
      color: "administration" as "administration",
    },
    {
      icon: <MapPin className="w-12 h-12 text-[#775CFF]" />,
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
        <ColorfulBackground variant="full-spectrum" intensity="strong" className="min-h-screen flex items-center justify-center pt-32 md:pt-40">
          <div className="text-center container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="flex justify-center items-center gap-2 mb-6">
                <Star className="text-white/80" size="sm" />
                <Star className="text-white" size="md" />
                <Star className="text-white/80" size="sm" />
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white drop-shadow-lg">
                Glitter Productions
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-white/95 drop-shadow-md"
              >
                Production d'événements uniques et mémorables
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-10"
              >
                <motion.a
                  href="/services"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="inline-block bg-white text-[#775CFF] px-8 py-4 rounded-full hover:bg-[#FFFF73] hover:text-[#0B0B0B] transition-all tracking-wide font-bold text-lg shadow-xl"
                >
                  Découvrir nos services
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </ColorfulBackground>

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex justify-center items-center gap-2">
                <Star className="text-[#775CFF]" size="sm" />
                <AnimatedGradientText
                  as="h2"
                  gradient="primary"
                  className={typography.heading.h2 + " inline-block"}
                  speed="medium"
                >
                  Nos Services
                </AnimatedGradientText>
                <Star className="text-[#775CFF]" size="sm" />
              </div>
              <p className="text-[#0B0B0B]/70 max-w-2xl mx-auto mt-4">
                Découvrez notre gamme complète de services adaptés aux besoins
                des artistes et des organisateurs d'événements.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allServices.map((service, index) => {
                // Alterner les couleurs de bordure pour chaque carte
                const borderVariants = ['violet', 'rose', 'orange', 'jaune'] as const;
                const borderVariant = borderVariants[index % borderVariants.length];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group"
                  >
                    {/* Bordure gradient */}
                    <div className={`bg-gradient-to-br ${
                      borderVariant === 'violet' ? 'from-[#775CFF] to-[#EBABFF]' :
                      borderVariant === 'rose' ? 'from-[#EBABFF] to-[#FF7A42]' :
                      borderVariant === 'orange' ? 'from-[#FF7A42] to-[#EBABFF]' :
                      'from-[#FFFF73] to-[#EBABFF]'
                    } p-[2px] rounded-3xl h-full group-hover:shadow-2xl group-hover:shadow-[#EBABFF]/30 transition-all duration-300`}>
                      <div className="relative p-8 rounded-3xl bg-[#FFFFF6] h-full flex flex-col items-center">
                        <div className="mb-6 flex justify-center">
                          {service.icon}
                        </div>
                        <div className="text-center w-full">
                          <AnimatedGradientText
                            as="h3"
                            gradient={service.color}
                            className="text-xl font-bold mb-4 text-center inline-block"
                            speed="fast"
                          >
                            {service.title}
                          </AnimatedGradientText>
                        </div>
                        <p className="text-[#0B0B0B]/70 text-center">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-[#775CFF]/5 via-[#EBABFF]/5 to-[#FF7A42]/5 relative overflow-hidden">
          {/* Forme organique en arrière-plan */}
          <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-[#EBABFF]/20 to-[#FF7A42]/20 rounded-[40%_60%_70%_30%/50%_40%_60%_50%] blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-br from-[#775CFF]/20 to-[#EBABFF]/20 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-2xl" />

          <div className="container mx-auto px-4 text-center relative z-10">
            <AnimatedGradientText
              as="h2"
              className="text-3xl font-bold mb-6"
              speed="medium"
            >
              Prêt à faire briller votre projet ?
            </AnimatedGradientText>
            <p className="text-[#0B0B0B]/70 mb-8 max-w-2xl mx-auto">
              Découvrez comment Glitter Productions peut transformer votre
              vision en réalité éclatante. Contactez-nous dès aujourd'hui pour
              discuter de vos idées.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="inline-block bg-gradient-to-r from-[#EBABFF] to-[#FF7A42] text-[#0B0B0B] px-8 py-4 rounded-full hover:opacity-90 transition-opacity tracking-wide font-semibold border-2 border-[#0B0B0B]"
            >
              Contactez-nous
            </motion.a>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
