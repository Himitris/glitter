export const eventFilters = [
  { id: 'all', label: 'Tous' },
  { id: 'concert', label: 'Concerts' },
  { id: 'show', label: 'Spectacles' },
  { id: 'private', label: 'Événements Privés' },
] as const;

export type EventFilterType = typeof eventFilters[number]['id'];

export const filterEvents = <T extends { type: string }>(
  events: T[],
  activeFilter: string
): T[] => {
  return events.filter((event) => 
    activeFilter === 'all' ? true : event.type === activeFilter
  );
};