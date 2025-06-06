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
import ParallaxBanner from "../components/ui/ParallaxBanner";
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
      icon: <Calendar className="w-12 h-12 text-[#FF4D8F]" />,
      title: "ADMINISTRATION",
      description: "Gestion administrative des projets artistiques",
      color: "administration" as "administration",
    },
    {
      icon: <Music className="w-12 h-12 text-[#8C52FF]" />,
      title: "PRODUCTION",
      description: "Accompagnement complet pour les productions artistiques",
      color: "production" as "production",
    },
    {
      icon: <Users className="w-12 h-12 text-[#FF8C60]" />,
      title: "MANAGEMENT",
      description: "Développement de carrière et stratégie artistique",
      color: "management" as "management",
    },
    {
      icon: <FileText className="w-12 h-12 text-[#FFC74F]" />,
      title: "RÉGIE ARTISTES",
      description:
        "Coordination des besoins des artistes durant les événements",
      color: "prestation" as "prestation",
    },
    {
      icon: <Briefcase className="w-12 h-12 text-[#FF4D8F]" />,
      title: "DIRECTION DE PRODUCTION",
      description: "Supervision globale de la production d'événements",
      color: "administration" as "administration",
    },
    {
      icon: <MapPin className="w-12 h-12 text-[#8C52FF]" />,
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
        logo="/images/logos/logo-noir-complete-png.png"
        sameAs={["https://instagram.com/glitter_prod"]}
      />
      <div>
        <ParallaxBanner
          image="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&auto=format&fit=crop&q=80"
          height="100vh"
          className="mt-0"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="flex justify-center items-center gap-2 mb-6">
                <Star className="text-[#8C52FF]" size="sm" />
                <Star className="text-[#FF4D8F]" size="md" />
                <Star className="text-[#FF8C60]" size="sm" />
              </div>

              <AnimatedGradientText
                as="h1"
                className={typography.heading.h1}
                speed="medium"
              >
                Glitter Productions
              </AnimatedGradientText>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`text-xl md:text-2xl text-gray-200`}
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
                  className="bg-gradient-to-r from-[#8C52FF] via-[#FF4D8F] to-[#FF8C60] text-white px-8 py-3 rounded-full hover:opacity-90 transition-all uppercase tracking-wider"
                >
                  Découvrir nos services
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </ParallaxBanner>

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex justify-center items-center gap-2">
                <Star className="text-[#8C52FF]" size="sm" />
                <AnimatedGradientText
                  as="h2"
                  gradient="primary"
                  className={typography.heading.h2 + " inline-block"}
                  speed="medium"
                >
                  Nos Services
                </AnimatedGradientText>
                <Star className="text-[#8C52FF]" size="sm" />
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                Découvrez notre gamme complète de services adaptés aux besoins
                des artistes et des organisateurs d'événements.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Effet de bordure en hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-[#8C52FF] via-[#FF4D8F] to-[#FF8C60] rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity blur-xl`}
                  />

                  <div className="relative p-8 rounded-2xl bg-white border border-gray-200 group-hover:border-transparent transition-all h-full shadow-sm flex flex-col items-center">
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
                    <p className="text-gray-600 text-center">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-[#8C52FF]/5 via-[#FF4D8F]/5 to-[#FF8C60]/5">
          <div className="container mx-auto px-4 text-center">
            <AnimatedGradientText
              as="h2"
              className="text-3xl font-bold mb-6"
              speed="medium"
            >
              Prêt à faire briller votre projet ?
            </AnimatedGradientText>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Découvrez comment Glitter Productions peut transformer votre
              vision en réalité éclatante. Contactez-nous dès aujourd'hui pour
              discuter de vos idées.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="inline-block bg-gradient-to-r from-[#8C52FF] via-[#FF4D8F] to-[#FF8C60] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity uppercase tracking-wider"
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
