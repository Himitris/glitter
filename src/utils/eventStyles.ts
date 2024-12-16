// Couleurs pour les différents types d'événements
export const eventTypeColors = {
  concert: 'bg-pink-500/80',
  show: 'bg-purple-500/80',
  private: 'bg-orange-500/80'
} as const;

// Formatage des dates d'événements
export const formatEventDate = (date: string): string => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};