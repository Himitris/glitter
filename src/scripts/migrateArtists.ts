// Script de migration des artistes, DJs et expériences vers Firebase
// À exécuter une seule fois pour peupler la base de données

import { addArtist, addDj } from "../services/artistService";
import { addExperience } from "../services/experienceService";

// Données des artistes à migrer
const artistsData = [
  {
    name: "KIMIA",
    image: ["/images/artists/kimia.webp", "/images/artists/kimia2.webp"],
    description:
      'La collaboration entre Kimia et le producteur Julien "Noko" Decoret mêle leurs univers, leurs deux animalités complémentaires teintées de différentes influences et chargées de poésie au service d\'une musique afro électro, transe.',
    socialLinks: {
      instagram: "https://instagram.com/official_kimia_music",
      spotify:
        "https://open.spotify.com/intl-fr/artist/0pwRlHwZ0MnJOcwQcgJBkl?si=_T6KNJQISMSznKjaDdMCBA",
    },
  },
  {
    name: "ALTESS EGO",
    image: ["/images/artists/altesseego.webp"],
    description:
      "Basses musclées et beats tranchants, textures électriques tressées d'électro et section vocale chatoyante fondent l'ADN d'Altess Ego. On peut y déceler une dualité entre hip-hop railleur et RnB suave, entre sons organiques et ondes électroniques.",
    socialLinks: {
      instagram: "https://instagram.com/altessego",
      spotify:
        "https://open.spotify.com/intl-fr/artist/6stGd2BIhFkQMZElFbDX8Y?si=BCLqOdLaT1apmAIAoTuUAQ",
    },
  },
  {
    name: "KAÎROS",
    image: "/images/artists/kairos.webp",
    description:
      "Le mot « Kaîros » vient du grecque ancien et signifie, le bon moment, le moment opportun. Le projet s'appuie sur des moments chorégraphiques, précis et esthétiques, une rencontre entre le cirque et la danse, plus précisément l'acrobatie, la danse contemporaine et le hip hop.",
    socialLinks: {
      instagram: "https://www.instagram.com/compagnie_fika/",
    },
  },
  {
    name: "MELANIE LESAGE",
    image: "/images/artists/melanie.webp",
    description:
      "Mélanie Lesage vous embarque sur un voilier le long des côtes françaises et vous invite dans l'intimité de sa cabine... Réchauffées par le timbre solaire de Mélanie, les chansons de ce jeune trio sont simples et légères, accompagnées par les notes d'un Rhodes, d'un Lapsteel et d'une Contrebasse. Laissez-vous happer par cet univers poétique et plongez la tête la première dans ce cocon Pop-Folk pour un moment hors du temps ! Vous y croiserez probablement Pomme, First Aid Kit ou Norah Jones.",
    socialLinks: {
      instagram: "https://www.instagram.com/melanielesage.musique/",
      spotify:
        "https://open.spotify.com/intl-fr/artist/0leE4KQwJFxSkCDVrKEyDU?si=t4DQ8MXpRtuh3NVDSrwHNw",
    },
  },
  {
    name: "CIE DEL CARAVAGGIO",
    image: "/images/artists/cie.webp",
    description:
      "« Abel » est le making of d'une pièce de théâtre, où ce qui est joué masque la véritable histoire. La comédienne, la seule à rester, déçue par le rôle attribué et les promesses non tenues, veut abandonner le projet. Le metteur en scène va tout mettre en œuvre pour ne pas la laisser partir. Entre débats et répétitions, il cherche la bonne fin, mais chaque scène est le déclencheur des nouvelles histoires plein des possibilités et problèmes. Seront-ils combien sur scène au salut final ?",
    socialLinks: {
      instagram: "https://www.instagram.com/del_caravaggio/",
    },
  },
  {
    name: "FORRÓ DA LUA",
    image: ["/images/artists/forrodalua.webp", "/images/artists/forrodalua2.webp"],
    description:
      "Forró Da Lua c'est un bal en plein cœur, un hymne à la joie, un hymne à la vie. Au son des voix, de l'accordéon, du saxophone et de la zabumba, laissez-vous danser, semelles au plancher et tête dans les étoiles : le bonheur est juste là... Só alegria !",
    socialLinks: {
      instagram: "https://instagram.com/forro_dalua",
    },
  },
];

// Données des DJs à migrer
const djsData = [
  {
    name: "Bonnie Spacey",
    image: ["/images/djs/bonniespacey.webp"],
    description:
      "La DJ et productrice berlinoise Bonnie Spacey enflamme les dancefloors à travers le monde depuis près d'une décennie. Elle brille tant derrière les platines que dans ses productions, s'étant immergée dans l'univers de la musique électronique dès son plus jeune âge. Fusionnant ces sons avec sa première passion, la guitare, Bonnie propose un mélange audacieux d'indie dance, de techno captivante et de dark disco.\n\nProductrice prolifique, elle a publié des titres sur des labels prestigieux comme Exploited, Phisica, Jeahmon!, et Lumière Noire, entre autres. En 2019, elle a fondé Critical Monday, où elle a sorti le single « Don't » qui a immédiatement rencontré le succès, soutenu par Dixon et Jennifer Cardini. Dédié à la fusion électrisante de la techno et du rock, Critical Monday se consacre définitivement à la musique de club, comme en témoignent les sorties de Curses, Rafael Cerato, Shubostar, Tony Y Not, Günce Aci et Mala Ika.",
    socialLinks: {
      instagram: "https://www.instagram.com/bonnie_spacey/",
      spotify:
        "https://open.spotify.com/intl-fr/artist/255hSkioJ6vRV921Iyw4DA?si=dboN0UevTTCdii39ZqvYZw",
    },
  },
  {
    name: "Dame Fleuraux",
    image: ["/images/djs/damefleuraux.webp"],
    description: "Description de Dame Fleuraux.",
    socialLinks: {
      instagram: "https://www.instagram.com/dame_fleuraux/",
    },
  },
  {
    name: "Elona",
    image: [
      "/images/djs/elona2.webp",
      "/images/djs/elona.webp",
      "/images/djs/elona3.webp",
      "/images/djs/elona4.webp",
    ],
    description:
      "Curatrice, bassiste et productrice, sillonnent entre la house, break et electronica. Elle a notamment eu l'opportunité de mixer auprès de DJ reconnu·es tels que Dee Nasty, pionnier du hip-hop en France, Ian Pooley, figure emblématique de la house allemande, et Alpha Tracks, producteur influent de la scène techno contemporaine. Souhaitant avant tout offrir une expérience mouvementée et transcendante aux percussions entêtantes et frissonnantes, poussant les basses et jouant sur les contre-temps.",
    socialLinks: {},
  },
  {
    name: "Khey Mysterio",
    image: ["/images/djs/kheymysterio.webp"],
    description: "Description de Khey Mysterio.",
    socialLinks: {
      instagram: "https://www.instagram.com/william_khey.mysterio/",
      spotify: "https://soundcloud.com/kheymysterio",
    },
  },
  {
    name: "Marie Prude",
    image: "/images/djs/marieprude.webp",
    description: "Description de Marie Prude.",
    socialLinks: {
      instagram: "https://www.instagram.com/marie_prude_music/",
      spotify: "https://soundcloud.com/marieprude",
    },
  },
];

// Données des expériences à migrer
const experiencesData = [
  {
    title: "Electro Alternativ",
    year: "2023",
    location: "Toulouse",
    description:
      "Festival de musique électronique, avec une programmation axée sur les musiques électroniques alternatives et émergentes.",
    services: ["Régie artistes", "Régie bénévoles"],
    logo: "/images/exp/ea.jpg",
  },
  {
    title: "Electrick Park",
    year: "2023",
    location: "Montpellier",
    description:
      "Festival en plein air réunissant les meilleurs artistes électro du moment dans un cadre naturel exceptionnel.",
    services: [
      "Régie artistes",
      "Direction de production",
      "Gestion des paies",
    ],
    logo: "/images/exp/eepk.jpg",
  },
  {
    title: "Ocean Fest",
    year: "2022",
    location: "Biarritz",
    description:
      "Festival mêlant musique et sensibilisation à l'environnement marin, célébrant la culture surf et la préservation des océans.",
    services: ["Direction de production", "Régie cashless"],
    logo: "/images/exp/ocean-fest.webp",
  },
  {
    title: "Little Festival",
    year: "2022",
    location: "Bordeaux",
    description:
      "Festival à taille humaine proposant une programmation éclectique entre électro, hip-hop et musiques actuelles.",
    services: ["Régie bénévoles", "Planning", "Formation"],
    logo: "/images/exp/little-festival.jpg",
  },
  {
    title: "Regarts",
    year: "2023",
    location: "Toulouse",
    description:
      "Festival pluridisciplinaire mêlant arts visuels, performances et musique dans des lieux insolites de la ville.",
    services: ["Production", "Régie artistes", "Régie bénévoles"],
    logo: "/images/exp/regarts.jpg",
  },
  {
    title: "Bulle de Jazz",
    year: "2022",
    location: "Albi",
    description:
      "Festival de jazz contemporain valorisant les nouvelles expressions de cette musique et ses fusions avec d'autres genres.",
    services: ["Gestion des artistes", "Administration", "Coordination"],
    logo: "/images/exp/bulle-de-jazz.jpg",
  },
  {
    title: "La Cavale",
    year: "2023",
    location: "Montauban",
    description:
      "Événement éclectique et pluridisciplinaire créant un espace de liberté safe qui revendique une vision de la fête libre, pour tous.tes et sans concession.",
    services: ["Production", "Logistique", "Régie site", "Régie artistes"],
    logo: "/images/exp/la-cavale.jpg",
  },
  {
    title: "L'Été de Vaour",
    year: "2022",
    location: "Vaour",
    description:
      "Festival rural dédié aux arts de la rue, au cirque et au théâtre, créant une effervescence artistique en milieu rural.",
    services: ["Administration", "Logistique", "Régie artistes"],
    logo: "/images/exp/ete-de-vaour.png",
  },
  {
    title: "Rio Loco",
    year: "2023",
    location: "Toulouse",
    description:
      "Festival multiculturel explorant chaque année les musiques d'une région du monde différente, favorisant le dialogue interculturel.",
    services: ["Direction technique", "Régie cashless", "Régie artistes"],
    logo: "/images/exp/rio-loco.jpg",
  },
];

// Fonction de migration complète
export const migrateAllData = async () => {
  console.log("🚀 Début de la migration des artistes, DJs et expériences...");

  // Migrer les artistes
  console.log("\n📦 Migration des artistes...");
  for (const artist of artistsData) {
    try {
      const id = await addArtist(artist);
      console.log(`✅ Artiste ajouté: ${artist.name} (ID: ${id})`);
    } catch (error) {
      console.error(`❌ Erreur pour ${artist.name}:`, error);
    }
  }

  // Migrer les DJs
  console.log("\n🎧 Migration des DJs...");
  for (const dj of djsData) {
    try {
      const id = await addDj(dj);
      console.log(`✅ DJ ajouté: ${dj.name} (ID: ${id})`);
    } catch (error) {
      console.error(`❌ Erreur pour ${dj.name}:`, error);
    }
  }

  // Migrer les expériences
  console.log("\n🎪 Migration des expériences...");
  for (const experience of experiencesData) {
    try {
      const id = await addExperience(experience);
      console.log(`✅ Expérience ajoutée: ${experience.title} (ID: ${id})`);
    } catch (error) {
      console.error(`❌ Erreur pour ${experience.title}:`, error);
    }
  }

  console.log("\n🎉 Migration terminée !");
};

// Fonction pour migrer uniquement les expériences
export const migrateExperiences = async () => {
  console.log("🎪 Migration des expériences...");
  for (const experience of experiencesData) {
    try {
      const id = await addExperience(experience);
      console.log(`✅ Expérience ajoutée: ${experience.title} (ID: ${id})`);
    } catch (error) {
      console.error(`❌ Erreur pour ${experience.title}:`, error);
    }
  }
  console.log("\n🎉 Migration des expériences terminée !");
};

// Export des données brutes pour utilisation manuelle si nécessaire
export { artistsData, djsData, experiencesData };
