// Créez un nouveau fichier src/components/home/Testimonials.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import GradientText from '../ui/GradientText';
import Star from '../ui/Star';
import TestimonialModal from './TestimonialModal';
import { typography } from '../../utils/theme';

const testimonials = [
  {
    id: 1,
    name: "Marie Laurent",
    role: "Organisatrice d'événements",
    content: "Travailler avec Glitter Productions a été une expérience exceptionnelle. Leur créativité et leur professionnalisme ont transformé notre événement en une soirée magique que nos invités n'oublieront jamais.",
    rating: 5,
    shortContent: "Travailler avec Glitter Productions a été une expérience exceptionnelle. Leur créativité et leur professionnalisme..."
  },
  {
    id: 2,
    name: "Thomas Dubois",
    role: "Artiste",
    content: "Glitter Productions a été un partenaire clé dans le développement de ma carrière. Leur accompagnement personnalisé et leur réseau m'ont permis de franchir des étapes importantes.",
    rating: 5,
    shortContent: "Glitter Productions a été un partenaire clé dans le développement de ma carrière. Leur accompagnement personnalisé..."
  },
  {
    id: 3,
    name: "Sophie Moreau",
    role: "Directrice de festival",
    content: "Je recommande vivement Glitter Productions pour leur expertise technique et leur capacité à s'adapter à tous types d'événements. Une équipe réactive et passionnée.",
    rating: 4,
    shortContent: "Je recommande vivement Glitter Productions pour leur expertise technique et leur capacité à s'adapter..."
  }
];

const Testimonials = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<typeof testimonials[0] | null>(null);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Star className="text-[#FF8C60]" size="sm" />
            <Quote className="w-10 h-10 text-[#FF8C60]" />
            <Star className="text-[#FF8C60]" size="sm" />
          </div>
          <GradientText as="h2" gradient="management" className={typography.heading.h2 + " mb-6"}>
            Ce qu'ils disent de nous
          </GradientText>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Découvrez les témoignages de nos clients et partenaires qui nous ont fait confiance.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 cursor-pointer hover:border-gray-700 transition-all"
              onClick={() => setSelectedTestimonial(testimonial)}
            >
              <div className="mb-4">
                <Quote className="w-8 h-8 text-[#FF8C60] opacity-50" />
              </div>
              <p className="text-gray-300 italic mb-6">"{testimonial.shortContent}"</p>
              <div className="mt-auto">
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <TestimonialModal
        isOpen={!!selectedTestimonial}
        onClose={() => setSelectedTestimonial(null)}
        testimonial={selectedTestimonial || testimonials[0]}
      />
    </section>
  );
};

export default Testimonials;