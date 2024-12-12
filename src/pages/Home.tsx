import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Music, Users } from 'lucide-react';

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
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&auto=format&fit=crop&q=80"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-transparent bg-clip-text">
              Faire briller chaque moment,
            </span>
            <br />
            ensemble !
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-gray-200"
          >
            Production d'événements uniques et mémorables
          </motion.p>
        </div>
      </section>

      {/* Upcoming Event Section */}
      <section className="py-20 bg-black/80">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-64 md:h-full">
                <img
                  src={upcomingEvent.image}
                  alt={upcomingEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">Prochain Événement</h3>
                <h4 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
                  {upcomingEvent.title}
                </h4>
                <p className="text-gray-300 mb-2">{upcomingEvent.date}</p>
                <p className="text-gray-300 mb-6">{upcomingEvent.location}</p>
                <button className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity">
                  Réserver
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="w-12 h-12 text-pink-500" />,
                title: "Événements Uniques",
                description: "Des expériences sur mesure pour chaque occasion"
              },
              {
                icon: <Music className="w-12 h-12 text-purple-500" />,
                title: "Production Artistique",
                description: "Accompagnement complet des artistes"
              },
              {
                icon: <Users className="w-12 h-12 text-orange-500" />,
                title: "Communauté",
                description: "Un réseau d'artistes et de passionnés"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800"
              >
                <div className="mb-6 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;