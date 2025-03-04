// Système de couleurs inspiré de la charte graphique Glitter Production
export const colors = {
  brand: {
    purple: '#8C52FF',  // Violet - Production
    pink: '#FF4D8F',    // Rose - Administration
    orange: '#FF8C60',  // Orange - Management
    yellow: '#FFC74F',  // Jaune - Prestation
  },
  gradient: {
    // Dégradé principal à quatre couleurs (comme dans l'image 1)
    primary: 'from-[#8C52FF] via-[#FF4D8F] via-[#FF8C60] to-[#FFC74F]',
    // Dégradé secondaire à deux couleurs
    secondary: 'from-[#FF4D8F] to-[#FF8C60]',
    // Dégradés spécifiques par activité
    production: 'bg-[#8C52FF]',
    administration: 'bg-[#FF4D8F]',
    management: 'bg-[#FF8C60]',
    prestation: 'bg-[#FFC74F]',
    // Dégradé pour les effets de hover
    hover: 'from-[#8C52FF] via-[#FF4D8F] to-[#FF8C60]',
  },
  background: {
    dark: 'from-gray-900 to-black',
    glass: 'bg-black/80 backdrop-blur-sm',
  },
  text: {
    primary: 'text-white',
    secondary: 'text-gray-300',
    gradient: 'bg-gradient-to-r from-[#8C52FF] via-[#FF4D8F] via-[#FF8C60] to-[#FFC74F] text-transparent bg-clip-text',
  }
} as const;

// Système de typographie
export const typography = {
  heading: {
    h1: 'text-5xl md:text-7xl font-bold tracking-tight uppercase',
    h2: 'text-3xl md:text-4xl font-bold uppercase',
    h3: 'text-2xl font-bold uppercase',
    gradient: 'bg-gradient-to-r from-[#8C52FF] via-[#FF4D8F] via-[#FF8C60] to-[#FFC74F] text-transparent bg-clip-text',
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
    hover: 'hover:border-[#FF4D8F]/30 hover:shadow-lg hover:shadow-[#FF4D8F]/10',
  },
  logo: {
    base: 'font-bold bg-gradient-to-r from-[#8C52FF] via-[#FF4D8F] via-[#FF8C60] to-[#FFC74F] text-transparent bg-clip-text',
  },
  button: {
    base: 'rounded-full font-medium transition-all duration-300 uppercase tracking-wide',
    primary: `
      bg-gradient-to-r from-[#FF4D8F] to-[#FF8C60]
      hover:opacity-90 text-white
      px-6 py-3
    `,
    secondary: `
      bg-gradient-to-r from-[#8C52FF]/10 to-[#FF4D8F]/10
      border border-gray-700
      hover:border-[#FF4D8F]/50 hover:bg-[#FF4D8F]/10
      text-white
      px-6 py-3
    `,
    outline: `
      border border-[#FF4D8F]
      hover:bg-[#FF4D8F]/10
      text-[#FF4D8F]
      px-6 py-3
    `,
  },
  section: {
    base: 'py-20',
    dark: 'bg-gradient-to-br from-black/90 to-[#8C52FF]/20',
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

// Style pour l'affichage des artistes façon charte graphique
export const artistStyles = {
  card: {
    container: 'overflow-hidden rounded-lg relative',
    content: 'grid md:grid-cols-2 bg-gradient-to-r from-[#8C52FF] via-[#FF4D8F] to-[#FF8C60]',
    textContainer: 'p-8 flex flex-col justify-center',
    imageContainer: 'relative aspect-square md:aspect-auto',
    title: 'text-3xl font-bold mb-4 text-white uppercase',
    description: 'text-white/90 uppercase text-sm tracking-wider leading-relaxed',
    socialLinks: 'flex space-x-4 mt-6'
  }
} as const;

// Éléments visuels
export const visualElements = {
  stars: [
    `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0L23.5 16.5L40 20L23.5 23.5L20 40L16.5 23.5L0 20L16.5 16.5L20 0Z" fill="currentColor"/>
    </svg>`,
    `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0L18 12L30 15L18 18L15 30L12 18L0 15L12 12L15 0Z" fill="currentColor"/>
    </svg>`
  ],
  arrows: [
    `<svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 10C0 4.47715 4.47715 0 10 0H30C35.5228 0 40 4.47715 40 10C40 15.5228 35.5228 20 30 20H10C4.47715 20 0 15.5228 0 10Z" fill="currentColor"/>
      <path d="M22 5L27 10L22 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  ]
} as const;