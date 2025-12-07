import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Section, ParallaxBanner, AnimatedGradientText } from "../components/ui";
import Seo from "../components/seo/Seo";

const Success = () => {
  return (
    <>
      <Seo
        title="Message envoyé | Glitter Production"
        description="Votre message a été envoyé avec succès à Glitter Production."
        canonical="/success"
      />
      <div>
        <ParallaxBanner
          image="/images/photo3.webp"
          height="40vh"
          className="mt-0"
        >
          <div className="text-center">
            <AnimatedGradientText
              as="h2"
              gradient="primary"
              className="text-4xl md:text-6xl font-bold mb-4"
              speed="medium"
            >
              Message Envoyé !
            </AnimatedGradientText>
          </div>
        </ParallaxBanner>

        <Section>
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-10 shadow-md flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#8C52FF] via-[#FF4D8F] to-[#FF8C60] flex items-center justify-center mb-6">
                <Check className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-3xl font-bold mb-4">
                Merci pour votre message !
              </h2>

              <p className="text-gray-600 mb-8">
                Nous avons bien reçu votre message et nous vous répondrons dans
                les plus brefs délais. Notre équipe s'efforce de répondre à
                toutes les demandes sous 48 heures.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to="/"
                  className="bg-gradient-to-r from-[#8C52FF] via-[#FF4D8F] to-[#FF8C60] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity inline-block"
                >
                  Retour à l'accueil
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </Section>
      </div>
    </>
  );
};

export default Success;
