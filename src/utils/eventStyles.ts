// Couleurs pour les différents types d'événements
export const eventTypeColors = {
  concert: 'bg-[#8C52FF]/80', // Production - Violet
  show: 'bg-[#FF4D8F]/80',    // Administration - Rose
  private: 'bg-[#FFC74F]/80'  // Prestation - Jaune
} as const;

// Formatage des dates d'événements
export const formatEventDate = (date: string): string => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};