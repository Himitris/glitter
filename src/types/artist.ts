export interface Artist {
  id: string;
  name: string;
  image: string | string[];
  description: string;
  displayOrder?: number;
  socialLinks: {
    spotify?: string;
    instagram?: string;
    website?: string;
  };
}
