export interface Experience {
  id: string;
  title: string;
  year?: string; // Optionnel - peut être vide
  location?: string; // Optionnel
  description?: string; // Optionnel
  services: string[];
  logo?: string; // Optionnel
  website?: string; // Lien vers le site internet
}
