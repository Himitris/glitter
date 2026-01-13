import { motion } from "framer-motion";
import { ChevronDown, Music } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ColorfulBackground, HighlightBadge, ImageWithFallback } from "../components/ui";
import { typography } from "../utils/theme";
import Seo from "../components/seo/Seo";
import { seoConfig } from "../config/seo";
import SchemaOrg from "../components/seo/SchemaOrg";
import { useOptimizedAnimation } from "../hooks/useOptimizedAnimation";
import {
  getAllArtists,
  getAllDjs,
  FirebaseServiceError,
} from "../services/artistService";
import { Artist } from "../types";
import { useToast } from "../contexts/ToastContext";
import {
  getRandomItems,
} from "../config/displayOrder";
import ArtistModal from "../components/artists/ArtistModal";

const Home = () => {
  const { shouldReduceMotion, duration } = useOptimizedAnimation();
  const { showToast } = useToast();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [djs, setDjs] = useState<Artist[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(3);

  // Adapter le nombre d'éléments affichés selon la taille de l'écran
  useEffect(() => {
    const updateItemsCount = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsToShow(6); // 2 lignes de 3 sur desktop
      } else if (width >= 640) {
        setItemsToShow(4); // 2 lignes de 2 sur tablet
      } else {
        setItemsToShow(3); // 3 éléments sur mobile
      }
    };

    updateItemsCount();
    window.addEventListener('resize', updateItemsCount);
    return () => window.removeEventListener('resize', updateItemsCount);
  }, []);

  // Charger les artistes et DJs au montage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artistsData, djsData] = await Promise.all([
          getAllArtists(),
          getAllDjs(),
        ]);
        setArtists(artistsData);
        setDjs(djsData);
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
        if (error instanceof FirebaseServiceError) {
          showToast(error.message, "error");
        } else {
          showToast("Une erreur est survenue lors du chargement", "error");
        }
      }
    };
    fetchData();
  }, [showToast]);

  // Sélection aléatoire d'artistes et DJs selon la taille de l'écran
  const featuredArtists = useMemo(
    () => getRandomItems(artists, itemsToShow),
    [artists, itemsToShow]
  );
  const featuredDjs = useMemo(
    () => getRandomItems(djs, itemsToShow),
    [djs, itemsToShow]
  );

  // Fonction pour ouvrir le modal
  const handleOpenModal = (artist: Artist) => {
    setSelectedArtist(artist);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArtist(null);
  };

  // Récupérer les métadonnées SEO pour la page d'accueil
  const { title, description, keywords, image, canonical } = seoConfig.home;

  // Liste complète des services proposés avec stickers
  const allServices = [
    {
      sticker: "/images/Stickers/Administration.webp",
      title: "ADMINISTRATION",
      description: "Gestion administrative des projets artistiques",
      color: "administration" as "administration",
    },
    {
      sticker: "/images/Stickers/Production.webp",
      title: "PRODUCTION",
      description: "Accompagnement complet pour les productions artistiques",
      color: "production" as "production",
    },
    {
      sticker: "/images/Stickers/Management.webp",
      title: "MANAGEMENT",
      description: "Développement de carrière et stratégie artistique",
      color: "management" as "management",
    },
    {
      sticker: "/images/Stickers/Régie-artiste.webp",
      title: "RÉGIE ARTISTES",
      description:
        "Coordination des besoins des artistes durant les événements",
      color: "prestation" as "prestation",
    },
    {
      sticker: "/images/Stickers/Dir-Prod.webp",
      title: "DIRECTION DE PRODUCTION",
      description: "Supervision globale de la production d'événements",
      color: "administration" as "administration",
    },
    {
      sticker: "/images/Stickers/Régie-site.webp",
      title: "RÉGIE SITE",
      description: "Organisation et gestion logistique des sites d'événements",
      color: "production" as "production",
    },
  ];

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
        type="Organization"
        name="Glitter Production"
        description="Production d'événements uniques et mémorables."
        url="https://glitterprod.com"
        logo="/images/Logo/Logo-noir/Logo-noir.svg"
        sameAs={["https://instagram.com/glitter_prod"]}
      />
      <div>
        <ColorfulBackground
          variant="full-spectrum"
          intensity="strong"
          className="h-screen flex flex-col pt-20 md:pt-24 relative"
        >
          {/* Contenu principal centré */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center container mx-auto px-4 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: duration.slow }}
                className="flex flex-col items-center gap-6 md:gap-8"
              >
                {/* Logo Glitter avec Productions */}
                <div className="flex flex-col items-center">
                  <img
                    src="/images/Logo/Logo-blanc/Logo-blanc.svg"
                    alt="Glitter"
                    className="w-full max-w-sm md:max-w-lg h-auto drop-shadow-2xl animate-fade-in"
                  />
                </div>

                {/* Texte avec mots en évidence */}
                <div className="text-xl md:text-4xl lg:text-5xl font-bold text-[#0B0B0B] leading-relaxed">
                  <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 lg:gap-4">
                    <span className="text-base md:text-2xl lg:text-4xl">
                      FAIRE
                    </span>
                    <HighlightBadge
                      color="yellow"
                      rotation={-1}
                      className="text-base md:text-2xl lg:text-4xl"
                    >
                      BRILLER
                    </HighlightBadge>
                    <span className="text-base md:text-2xl lg:text-4xl">
                      VOS
                    </span>
                    <HighlightBadge
                      color="yellow"
                      rotation={1}
                      className="text-base md:text-2xl lg:text-4xl"
                    >
                      PROJETS
                    </HighlightBadge>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator - en bas de l'écran */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="pb-6 md:pb-8 flex flex-col items-center gap-1 cursor-pointer"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-[#0B0B0B]/60" />
            </motion.div>
          </motion.div>
        </ColorfulBackground>

        {/* Services Section */}
        <section className="py-20 bg-[#FFFFF6]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className={`${typography.heading.h2} text-[#0B0B0B]`}>
                Nos Services
              </h2>
              <div className="text-[#0B0B0B]/70 max-w-2xl mx-auto mt-4 flex flex-wrap items-center justify-center gap-2">
                <span>Découvrez notre gamme</span>
                <HighlightBadge
                  color="yellow"
                  rotation={-1}
                  className="text-sm md:text-base"
                >
                  COMPLÈTE
                </HighlightBadge>
                <span>
                  de services adaptés aux besoins des artistes et des structures
                  culturelles.
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allServices.map((service, index) => (
                <div key={index} className="relative group">
                  {/* Carte de service avec sticker */}
                  <div className="border-2 border-[#0B0B0B] rounded-2xl h-full group-hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ease-out">
                    <div className="relative p-6 rounded-2xl bg-[#FFFFF6] h-full flex flex-col items-center">
                      <div className="mb-4 flex justify-center">
                        <img
                          src={service.sticker}
                          alt={service.title}
                          width={64}
                          height={64}
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-center text-[#0B0B0B]">
                        {service.title}
                      </h3>
                      <p className="text-[#0B0B0B]/70 text-center text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 3 boutons pour les différents services */}
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <a
                href="/artists"
                className="inline-block bg-[#EBABFF] text-[#0B0B0B] px-6 py-3 rounded-full hover:bg-[#d98fee] hover:scale-105 active:scale-95 transition-all duration-200 font-semibold border-2 border-[#0B0B0B]"
              >
                Services aux Artistes
              </a>
              <a
                href="/djs"
                className="inline-block bg-[#775CFF] text-white px-6 py-3 rounded-full hover:bg-[#5a45cc] hover:scale-105 active:scale-95 transition-all duration-200 font-semibold border-2 border-[#0B0B0B]"
              >
                Services aux DJ Producteurs
              </a>
              <a
                href="/services"
                className="inline-block bg-[#FFFF73] text-[#0B0B0B] px-6 py-3 rounded-full hover:bg-[#e6e666] hover:scale-105 active:scale-95 transition-all duration-200 font-semibold border-2 border-[#0B0B0B]"
              >
                Services aux Structures Culturelles
              </a>
            </div>
          </div>
        </section>

        {/* Section Artistes & DJs */}
        {(featuredArtists.length > 0 || featuredDjs.length > 0) && (
          <section className="py-16 bg-[#FFFFF6] border-t border-[#0B0B0B]/10">
            <div className="container mx-auto px-4">
              {/* Artistes */}
              {featuredArtists.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className={`${typography.heading.h2} text-[#0B0B0B]`}>
                      Nos Artistes
                    </h2>
                  </div>
                  <p className="text-[#0B0B0B]/60 mb-8">
                    Voici quelques artistes que nous accompagnons — découvrez-en
                    encore plus !
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredArtists.map((artist) => {
                      const image = Array.isArray(artist.image)
                        ? artist.image[0]
                        : artist.image;
                      return (
                        <div
                          key={artist.id}
                          onClick={() => handleOpenModal(artist)}
                          className="group relative overflow-hidden rounded-2xl border-2 border-[#0B0B0B] bg-[#FFFFF6] hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                        >
                          <div className="aspect-[4/3] overflow-hidden">
                            <img
                              src={image}
                              alt={artist.name}
                              width={400}
                              height={300}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            {/* Overlay avec liens sociaux */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center pb-4">
                              <div className="flex gap-3">
                                {artist.socialLinks?.spotify && (
                                  <a
                                    href={artist.socialLinks.spotify}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors"
                                  >
                                    <Music size={18} className="text-white" />
                                  </a>
                                )}
                                {artist.socialLinks?.instagram && (
                                  <a
                                    href={artist.socialLinks.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors w-9 h-9 flex items-center justify-center"
                                  >
                                    <img
                                      src="/images/Réseaux sociaux/Instagram.png"
                                      alt="Instagram"
                                      className="w-5 h-5 object-contain"
                                    />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-lg text-[#0B0B0B]">
                              {artist.name}
                            </h3>
                            <p className="text-[#0B0B0B]/60 text-sm line-clamp-2 mt-1">
                              {artist.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Bouton voir tous les artistes */}
                  <div className="text-center mt-8">
                    <a
                      href="/artists"
                      className="inline-block bg-[#EBABFF] text-[#0B0B0B] px-6 py-3 rounded-full hover:bg-[#d98fee] hover:scale-105 active:scale-95 transition-all duration-200 font-semibold border-2 border-[#0B0B0B]"
                    >
                      Découvrir tous nos artistes →
                    </a>
                  </div>
                </div>
              )}

              {/* DJs */}
              {featuredDjs.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className={`${typography.heading.h2} text-[#0B0B0B]`}>
                      Nos DJs/Producteurs
                    </h2>
                  </div>
                  <p className="text-[#0B0B0B]/60 mb-8">
                    Découvrez une sélection de nos DJs talentueux — il y en a
                    bien d'autres à explorer !
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredDjs.map((dj) => {
                      const image = Array.isArray(dj.image)
                        ? dj.image[0]
                        : dj.image;
                      return (
                        <div
                          key={dj.id}
                          onClick={() => handleOpenModal(dj)}
                          className="group relative overflow-hidden rounded-2xl border-2 border-[#0B0B0B] bg-[#FFFFF6] hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                        >
                          <div className="aspect-[4/3] overflow-hidden">
                            <img
                              src={image}
                              alt={dj.name}
                              width={400}
                              height={300}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            {/* Overlay avec liens sociaux */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center pb-4">
                              <div className="flex gap-3">
                                {dj.socialLinks?.spotify && (
                                  <a
                                    href={dj.socialLinks.spotify}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors"
                                  >
                                    <Music size={18} className="text-white" />
                                  </a>
                                )}
                                {dj.socialLinks?.instagram && (
                                  <a
                                    href={dj.socialLinks.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors w-9 h-9 flex items-center justify-center"
                                  >
                                    <img
                                      src="/images/Réseaux sociaux/Instagram.png"
                                      alt="Instagram"
                                      className="w-5 h-5 object-contain"
                                    />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-lg text-[#0B0B0B]">
                              {dj.name}
                            </h3>
                            <p className="text-[#0B0B0B]/60 text-sm line-clamp-2 mt-1">
                              {dj.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Bouton voir tous les DJs */}
                  <div className="text-center mt-8">
                    <a
                      href="/djs"
                      className="inline-block bg-[#775CFF] text-white px-6 py-3 rounded-full hover:bg-[#5a45cc] hover:scale-105 active:scale-95 transition-all duration-200 font-semibold border-2 border-[#0B0B0B]"
                    >
                      Découvrir tous nos DJs →
                    </a>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-20 bg-[#FFFFF6]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-[#0B0B0B]">
              Prêt à faire briller votre projet ?
            </h2>
            <p className="text-[#0B0B0B]/70 mb-8 max-w-2xl mx-auto">
              Découvrez comment Glitter Productions peut transformer votre
              vision en réalité éclatante. Contactez-nous dès aujourd'hui pour
              discuter de vos idées.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-[#0B0B0B] text-white px-8 py-4 rounded-full hover:bg-[#0B0B0B]/80 hover:scale-105 active:scale-95 transition-all duration-200 tracking-wide font-semibold"
            >
              Contactez-nous
            </Link>
          </div>
        </section>
      </div>

      {/* Modal pour les artistes */}
      {selectedArtist && (
        <ArtistModal
          artist={selectedArtist}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Home;
