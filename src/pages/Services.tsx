import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
// Note: motion is still used in ColorfulBackground header animation
import {
  Section,
  ColorfulBackground,
  HighlightBadge,
} from '../components/ui';
import { MapPin } from 'lucide-react';
import { eventServices } from '../data/services';
import { getAllExperiences } from '../services/experienceService';
import { Experience } from '../types';
import { typography } from '../utils/theme';
import Seo from "../components/seo/Seo";
import { seoConfig } from "../config/seo";
import SchemaOrg from "../components/seo/SchemaOrg";
import { useOptimizedAnimation } from "../hooks/useOptimizedAnimation";

const Services = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const { shouldReduceMotion } = useOptimizedAnimation();

  useEffect(() => {
    const fetchExperiences = async () => {
      const data = await getAllExperiences();
      setExperiences(data);
    };
    fetchExperiences();
  }, []);

  const { title, description, keywords, image, canonical } = seoConfig.services;

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
        type="LocalBusiness"
        name="Glitter Production - Services"
        description="Services de production, d'administration et de régie pour tous types d'événements artistiques."
        url="https://glitterprod.com/services"
        image="/images/background/photo1.webp"
      />
      <div>
        <ColorfulBackground variant="full-spectrum" intensity="strong" className="min-h-[45vh] flex items-center justify-center pt-32 pb-16">
          <div className="text-center container mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-[#0B0B0B]">
              Nos Services
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-[#0B0B0B]/80 flex flex-wrap items-center justify-center gap-2"
            >
              <span>Des services</span>
              <HighlightBadge color="yellow" rotation={-2}>
                COMPLETS
              </HighlightBadge>
              <span>et</span>
              <HighlightBadge color="yellow" rotation={2}>
                PROFESSIONNELS
              </HighlightBadge>
            </motion.div>
          </div>
        </ColorfulBackground>

        <Section className="bg-[#FFFFF6]">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className={`${typography.heading.h2} text-[#0B0B0B] mb-4`}>
              Services aux Organisateurs d'Événements
            </h2>
            <div className="text-[#0B0B0B]/70 flex flex-wrap items-center justify-center gap-2">
              <span>Glitter Productions propose des services</span>
              <HighlightBadge color="yellow" rotation={1} className="text-sm md:text-base">
                DE RÉGIE
              </HighlightBadge>
              <span>pour tous types d'événements artistiques.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventServices.map((service, index) => (
              <div
                key={index}
                className="h-full animate-fade-in"
                style={{ animationDelay: shouldReduceMotion ? '0ms' : `${index * 50}ms` }}
              >
                <div className="h-full bg-white border border-[#0B0B0B]/10 rounded-xl overflow-hidden group hover:shadow-sm hover:border-[#EBABFF]/30 transition-all p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <img
                        src={service.sticker}
                        alt={service.title}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-[#0B0B0B]">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-[#0B0B0B]/70 text-sm mb-3">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className={`${typography.heading.h2} text-[#0B0B0B] mb-4`}>
              Nos Réalisations
            </h2>
            <p className="text-[#0B0B0B]/70">
              Découvrez quelques-unes de nos expériences récentes dans
              l'organisation et la production d'événements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp, index) => (
              <div
                key={exp.id || index}
                className="bg-white border border-[#0B0B0B]/10 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-[#775CFF]/10 transition-all h-full animate-fade-in"
                style={{ animationDelay: shouldReduceMotion ? '0ms' : `${index * 50}ms` }}
              >
                {/* Structure horizontale avec logo à gauche et contenu à droite */}
                <div className="grid grid-cols-4 h-full">
                  {/* Logo container - 1/4 de la largeur */}
                  <div className="bg-gradient-to-br from-[#775CFF]/5 to-[#EBABFF]/5 flex items-center justify-center p-3">
                    <div className="w-full aspect-square bg-white rounded-lg shadow-sm flex items-center justify-center p-2 transition-transform duration-300 hover:scale-105 will-change-transform">
                      <img
                        src={exp.logo}
                        alt={`${exp.title} logo`}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Description container - 3/4 de la largeur */}
                  <div className="p-4 col-span-3 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-[#0B0B0B]">
                        {exp.title}
                      </h3>
                      <span className="bg-[#775CFF]/10 text-[#775CFF] px-2 py-1 rounded-full text-xs font-medium">
                        {exp.year}
                      </span>
                    </div>

                    <div className="flex items-center text-[#0B0B0B]/70 mb-2 text-xs">
                      <MapPin size={12} className="mr-1 text-[#EBABFF]" />
                      <span>{exp.location}</span>
                    </div>

                    <p className="text-[#0B0B0B]/70 text-sm mb-3">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-auto">
                      {exp.services.map((service, serviceIndex) => (
                        <span
                          key={serviceIndex}
                          className="bg-[#0B0B0B]/5 text-[#0B0B0B] px-2 py-0.5 rounded-full text-xs"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a
              href="/contact"
              className="inline-block bg-[#0B0B0B] text-white px-8 py-3 rounded-full hover:bg-[#0B0B0B]/80 hover:scale-105 active:scale-95 transition-all duration-200 uppercase tracking-wider text-sm"
            >
              Discuter de votre projet
            </a>
          </div>
        </Section>
      </div>
    </>
  );
};

export default Services;