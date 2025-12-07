import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Section,
  GradientText,
  Star,
  ColorfulBackground,
  AnimatedGradientText,
  HighlightBadge,
} from '../components/ui';
import { Briefcase, Users, FileText, Calendar, MapPin } from 'lucide-react';
import { eventServices, pastExperiences } from '../data/services';
import { typography } from '../utils/theme';
import Seo from "../components/seo/Seo";
import { seoConfig } from "../config/seo";
import SchemaOrg from "../components/seo/SchemaOrg";

const Services = () => {
  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: '0px 0px -10% 0px'
  });

  const [experiencesRef, experiencesInView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: '0px 0px -10% 0px'
  });

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
        url="https://glitter-production.com/services"
        image="/images/background/photo1.webp"
      />
      <div>
        <ColorfulBackground variant="rose-orange" intensity="strong" className="min-h-[45vh] flex items-center justify-center pt-32 pb-16">
          <div className="text-center container mx-auto px-4">
            <AnimatedGradientText
              as="h2"
              gradient="primary"
              className="text-4xl md:text-6xl font-bold mb-4"
              speed="medium"
            >
              Nos Services
            </AnimatedGradientText>

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
            <div className="flex justify-center items-center gap-2 mb-4">
              <Star className="text-[#FFFF73]" size="sm" />
              <GradientText
                as="h2"
                gradient="prestation"
                className={typography.heading.h2}
              >
                Services aux Organisateurs d'Événements
              </GradientText>
              <Star className="text-[#FFFF73]" size="sm" />
            </div>
            <div className="text-[#0B0B0B]/70 flex flex-wrap items-center justify-center gap-2">
              <span>Glitter Productions propose des services</span>
              <HighlightBadge color="yellow" rotation={1} className="text-sm md:text-base">
                DE RÉGIE
              </HighlightBadge>
              <span>pour tous types d'événements artistiques.</span>
            </div>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            ref={servicesRef}
          >
            {eventServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <div className="h-full bg-white border border-[#0B0B0B]/10 rounded-xl overflow-hidden group hover:shadow-sm hover:border-[#EBABFF]/30 transition-all p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center bg-${
                        service.color === "production"
                          ? "[#775CFF]"
                          : service.color === "administration"
                          ? "[#EBABFF]"
                          : service.color === "management"
                          ? "[#FF7A42]"
                          : "[#FFFF73]"
                      }/10`}
                    >
                      {service.icon === "Users" ? (
                        <Users
                          size={18}
                          className={`text-${
                            service.color === "production"
                              ? "[#775CFF]"
                              : service.color === "administration"
                              ? "[#EBABFF]"
                              : service.color === "management"
                              ? "[#FF7A42]"
                              : "[#FFFF73]"
                          }`}
                        />
                      ) : service.icon === "Briefcase" ? (
                        <Briefcase
                          size={18}
                          className={`text-${
                            service.color === "production"
                              ? "[#775CFF]"
                              : service.color === "administration"
                              ? "[#EBABFF]"
                              : service.color === "management"
                              ? "[#FF7A42]"
                              : "[#FFFF73]"
                          }`}
                        />
                      ) : service.icon === "FileText" ? (
                        <FileText
                          size={18}
                          className={`text-${
                            service.color === "production"
                              ? "[#775CFF]"
                              : service.color === "administration"
                              ? "[#EBABFF]"
                              : service.color === "management"
                              ? "[#FF7A42]"
                              : "[#FFFF73]"
                          }`}
                        />
                      ) : service.icon === "MapPin" ? (
                        <MapPin
                          size={18}
                          className={`text-${
                            service.color === "production"
                              ? "[#775CFF]"
                              : service.color === "administration"
                              ? "[#EBABFF]"
                              : service.color === "management"
                              ? "[#FF7A42]"
                              : "[#FFFF73]"
                          }`}
                        />
                      ) : (
                        <Calendar
                          size={18}
                          className={`text-${
                            service.color === "production"
                              ? "[#775CFF]"
                              : service.color === "administration"
                              ? "[#EBABFF]"
                              : service.color === "management"
                              ? "[#FF7A42]"
                              : "[#FFFF73]"
                          }`}
                        />
                      )}
                    </div>
                    <GradientText
                      as="h3"
                      gradient={
                        service.color as
                          | "primary"
                          | "secondary"
                          | "production"
                          | "administration"
                          | "management"
                          | "prestation"
                      }
                      className="text-lg font-bold"
                    >
                      {service.title}
                    </GradientText>
                  </div>
                  <p className="text-[#0B0B0B]/70 text-sm mb-3">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Star className="text-[#775CFF]" size="sm" />
              <GradientText
                as="h2"
                gradient="production"
                className={typography.heading.h2}
              >
                Nos Réalisations
              </GradientText>
              <Star className="text-[#775CFF]" size="sm" />
            </div>
            <p className="text-[#0B0B0B]/70">
              Découvrez quelques-unes de nos expériences récentes dans
              l'organisation et la production d'événements.
            </p>
          </div>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            ref={experiencesRef}
          >
            {pastExperiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={experiencesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-[#0B0B0B]/10 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-[#775CFF]/10 transition-all h-full"
              >
                {/* Structure horizontale avec logo à gauche et contenu à droite */}
                <div className="grid grid-cols-4 h-full">
                  {/* Logo container - 1/4 de la largeur */}
                  <div className="bg-gradient-to-br from-[#775CFF]/5 to-[#EBABFF]/5 flex items-center justify-center p-3">
                    <div className="w-full aspect-square bg-white rounded-lg shadow-sm flex items-center justify-center p-2 transition-transform duration-300 hover:scale-105">
                      <img
                        src={exp.logo}
                        alt={`${exp.title} logo`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Description container - 3/4 de la largeur */}
                  <div className="p-4 col-span-3 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <GradientText
                        as="h3"
                        gradient="production"
                        className="text-lg font-bold"
                      >
                        {exp.title}
                      </GradientText>
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
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="inline-block bg-gradient-to-r from-[#775CFF] via-[#EBABFF] to-[#FF7A42] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity uppercase tracking-wider text-sm"
            >
              Discuter de votre projet
            </motion.a>
          </div>
        </Section>
      </div>
    </>
  );
};

export default Services;