export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  description: string;
  type: 'concert' | 'show' | 'private';
  ticketLink?: string;
}

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