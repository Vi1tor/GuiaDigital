export type ScreenName = 'WELCOME' | 'MENU' | 'RESTAURANTS' | 'DIRECTIONS' | 'WIFI' | 'GUIDE' | 'SERVICES' | 'TOURS';

export interface Restaurant {
  name: string;
  description: string;
  cuisine: string;
  priceRange: string;
}

export interface MenuItem {
  id: string;
  label: string;
  iconName: string; // We will map string to Lucide icon component
  targetScreen?: ScreenName;
  externalUrl?: string;
}
