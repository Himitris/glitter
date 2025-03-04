// Créez un nouveau fichier src/pages/Contact.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Instagram, Send } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import GradientText from '../components/ui/GradientText';
import Star from '../components/ui/Star';
import { typography } from '../utils/theme';
import { useFormValidation } from '../hooks/useFormValidation';
import { useToast } from '../contexts/ToastContext';
import Loader from '../components/ui/Loader';
import ParallaxBanner from '../components/ui/ParallaxBanner';

const Contact = () => {

  const { showToast } = useToast();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    setValues
  } = useFormValidation({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationRules = {
      name: { required: true, minLength: 2 },
      email: { required: true, isEmail: true },
      message: { required: true, minLength: 10 }
    };

    if (validateForm(validationRules)) {
      // Simuler l'envoi du formulaire
      setTimeout(() => {
        showToast('Votre message a été envoyé avec succès!', 'success');
        setValues({ name: '', email: '', message: '' });
      }, 1000);
    }
  };
  return (
    <div>
      <ParallaxBanner
        image="https://images.unsplash.com/photo-1508997449629-303059a039c0?w=1600&auto=format&fit=crop&q=80"
        height="45vh"
        className="mt-0"
      >
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-transparent bg-clip-text">
              Contactez-nous
            </span>
          </motion.h1>

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
              <GradientText as="h2" gradient="primary" className={typography.heading.h2}>
                Parlons de votre projet
              </GradientText>
              <Star className="text-[#8C52FF]" size="sm" />
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Que vous soyez un artiste cherchant un accompagnement ou un organisateur d'événement,
              nous sommes là pour vous aider à faire briller votre projet.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Formulaire de contact */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#FF4D8F] to-[#FF8C60] text-transparent bg-clip-text">
                Envoyez-nous un message
              </h3>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-gray-300">Nom</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={(e) => handleChange(e, { required: true, minLength: 2 })}
                    onBlur={() => handleBlur('name')}
                    className={`w-full px-4 py-3 bg-gray-800/50 border ${touched.name && errors.name ? 'border-red-500' : 'border-gray-700'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D8F] focus:border-transparent text-white`}
                    placeholder="Votre nom"
                  />
                  {touched.name && errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-gray-300">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={(e) => handleChange(e, { required: true, isEmail: true })}
                    onBlur={() => handleBlur('email')}
                    className={`w-full px-4 py-3 bg-gray-800/50 border ${touched.email && errors.email ? 'border-red-500' : 'border-gray-700'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D8F] focus:border-transparent text-white`}
                    placeholder="Votre email"
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-gray-300">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={values.message}
                    onChange={(e) => handleChange(e, { required: true, minLength: 10 })}
                    onBlur={() => handleBlur('message')}
                    className={`w-full px-4 py-3 bg-gray-800/50 border ${touched.message && errors.message ? 'border-red-500' : 'border-gray-700'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D8F] focus:border-transparent text-white`}
                    placeholder="Comment pouvons-nous vous aider ?"
                  ></textarea>
                  {touched.message && errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full bg-gradient-to-r from-[#8C52FF] via-[#FF4D8F] to-[#FF8C60] text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  type="submit"
                >
                  {/* Ajouter un état de chargement */}
                  {false ? <Loader size="sm" /> : <><Send size={18} /> Envoyer</>}
                </motion.button>
              </form>
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
                    <h4 className="text-xl font-semibold text-white mb-1">Email</h4>
                    <p className="text-gray-300">glitterproductions24@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-[#FF4D8F] to-[#FF8C60] p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-1">Situation</h4>
                    <p className="text-gray-300">Située entre les Landes et le Tarn</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-[#FF8C60] to-[#FFC74F] p-3 rounded-full">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-1">Instagram</h4>
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
  );
};

export default Contact;