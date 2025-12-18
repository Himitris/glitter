import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Instagram, Send, Linkedin, Facebook } from "lucide-react";
import {
  Section,
  Loader,
  ColorfulBackground,
  HighlightBadge,
} from "../components/ui";
import { typography } from "../utils/theme";
import { useFormValidation } from "../hooks/useFormValidation";
import { useToast } from "../contexts/ToastContext";
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

      // Envoyer les données à Formspree
      fetch("https://formspree.io/f/mvgkdzow", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            setIsSubmitting(false);
            showToast("Votre message a été envoyé avec succès!", "success");
            setFormSubmitted(true);
            setValues({ name: "", email: "", message: "" });
          } else {
            response.json().then((data) => {
              setIsSubmitting(false);
              showToast(
                data.error || "Une erreur s'est produite lors de l'envoi",
                "error"
              );
            });
          }
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
        <ColorfulBackground variant="full-spectrum" intensity="strong" className="min-h-[45vh] flex items-center justify-center pt-32 pb-16">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-[#0B0B0B]">
              Contactez-nous
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl text-[#0B0B0B]/80 flex flex-wrap items-center justify-center gap-2"
            >
              <span>Discutons de votre</span>
              <HighlightBadge color="yellow" rotation={-2}>
                PROJET
              </HighlightBadge>
              <span>ensemble</span>
            </motion.div>
          </div>
        </ColorfulBackground>
        <Section>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`${typography.heading.h2} text-[#0B0B0B] mb-6`}>
                Parlons de votre projet
              </h2>
              <div className="text-[#0B0B0B]/70 max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-2">
                <span>Que vous soyez un artiste cherchant un accompagnement ou une structure culturelle, nous sommes là pour vous aider à faire</span>
                <HighlightBadge color="yellow" rotation={1} className="text-sm md:text-base">
                  BRILLER
                </HighlightBadge>
                <span>votre projet.</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Formulaire de contact */}
              <div className="bg-white border border-[#0B0B0B]/10 rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold mb-6 text-[#0B0B0B]">
                  Envoyez-nous un message
                </h3>

                {formSubmitted ? (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="mb-6 text-[#0B0B0B]"
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
                    <p className="text-[#0B0B0B]/70 mb-4">
                      Merci de nous avoir contactés. Nous vous répondrons dans
                      les plus brefs délais.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="text-[#0B0B0B] hover:text-[#0B0B0B]/70 underline transition-colors"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <form
                    className="space-y-6"
                    onSubmit={handleSubmit}
                    method="POST"
                  >
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-[#0B0B0B]">
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
                        className={`w-full px-4 py-3 bg-[#FFFFF6] border ${
                          touched.name && errors.name
                            ? "border-red-500"
                            : "border-[#0B0B0B]/20"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B0B0B]/30 focus:border-transparent text-[#0B0B0B]`}
                        placeholder="Votre nom"
                      />
                      {touched.name && errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-[#0B0B0B]">
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
                        className={`w-full px-4 py-3 bg-[#FFFFF6] border ${
                          touched.email && errors.email
                            ? "border-red-500"
                            : "border-[#0B0B0B]/20"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B0B0B]/30 focus:border-transparent text-[#0B0B0B]`}
                        placeholder="Votre email"
                      />
                      {touched.email && errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-[#0B0B0B]">
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
                        className={`w-full px-4 py-3 bg-[#FFFFF6] border ${
                          touched.message && errors.message
                            ? "border-red-500"
                            : "border-[#0B0B0B]/20"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B0B0B]/30 focus:border-transparent text-[#0B0B0B]`}
                        placeholder="Comment pouvons-nous vous aider ?"
                      ></textarea>
                      {touched.message && errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      className="w-full bg-[#0B0B0B] text-white px-6 py-3 rounded-full hover:bg-[#0B0B0B]/80 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
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
                    </button>
                  </form>
                )}
              </div>

              {/* Informations de contact */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-[#0B0B0B]">
                  Nos coordonnées
                </h3>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#0B0B0B] p-3 rounded-full">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-[#0B0B0B] mb-1">
                        Email
                      </h4>
                      <a
                        href="mailto:contact@glitterprod.com"
                        className="text-[#0B0B0B] hover:text-[#0B0B0B]/70 underline transition-colors"
                      >
                        contact@glitterprod.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#0B0B0B] p-3 rounded-full">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-[#0B0B0B] mb-1">
                        Situation
                      </h4>
                      <p className="text-[#0B0B0B]/70">
                        Toulouse
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#0B0B0B] p-3 rounded-full">
                      <Instagram className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-[#0B0B0B] mb-1">
                        Instagram
                      </h4>
                      <a
                        href="https://instagram.com/glitter_prod"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0B0B0B] hover:text-[#0B0B0B]/70 underline transition-colors"
                      >
                        @glitter_prod
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#0B0B0B] p-3 rounded-full">
                      <Linkedin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-[#0B0B0B] mb-1">
                        LinkedIn
                      </h4>
                      <a
                        href="https://www.linkedin.com/company/glitter-productions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0B0B0B] hover:text-[#0B0B0B]/70 underline transition-colors"
                      >
                        Glitter Productions
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#0B0B0B] p-3 rounded-full">
                      <Facebook className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-[#0B0B0B] mb-1">
                        Facebook
                      </h4>
                      <a
                        href="https://www.facebook.com/glitterproductions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0B0B0B] hover:text-[#0B0B0B]/70 underline transition-colors"
                      >
                        Glitter Productions
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
