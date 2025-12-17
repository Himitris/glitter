// Routes de l'application
export const ROUTES = {
  // Pages publiques
  HOME: '/',
  ABOUT: '/about',
  ARTISTS: '/artists',
  DJS: '/djs',
  SERVICES: '/services',
  CONTACT: '/contact',
  SUCCESS: '/success',

  // Admin
  ADMIN: '/admin',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_ARTIST_ADD: '/admin/artist/add',
  ADMIN_ARTIST_EDIT: (id: string) => `/admin/artist/edit/${id}`,
  ADMIN_ARTIST_DELETE: (id: string) => `/admin/artist/delete/${id}`,
  ADMIN_DJ_ADD: '/admin/dj/add',
  ADMIN_DJ_EDIT: (id: string) => `/admin/dj/edit/${id}`,
  ADMIN_DJ_DELETE: (id: string) => `/admin/dj/delete/${id}`,
} as const;

// Navigation principale
export const MAIN_NAV_ITEMS = [
  { label: 'Accueil', path: ROUTES.HOME },
  { label: 'À Propos', path: ROUTES.ABOUT },
  { label: 'Artistes', path: ROUTES.ARTISTS },
  { label: 'DJs', path: ROUTES.DJS },
  { label: 'Prestations', path: ROUTES.SERVICES },
  { label: 'Contact', path: ROUTES.CONTACT },
] as const;
