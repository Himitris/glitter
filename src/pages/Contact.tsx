import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Instagram, Send } from "lucide-react";
import Section from "../components/ui/Section";
import GradientText from "../components/ui/GradientText";
import Star from "../components/ui/Star";
import { typography } from "../utils/theme";
import { useFormValidation } from "../hooks/useFormValidation";
import { useToast } from "../contexts/ToastContext";
import Loader from "../components/ui/Loader";
import ParallaxBanner from "../components/ui/ParallaxBanner";
import AnimatedGradientText from "../components/ui/AnimatedGradientText";
import Seo from "../components/seo/Seo";
import { seoConfig } from "../config/seo";

const Contact = () => {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    setValues,
  } = useFormValidation({
    name: "",
    email: "",
    message: "",
  });

  const { title, description, keywords, image, canonical } = seoConfig.contact;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationRules = {
      name: { required: true, minLength: 2 },
      email: { required: true, isEmail: true },
      message: { required: true, minLength: 10 },
    };

    if (validateForm(validationRules)) {
      setIsSubmitting(true);

      // Créer un objet FormData à partir du formulaire
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      // Convertir en URLSearchParams pour l'envoyer correctement
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      })
        .then(() => {
          setIsSubmitting(false);
          showToast("Votre message a été envoyé avec succès!", "success");
          setFormSubmitted(true);
        })
        .catch((error) => {
          setIsSubmitting(false);
          showToast("Une erreur s'est produite lors de l'envoi", "error");
          console.error(error);
        });
    }
  };

  return (
    <>
      <Seo
        title={title}
        description={description}
        keywords={keywords}
        image={image}
        canonical={canonical}
      />
      <div>
        <ParallaxBanner
          image="/images/background/photo3.jpg"
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
              Contactez-nous
            </AnimatedGradientText>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-200"
            >
              Discutons de votre projet ensemble
            </motion.p>
          </div>
        </ParallaxBanner>
        <Section>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center items-center gap-2 mb-6">
                <Star className="text-[#8C52FF]" size="sm" />
                <GradientText
                  as="h2"
                  gradient="primary"
                  className={typography.heading.h2}
                >
                  Parlons de votre projet
                </GradientText>
                <Star className="text-[#8C52FF]" size="sm" />
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Que vous soyez un artiste cherchant un accompagnement ou un
                organisateur d'événement, nous sommes là pour vous aider à faire
                briller votre projet.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Formulaire de contact */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#FF4D8F] to-[#FF8C60] text-transparent bg-clip-text">
                  Envoyez-nous un message
                </h3>

                {formSubmitted ? (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="mb-6 text-[#8C52FF]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>
                    <h4 className="text-xl font-semibold mb-2">
                      Message envoyé !
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Merci de nous avoir contactés. Nous vous répondrons dans
                      les plus brefs délais.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="text-[#FF4D8F] hover:text-[#FF8C60] underline transition-colors"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <form
                    className="space-y-6"
                    onSubmit={handleSubmit}
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                    action="/success"
                  >
                    {/* Champs cachés pour Netlify Forms */}
                    <input type="hidden" name="form-name" value="contact" />
                    <div className="hidden">
                      <label>
                        Ne pas remplir si vous êtes humain:{" "}
                        <input name="bot-field" />
                      </label>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-gray-700">
                        Nom
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={(e) =>
                          handleChange(e, { required: true, minLength: 2 })
                        }
                        onBlur={() => handleBlur("name")}
                        className={`w-full px-4 py-3 bg-gray-50 border ${
                          touched.name && errors.name
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D8F] focus:border-transparent text-gray-800`}
                        placeholder="Votre nom"
                      />
                      {touched.name && errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={(e) =>
                          handleChange(e, { required: true, isEmail: true })
                        }
                        onBlur={() => handleBlur("email")}
                        className={`w-full px-4 py-3 bg-gray-50 border ${
                          touched.email && errors.email
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D8F] focus:border-transparent text-gray-800`}
                        placeholder="Votre email"
                      />
                      {touched.email && errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-gray-700">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={values.message}
                        onChange={(e) =>
                          handleChange(e, { required: true, minLength: 10 })
                        }
                        onBlur={() => handleBlur("message")}
                        className={`w-full px-4 py-3 bg-gray-50 border ${
                          touched.message && errors.message
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D8F] focus:border-transparent text-gray-800`}
                        placeholder="Comment pouvons-nous vous aider ?"
                      ></textarea>
                      {touched.message && errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-full bg-gradient-to-r from-[#8C52FF] via-[#FF4D8F] to-[#FF8C60] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <Loader size="sm" />
                      ) : (
                        <>
                          <Send size={18} /> Envoyer
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>

              {/* Informations de contact */}
              <div>
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#8C52FF] to-[#FF4D8F] text-transparent bg-clip-text">
                  Nos coordonnées
                </h3>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-[#8C52FF] to-[#FF4D8F] p-3 rounded-full">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-1">
                        Email
                      </h4>
                      <p className="text-gray-600">
                        glitterproductions24@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-[#FF4D8F] to-[#FF8C60] p-3 rounded-full">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-1">
                        Situation
                      </h4>
                      <p className="text-gray-600">
                        Située entre les Landes et le Tarn
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-[#FF8C60] to-[#FFC74F] p-3 rounded-full">
                      <Instagram className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-1">
                        Instagram
                      </h4>
                      <a
                        href="https://instagram.com/glitter_prod"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF4D8F] hover:text-[#FF8C60] transition-colors"
                      >
                        @glitter_prod
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
};

export default Contact;
