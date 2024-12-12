import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import ServiceCard from '../components/services/ServiceCard';
import { services } from '../data/services';
import { Star } from 'lucide-react';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      quote: "Une équipe professionnelle qui a su donner vie à notre vision avec brio.",
      author: "Marie L.",
      role: "Directrice Marketing"
    },
    {
      quote: "La qualité de production a dépassé toutes nos attentes.",
      author: "Thomas B.",
      role: "Artiste"
    }
  ];

  return (
    <div>
      <PageHeader
        title="Nos Services"
        subtitle="Une expertise complète pour vos projets"
        backgroundImage="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&auto=format&fit=crop&q=80"
      />

      <Section>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex justify-center mb-6">
            <Star className="w-12 h-12 text-pink-500" />
          </div>
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
            Une Production Sur Mesure
          </h2>
          <p className="text-gray-300">
            De la conception à la réalisation, nous vous accompagnons dans toutes les étapes
            de votre projet pour créer des moments inoubliables.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </Section>

      <Section className="bg-black/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
            Ce Qu'ils Disent de Nous
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8"
              >
                <p className="text-lg text-gray-300 mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-pink-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
            Prêt à Donner Vie à Votre Projet ?
          </h2>
          <p className="text-gray-300 mb-8">
            Contactez-nous pour discuter de votre vision et découvrir comment nous pouvons vous aider à la réaliser.
          </p>
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Demander un Devis
          </a>
        </div>
      </Section>
    </div>
  );
};

export default Services;