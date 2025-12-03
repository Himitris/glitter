// Système de couleurs - Charte graphique Glitter Production 2025
export const colors = {
  // Couleurs primaires
  primary: {
    offWhite: '#FFFFF6',  // Off-White - Fond principal
    offBlack: '#0B0B0B',  // Off-Black - Texte principal
  },
  // Couleurs secondaires
  brand: {
    violet: '#775CFF',   // Violet - Production (RVB: 119/92/255)
    rose: '#EBABFF',     // Rose - Administration (RVB: 235/171/255)
    jaune: '#FFFF73',    // Jaune - Prestation (RVB: 255/255/115)
    orange: '#FF7A42',   // Orange - Management (RVB: 255/122/66)
  },
  // Dégradés
  gradient: {
    // Dégradé Orange → Rose (haut gauche image 3)
    orangeRose: 'from-[#FF7A42] to-[#EBABFF]',
    // Dégradé Violet → Bleu (haut droite image 3)
    violetBleu: 'from-[#775CFF] to-[#5C9FFF]',
    // Dégradé Rose → Orange (bas gauche image 3)
    roseOrange: 'from-[#EBABFF] to-[#FF7A42]',
    // Dégradé Rose → Jaune (bas droite image 3)
    roseJaune: 'from-[#EBABFF] to-[#FFFF73]',
    // Dégradé principal à quatre couleurs
    primary: 'from-[#775CFF] via-[#EBABFF] via-[#FF7A42] to-[#FFFF73]',
    // Dégradés spécifiques par activité
    production: 'from-[#775CFF] to-[#5C9FFF]',
    administration: 'from-[#EBABFF] to-[#FF7A42]',
    management: 'from-[#FF7A42] to-[#EBABFF]',
    prestation: 'from-[#FFFF73] to-[#EBABFF]',
    // Dégradé pour les cartes (version claire)
    card: 'from-[#FFFFF6] to-white',
    // Dégradé light
    light: 'from-white/50 to-[#FFFFF6]/50',
  },
  background: {
    light: 'from-[#FFFFF6] to-white',
    glass: 'bg-[#FFFFF6]/80 backdrop-blur-sm',
    dark: 'bg-[#0B0B0B]',
  },
  text: {
    primary: 'text-[#0B0B0B]',
    secondary: 'text-[#0B0B0B]/70',
    gradient: 'bg-gradient-to-r from-[#775CFF] via-[#EBABFF] via-[#FF7A42] to-[#FFFF73] text-transparent bg-clip-text',
  }
} as const;

// Système de typographie
export const typography = {
  heading: {
    h1: 'text-5xl md:text-7xl font-bold tracking-tight text-[#0B0B0B]',
    h2: 'text-3xl md:text-4xl font-bold text-[#0B0B0B]',
    h3: 'text-2xl font-bold text-[#0B0B0B]',
    gradient: 'bg-gradient-to-r from-[#775CFF] via-[#EBABFF] via-[#FF7A42] to-[#FFFF73] text-transparent bg-clip-text',
  },
  body: {
    base: 'text-[#0B0B0B]/70',
    large: 'text-lg text-[#0B0B0B]/80',
    uppercase: 'uppercase tracking-wider text-sm',
  }
} as const;

// Système de composants
export const components = {
  card: {
    base: `
      bg-[#FFFFF6]
      border-2 rounded-3xl
      backdrop-blur-sm
      transition-all duration-300
      overflow-hidden
    `,
    // Bordures avec dégradés colorés
    borderViolet: 'border-transparent bg-gradient-to-br from-[#775CFF] to-[#EBABFF] p-[2px]',
    borderRose: 'border-transparent bg-gradient-to-br from-[#EBABFF] to-[#FF7A42] p-[2px]',
    borderJaune: 'border-transparent bg-gradient-to-br from-[#FFFF73] to-[#EBABFF] p-[2px]',
    borderOrange: 'border-transparent bg-gradient-to-br from-[#FF7A42] to-[#EBABFF] p-[2px]',
    hover: 'hover:shadow-2xl hover:shadow-[#EBABFF]/20 hover:scale-[1.02]',
  },
  logo: {
    base: 'font-bold bg-gradient-to-r from-[#775CFF] via-[#EBABFF] via-[#FF7A42] to-[#FFFF73] text-transparent bg-clip-text',
  },
  button: {
    base: 'rounded-full font-medium transition-all duration-300 tracking-wide border-2',
    primary: `
      bg-gradient-to-r from-[#EBABFF] to-[#FF7A42]
      hover:opacity-90 text-[#0B0B0B]
      px-8 py-3 border-[#0B0B0B]
    `,
    secondary: `
      bg-[#FFFFF6]
      border-[#0B0B0B]
      hover:bg-gradient-to-r hover:from-[#EBABFF]/10 hover:to-[#FF7A42]/10
      text-[#0B0B0B]
      px-8 py-3
    `,
    outline: `
      border-[#0B0B0B]
      hover:bg-[#0B0B0B] hover:text-[#FFFFF6]
      text-[#0B0B0B]
      px-8 py-3
    `,
  },
  section: {
    base: 'py-20',
    light: 'bg-gradient-to-br from-[#FFFFF6] to-white',
  },
  container: 'container mx-auto px-4',
} as const;

// Effets et animations
export const effects = {
  hover: {
    scale: 'hover:scale-105 transition-transform duration-300',
    glow: 'hover:shadow-2xl hover:shadow-[#EBABFF]/30 transition-shadow duration-300',
  },
  gradient: {
    animate: 'animate-gradient bg-[size:400%_400%]',
  },
  glass: 'backdrop-blur-sm bg-[#FFFFF6]/40',
} as const;

// Style pour l'affichage des artistes façon charte graphique
export const artistStyles = {
  card: {
    container: 'overflow-hidden rounded-3xl relative border-2',
    content: 'grid md:grid-cols-2 bg-gradient-to-r from-[#775CFF] via-[#EBABFF] to-[#FF7A42]',
    textContainer: 'p-8 flex flex-col justify-center',
    imageContainer: 'relative aspect-square md:aspect-auto',
    title: 'text-3xl font-bold mb-4 text-[#0B0B0B]',
    description: 'text-[#0B0B0B]/80 text-sm tracking-wide leading-relaxed',
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