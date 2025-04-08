import { Artist } from "../types";

export const artistServices = [
  {
    title: "Administration et Gestion",
    icon: "FileText",
    description: "",
    features: [
      "Édition des contrats de cession et des factures",
      "Gestion de la paie des artistes et techniciens",
      "Accompagnement à l'intermittence",
      "Gestion des droits d'auteur",
    ],
    color: "administration",
  },
  {
    title: "Production Musicale",
    icon: "Music",
    description: "",
    features: [
      "Accompagnement artistique",
      "Coordination technique",
      "Production d'albums",
      "Stratégie de sortie",
    ],
    color: "production",
  },
  {
    title: "Production de Tournée",
    icon: "Calendar",
    description: "",
    features: [
      "Élaboration des budgets de tournée",
      "Gestion de la logistique (transport, hébergement)",
      "Organisation des résidences",
      "Recherche de financements",
    ],
    color: "prestation",
  },
  {
    title: "Management Artistique",
    icon: "Users",
    description: "",
    features: [
      "Gestion de l'image",
      "Relations publiques",
      "Coordination des tournées",
      "Développement stratégique",
    ],
    color: "management",
  },
];

export const djServices = [
  {
    title: "Administration et Gestion",
    icon: "FileText",
    description: "",
    features: [
      "Édition des contrats de cession et des factures",
      "Gestion de la paie des artistes et techniciens",
      "Accompagnement à l'intermittence",
      "Gestion des droits d'auteur",
    ],
    color: "administration",
  },
  {
    title: "Production Musicale",
    icon: "Music",
    description: "",
    features: [
      "Accompagnement artistique",
      "Coordination technique",
      "Production d'albums",
      "Stratégie de sortie",
    ],
    color: "production",
  },
  {
    title: "Management Artistique",
    icon: "Users",
    description: "",
    features: [
      "Gestion de l'image",
      "Relations publiques",
      "Coordination des tournées",
      "Développement stratégique",
    ],
    color: "management",
  },
];

export const artists: Artist[] = [
  {
    id: "kimia",
    name: "KIMIA",
    image: [
      "/images/artists/kimia.png",
      "/images/artists/kimia2.jpg"
    ],
    description:
      'La collaboration entre Kimia et le producteur Julien "Noko" Decoret mêle leurs univers, leurs deux animalités complémentaires teintées de différentes influences et chargées de poésie au service d\'une musique afro électro, transe.',
    socialLinks: {
      instagram: "https://instagram.com/official_kimia_music",
      spotify:
        "https://open.spotify.com/intl-fr/artist/0pwRlHwZ0MnJOcwQcgJBkl?si=_T6KNJQISMSznKjaDdMCBA",
    },
  },
  {
    id: "altess-ego",
    name: "ALTESS EGO",
    image: [
      "/images/artists/altesseego.png",
    ],
    description:
      "Basses musclées et beats tranchants, textures électriques tressées d'électro et section vocale chatoyante fondent l'ADN d'Altess Ego. On peut y déceler une dualité entre hip-hop railleur et RnB suave, entre sons organiques et ondes électroniques.",
    socialLinks: {
      instagram: "https://instagram.com/altessego",
      spotify:
        "https://open.spotify.com/intl-fr/artist/6stGd2BIhFkQMZElFbDX8Y?si=BCLqOdLaT1apmAIAoTuUAQ",
    },
  },
  {
    id: "kairos",
    name: "KAÎROS",
    image: "/images/artists/kairos.png",
    description:
      "Le mot « Kaîros » vient du grecque ancien et signifie, le bon moment, le moment opportun. Le projet s'appuie sur des moments chorégraphiques, précis et esthétiques, une rencontre entre le cirque et la danse, plus précisément l'acrobatie, la danse contemporaine et le hip hop.",
    socialLinks: {
      instagram: "https://www.instagram.com/compagnie_fika/",
    },
  },
  {
    id: "melanie",
    name: "MELANIE LESAGE",
    image: "/images/artists/melanie.jpg",
    description:
      "Mélanie Lesage vous embarque sur un voilier le long des côtes françaises et vous invite dans l'intimité de sa cabine... Réchauffées par le timbre solaire de Mélanie, les chansons de ce jeune trio sont simples et légères, accompagnées par les notes d'un Rhodes, d'un Lapsteel et d'une Contrebasse. Laissez-vous happer par cet univers poétique et plongez la tête la première dans ce cocon Pop-Folk pour un moment hors du temps ! Vous y croiserez probablement Pomme, First Aid Kit ou Norah Jones.",
    socialLinks: {
      instagram: "https://www.instagram.com/melanielesage.musique/",
      spotify:
        "https://open.spotify.com/intl-fr/artist/0leE4KQwJFxSkCDVrKEyDU?si=t4DQ8MXpRtuh3NVDSrwHNw",
    },
  },
  {
    id: "cie-del-caravaggio",
    name: "CIE DEL CARAVAGGIO",
    image: "/images/artists/cie.jpg",
    description:
      "« Abel » est le making of d'une pièce de théâtre, où ce qui est joué masque la véritable histoire. La comédienne, la seule à rester, déçue par le rôle attribué et les promesses non tenues, veut abandonner le projet. Le metteur en scène va tout mettre en œuvre pour ne pas la laisser partir. Entre débats et répétitions, il cherche la bonne fin, mais chaque scène est le déclencheur des nouvelles histoires plein des possibilités et problèmes. Seront-ils combien sur scène au salut final ?",
    socialLinks: {
      instagram: "https://www.instagram.com/del_caravaggio/",
    },
  },
  {
    id: "forro-da-lua",
    name: "FORRÓ DA LUA",
    image: [
      "/images/artists/forrodalua.jpg",
      "/images/artists/forrodalua2.png",
    ],
    description:
      "Forró Da Lua c'est un bal en plein cœur, un hymne à la joie, un hymne à la vie. Au son des voix, de l'accordéon, du saxophone et de la zabumba, laissez-vous danser, semelles au plancher et tête dans les étoiles : le bonheur est juste là... Só alegria !",
    socialLinks: {
      instagram: "https://instagram.com/forro_dalua",
    },
  },
];

export const dj: Artist[] = [
  {
    id: "bonnie-spacey",
    name: "Bonnie Spacey",
    image: [
      "/images/artists/bonniespacey.jpg",
    ],
    description:
      "La DJ et productrice berlinoise Bonnie Spacey enflamme les dancefloors à travers le monde depuis près d'une décennie. Elle brille tant derrière les platines que dans ses productions, s'étant immergée dans l'univers de la musique électronique dès son plus jeune âge. Fusionnant ces sons avec sa première passion, la guitare, Bonnie propose un mélange audacieux d'indie dance, de techno captivante et de dark disco.\n\nProductrice prolifique, elle a publié des titres sur des labels prestigieux comme Exploited, Phisica, Jeahmon!, et Lumière Noire, entre autres. En 2019, elle a fondé Critical Monday, où elle a sorti le single « Don't » qui a immédiatement rencontré le succès, soutenu par Dixon et Jennifer Cardini. Dédié à la fusion électrisante de la techno et du rock, Critical Monday se consacre définitivement à la musique de club, comme en témoignent les sorties de Curses, Rafael Cerato, Shubostar, Tony Y Not, Günce Aci et Mala Ika.",
    socialLinks: {
      instagram: "https://instagram.com/bonnie_spacey",
      spotify: "https://open.spotify.com/artist/",
      website: "https://criticalmonday.com",
    },
  },
  {
    id: "dame-fleuraux",
    name: "Dame Fleuraux",
    image: [
      "/images/artists/damefleuraux.jpg",
    ],
    description: "Description de Dame Fleuraux.",
    socialLinks: {
      instagram: "https://instagram.com/dame_fleuraux",
      spotify: "https://open.spotify.com/artist",
    },
  },
  {
    id: "elona",
    name: "Elona",
    image: [
      "/images/artists/elona.png",
      "/images/artists/elona2.jpg",
      "/images/artists/elona3.png",
      "/images/artists/elona4.png",
    ],
    description:
      "Curatrice, bassiste et productrice, sillonnent entre la house, break et electronica. Elle a notamment eu l'opportunité de mixer auprès de DJ reconnu·es tels que Dee Nasty, pionnier du hip-hop en France, Ian Pooley, figure emblématique de la house allemande, et Alpha Tracks, producteur influent de la scène techno contemporaine. Souhaitant avant tout offrir une expérience mouvementée et transcendante aux percussions entêtantes et frissonnantes, poussant les basses et jouant sur les contre-temps.",
    socialLinks: {
      instagram: "https://instagram.com/elona_dj",
      spotify: "https://open.spotify.com/artist",
    },
  },
  {
    id: "khey-mysterio",
    name: "Khey Mysterio",
    image: [
      "/images/artists/kheymysterio.jpg"
    ],
    description: "Description de Khey Mysterio.",
    socialLinks: {
      instagram: "https://instagram.com/khey_mysterio",
      spotify: "https://open.spotify.com/artist",
    },
  },
  {
    id: "marie-prude",
    name: "Marie Prude",
    image: "/images/artists/marieprude.png",
    description: "Description de Marie Prude.",
    socialLinks: {
      instagram: "https://instagram.com/marie_prude",
      spotify: "https://open.spotify.com/artist",
    },
  },
];
