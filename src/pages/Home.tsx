import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Music, Users } from 'lucide-react';
import GradientText from '../components/ui/GradientText';
import Star from '../components/ui/Star';
import { typography } from '../utils/theme';
import Testimonials from '../components/home/Testimonials';
import ParallaxBanner from '../components/ui/ParallaxBanner';

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const upcomingEvent = {
    title: "Summer Vibes Festival",
    date: "15 Juillet 2024",
    location: "Parc des Expositions, Paris",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1600&auto=format&fit=crop&q=80",
  };

  return (
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

            <GradientText as="h1" className={typography.heading.h1}>
              Faire briller chaque moment,
              <br />
              ensemble !
            </GradientText>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`${typography.body.large} mt-6 uppercase tracking-widest`}
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

      {/* Upcoming Event Section */}
      <section className="py-20 bg-black/80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-2">
              <Star className="text-[#FFC74F]" size="sm" />
              <GradientText as="h2" gradient="prestation" className={typography.heading.h2 + " inline-block"}>
                Prochain Événement
              </GradientText>
              <Star className="text-[#FFC74F]" size="sm" />
            </div>
          </div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden shadow-2xl group hover:border-[#FFC74F]/30 transition-all"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-64 md:h-full overflow-hidden">
                <img
                  src={upcomingEvent.image}
                  alt={upcomingEvent.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay dégradé */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {/* Étoile décorative */}
                <Star className="absolute top-4 right-4 text-white" size="sm" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <GradientText as="h4" gradient="prestation" className="text-3xl font-bold mb-4">
                  {upcomingEvent.title}
                </GradientText>
                <p className="text-gray-300 mb-2 flex items-center">
                  <Calendar size={16} className="mr-2 text-[#FFC74F]" />
                  {upcomingEvent.date}
                </p>
                <p className="text-gray-300 mb-6 flex items-center">
                  <span className="mr-2">📍</span> {upcomingEvent.location}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-gradient-to-r from-[#FFC74F] to-[#FF8C60] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity self-start uppercase tracking-wider text-sm"
                >
                  Réserver
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-2">
              <Star className="text-[#8C52FF]" size="sm" />
              <GradientText as="h2" gradient="primary" className={typography.heading.h2 + " inline-block"}>
                Nos Services
              </GradientText>
              <Star className="text-[#8C52FF]" size="sm" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="w-12 h-12 text-[#FF4D8F]" />,
                title: "Événements Uniques",
                description: "Des expériences sur mesure pour chaque occasion",
                color: "administration"
              },
              {
                icon: <Music className="w-12 h-12 text-[#8C52FF]" />,
                title: "Production Artistique",
                description: "Accompagnement complet des artistes",
                color: "production"
              },
              {
                icon: <Users className="w-12 h-12 text-[#FF8C60]" />,
                title: "Management",
                description: "Un réseau d'artistes et de passionnés",
                color: "management"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative group"
              >
                {/* Effet de bordure en hover */}
                <div className={`absolute inset-0 bg-gradient-to-r from-[#8C52FF] via-[#FF4D8F] to-[#FF8C60] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl`} />

                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 group-hover:border-transparent transition-all h-full">
                  <div className="mb-6 flex justify-center">{feature.icon}</div>
                  <GradientText as="h3" gradient={feature.color} className="text-xl font-bold mb-4 text-center uppercase">
                    {feature.title}
                  </GradientText>
                  <p className="text-gray-400 text-center">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <motion.a
              href="/services"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="inline-block bg-transparent border border-[#8C52FF] text-white px-8 py-3 rounded-full hover:bg-[#8C52FF]/10 transition-all uppercase tracking-wider text-sm"
            >
              Tous nos services
            </motion.a>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-[#8C52FF]/10 via-[#FF4D8F]/10 to-[#FF8C60]/10">
        <div className="container mx-auto px-4 text-center">
          <GradientText as="h2" className="text-3xl font-bold mb-6">
            Prêt à faire briller votre projet ?
          </GradientText>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Découvrez comment Glitter Productions peut transformer votre vision en réalité éclatante.
            Contactez-nous dès aujourd'hui pour discuter de vos idées.
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
  );
};

export default Home;