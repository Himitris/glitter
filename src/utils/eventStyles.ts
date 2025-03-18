// Couleurs pour les différents types d'événements - Version sombre
export const eventTypeColors = {
  concert: 'bg-[#8C52FF]/80', // Production - Violet
  show: 'bg-[#FF4D8F]/80',    // Administration - Rose
  private: 'bg-[#FFC74F]/80'  // Prestation - Jaune
} as const;

// Couleurs pour les différents types d'événements - Version claire
export const eventTypeColorsLight = {
  concert: 'bg-[#8C52FF]/20 text-[#8C52FF]', // Production - Violet
  show: 'bg-[#FF4D8F]/20 text-[#FF4D8F]',    // Administration - Rose
  private: 'bg-[#FFC74F]/20 text-[#FFC74F]'  // Prestation - Jaune
} as const;