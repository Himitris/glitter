export interface Artist {
  id: string;
  name: string;
  image: string | string[];
  description: string;
  socialLinks: {
    spotify?: string;
    instagram?: string;
    website?: string;
  };
}
