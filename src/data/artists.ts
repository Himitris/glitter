import { Artist } from '../types';

export const artistServices = [
  {
    title: "Administration et Gestion",
    icon: "FileText",
    description: "",
    features: [
      "Édition des contrats de cession et des factures",
      "Gestion de la paie des artistes et techniciens",
      "Accompagnement à l'intermittence",
      "Gestion des droits d'auteur"
    ],
    color: "administration"
  },
  {
    title: "Production Musicale",
    icon: "Music",
    description: "",
    features: [
      "Accompagnement artistique",
      "Coordination technique",
      "Production d'albums",
      "Stratégie de sortie"
    ],
    color: "production"
  },
  {
    title: "Production de Tournée",
    icon: "Calendar",
    description: "",
    features: [
      "Élaboration des budgets de tournée",
      "Gestion de la logistique (transport, hébergement)",
      "Organisation des résidences",
      "Recherche de financements"
    ],
    color: "prestation"
  },
  {
    title: "Management Artistique",
    icon: "Users",
    description: "",
    features: [
      "Gestion de l'image",
      "Relations publiques",
      "Coordination des tournées",
      "Développement stratégique"
    ],
    color: "management"
  }
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
      "Gestion des droits d'auteur"
    ],
    color: "administration"
  },
  {
    title: "Production Musicale",
    icon: "Music",
    description: "",
    features: [
      "Accompagnement artistique",
      "Coordination technique",
      "Production d'albums",
      "Stratégie de sortie"
    ],
    color: "production"
  },
  {
    title: "Management Artistique",
    icon: "Users",
    description: "",
    features: [
      "Gestion de l'image",
      "Relations publiques",
      "Coordination des tournées",
      "Développement stratégique"
    ],
    color: "management"
  }
];

export const artists: Artist[] = [
  {
    id: "kimia",
    name: "Kimia",
    image: "/images/artists/kimia.png",
    description: "La collaboration entre Kimia et le producteur Julien \"Noko\" Decoret mêle leurs univers, leurs deux animalités complémentaires teintées de différentes influences et chargées de poésie au service d'une musique afro électro, transe.",
    socialLinks: {
      instagram: "https://instagram.com/official_kimia_music",
      spotify: "https://open.spotify.com/artist"
    }
  },
  {
    id: "altesse-ego",
    name: "Altesse Ego",
    image: "/images/artists/altesseego.png",
    description: "Basses musclées et beats tranchants, textures électriques tressées d'électro et section vocale chatoyante fondent l'ADN d'Altesse Ego. On peut y déceler une dualité entre hip-hop railleur et RnB suave, entre sons organiques et ondes électroniques.",
    socialLinks: {
      instagram: "https://instagram.com/altessego",
      spotify: "https://open.spotify.com/artist"
    }
  },
  {
    id: "kairos",
    name: "Kaîros",
    image: "/images/artists/kairos.png",
    description: "Le mot « Kaîros » vient du grecque ancien et signifie, le bon moment, le moment opportun. Le projet s'appuie sur des moments chorégraphiques, précis et esthétiques, une rencontre entre le cirque et la danse, plus précisément l'acrobatie, la danse contemporaine et le hip hop.",
    socialLinks: {
      instagram: "https://instagram.com/altessego",
      spotify: "https://open.spotify.com/artist"
    }
  },
  {
    id: "melanie",
    name: "MELANIE LESAGE",
    image: "/images/artists/melanie.jpg",
    description: "Mélanie Lesage vous embarque sur un voilier le long des côtes françaises et vous invite dans l’intimité de sa cabine... Réchauffées par le timbre solaire de Mélanie, les chansons de ce jeune trio sont simples et légères, accompagnées par les notes d’un Rhodes, d’un Lapsteel et d’une Contrebasse. Laissez-vous happer par cet univers poétique et plongez la tête la première dans ce cocon Pop-Folk pour un moment hors du temps ! Vous y croiserez probablement Pomme, First Aid Kit ou Norah Jones.",
    socialLinks: {
      instagram: "https://instagram.com/forro_dalua",
      spotify: "https://open.spotify.com/artist"
    }
  },
  {
    id: "cie-del-caravaggio",
    name: "CIE DEL CARAVAGGIO",
    image: "/images/artists/cie.jpg",
    description: "« Abel » est le making of d'une pièce de théâtre, où ce qui est joué masque la véritable histoire. La comédienne, la seule à rester, déçue par le rôle attribué et les promesses non tenues, veut abandonner le projet. Le metteur en scène va tout mettre en œuvre pour ne pas la laisser partir. Entre débats et répétitions, il cherche la bonne fin, mais chaque scène est le déclencheur des nouvelles histoires plein des possibilités et problèmes. Seront-ils combien sur scène au salut final ?",
    socialLinks: {
      instagram: "https://instagram.com/forro_dalua",
      spotify: "https://open.spotify.com/artist"
    }
  },
  {
    id: "forro-da-lua",
    name: "Forró Da Lua",
    image: "/images/artists/forrodalua.png",
    description: "Forró Da Lua c'est un bal en plein cœur, un hymne à la joie, un hymne à la vie. Au son des voix, de l'accordéon, du saxophone et de la zabumba, laissez-vous danser, semelles au plancher et tête dans les étoiles : le bonheur est juste là... Só alegria !",
    socialLinks: {
      instagram: "https://instagram.com/forro_dalua",
      spotify: "https://open.spotify.com/artist"
    }
  },
];

export const dj: Artist[] = [
  {
    id: "bonnie-spacey",
    name: "Bonnie Spacey",
    image: "/images/artists/bonniespacey.png",
    description: "Description de Bonnie Spacey.",
    socialLinks: {
      instagram: "https://instagram.com/bonnie_spacey",
      spotify: "https://open.spotify.com/artist"
    }
  },
  {
    id: "dame-fleuraux",
    name: "Dame Fleuraux",
    image: "/images/artists/damefleuraux.png",
    description: "Description de Dame Fleuraux.",
    socialLinks: {
      instagram: "https://instagram.com/dame_fleuraux",
      spotify: "https://open.spotify.com/artist"
    }
  },
  {
    id: "elona",
    name: "Elona",
    image: "/images/artists/elona.png",
    description: "Description d'Elona.",
    socialLinks: {
      instagram: "https://instagram.com/elona_dj",
      spotify: "https://open.spotify.com/artist"
    }
  },
  {
    id: "khey-mysterio",
    name: "Khey Mysterio",
    image: "/images/artists/kheymysterio.png",
    description: "Description de Khey Mysterio.",
    socialLinks: {
      instagram: "https://instagram.com/khey_mysterio",
      spotify: "https://open.spotify.com/artist"
    }
  },
  {
    id: "marie-prude",
    name: "Marie Prude",
    image: "/images/artists/marieprude.png",
    description: "Description de Marie Prude.",
    socialLinks: {
      instagram: "https://instagram.com/marie_prude",
      spotify: "https://open.spotify.com/artist"
    }
  }
];
