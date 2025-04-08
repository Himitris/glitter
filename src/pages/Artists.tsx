import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Section from "../components/ui/Section";
import ArtistCard from "../components/artists/ArtistCard";
import { artists, artistServices } from "../data/artists";
import GradientText from "../components/ui/GradientText";
import Star from "../components/ui/Star";
import { typography } from "../utils/theme";
import ParallaxBanner from "../components/ui/ParallaxBanner";
import AnimatedGradientText from "../components/ui/AnimatedGradientText";
import ServiceCard from "../components/services/ServiceCard";

const Artists = () => {
  const [artistsRef, artistsInView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: "0px 0px -20% 0px", // Ceci déclenchera l'animation encore plus tôt
  });

  return (
    <div>
      <ParallaxBanner
        image="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=80"
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
            Nos Artistes
          </AnimatedGradientText>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200"
          >
            Découvrez les talents qui nous font confiance
          </motion.p>
        </div>
      </ParallaxBanner>
      <Section>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16"
          ref={artistsRef}
        >
          {artistServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={artistsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-25%" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <ArtistCard artist={artist} />
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Star className="text-[#8C52FF]" size="sm" />
            <GradientText
              as="h2"
              gradient="administration"
              className={typography.heading.h2 + " mb-6"}
            >
              REJOIGNEZ-NOUS!
            </GradientText>
            <Star className="text-[#8C52FF]" size="sm" />
          </div>
          <p className="text-gray-600 mb-8">
            Vous êtes un artiste et souhaitez collaborer avec nous ? Nous sommes
            toujours à la recherche de nouveaux talents pour enrichir notre
            communauté.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-block bg-gradient-to-r from-[#8C52FF] via-[#FF4D8F] to-[#FF8C60] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Contactez-nous
          </motion.a>
        </div>
      </Section>
    </div>
  );
};

export default Artists;
