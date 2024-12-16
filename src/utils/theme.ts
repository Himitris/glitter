// Système de couleurs inspiré de la charte graphique Glitter Production
export const colors = {
  brand: {
    purple: '#9333EA',  // Violet profond
    pink: '#EC4899',    // Rose vif
    orange: '#F97316',  // Orange chaud
  },
  gradient: {
    // Dégradé principal à trois couleurs (comme dans les visuels)
    primary: 'from-purple-600 via-pink-500 to-orange-500',
    // Dégradé secondaire à deux couleurs
    secondary: 'from-pink-500 to-orange-500',
    // Dégradé pour les effets de hover
    hover: 'from-purple-500 via-pink-400 to-orange-400',
    // Dégradé pour les arrière-plans sombres
    dark: 'from-purple-900/50 to-pink-900/50',
    // Dégradé pour les cards
    card: 'from-gray-900/95 to-black/95',
  },
  background: {
    dark: 'from-gray-900 to-black',
    glass: 'bg-black/80 backdrop-blur-sm',
  },
  text: {
    primary: 'text-white',
    secondary: 'text-gray-300',
    gradient: 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-transparent bg-clip-text',
  }
} as const;

// Système de typographie
export const typography = {
  heading: {
    h1: 'text-5xl md:text-7xl font-bold tracking-tight uppercase',
    h2: 'text-3xl md:text-4xl font-bold uppercase',
    h3: 'text-2xl font-bold uppercase',
    gradient: 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-transparent bg-clip-text',
  },
  body: {
    base: 'text-gray-300',
    large: 'text-lg text-gray-200',
  }
} as const;

// Système de composants
export const components = {
  card: {
    base: `
      bg-gradient-to-br from-gray-900/95 to-black/95
      border border-gray-800 rounded-2xl
      backdrop-blur-sm
      hover:border-gray-700 transition-all
      overflow-hidden
    `,
    hover: 'hover:border-pink-500/30 hover:shadow-lg hover:shadow-pink-500/10',
  },
  button: {
    base: 'rounded-full font-medium transition-all duration-300 uppercase tracking-wide',
    primary: `
      bg-gradient-to-r from-pink-500 to-orange-500
      hover:opacity-90 text-white
      px-6 py-3
    `,
    secondary: `
      bg-gradient-to-r from-purple-600/10 to-pink-500/10
      border border-gray-700
      hover:border-pink-500/50 hover:bg-pink-500/10
      text-white
      px-6 py-3
    `,
    outline: `
      border border-pink-500
      hover:bg-pink-500/10
      text-pink-500
      px-6 py-3
    `,
  },
  section: {
    base: 'py-20',
    dark: 'bg-gradient-to-br from-black/90 to-purple-900/20',
  },
  container: 'container mx-auto px-4',
} as const;

// Effets et animations
export const effects = {
  hover: {
    scale: 'hover:scale-105 transition-transform duration-300',
    glow: 'hover:shadow-lg hover:shadow-pink-500/20 transition-shadow duration-300',
  },
  gradient: {
    animate: 'animate-gradient bg-[size:400%_400%]',
  },
  glass: 'backdrop-blur-sm bg-black/40',
} as const;