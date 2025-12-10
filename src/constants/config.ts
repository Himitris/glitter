// Configuration globale de l'application
export const APP_CONFIG = {
  name: 'Glitter Production',
  shortName: 'Glitter',
  description: 'Production d\'événements uniques et mémorables',
  url: 'https://glitterprod.com',
  email: 'glitterproductions24@gmail.com',
  social: {
    instagram: 'https://instagram.com/glitter_prod',
    instagramHandle: '@glitter_prod',
  },
  location: 'Située entre les Landes et le Tarn',
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
