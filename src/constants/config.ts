// Configuration globale de l'application
export const APP_CONFIG = {
  name: 'Glitter Productions',
  shortName: 'Glitter',
  description: 'Faire briller vos projets',
  url: 'https://glitterprod.com',
  email: 'contact@glitterprod.com',
  social: {
    instagram: 'https://instagram.com/glitter_prod',
    instagramHandle: '@glitter_prod',
    linkedin: 'https://www.linkedin.com/company/glitter-productions',
    facebook: 'https://www.facebook.com/glitterproductions',
  },
  location: 'Toulouse',
} as const;

// Couleurs de la charte graphique
export const COLORS = {
  offWhite: '#FFFFF6',
  offBlack: '#0B0B0B',
  violet: '#775CFF',
  rose: '#EBABFF',
  orange: '#FF7A42',
  jaune: '#FFFF73',
} as const;

// Catégories de services
export const SERVICE_CATEGORIES = {
  ADMINISTRATION: 'administration',
  PRODUCTION: 'production',
  MANAGEMENT: 'management',
  PRESTATION: 'prestation',
} as const;

// Types d'événements
export const EVENT_TYPES = {
  CONCERT: 'concert',
  SHOW: 'show',
  PRIVATE: 'private',
} as const;
