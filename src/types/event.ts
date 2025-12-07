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
