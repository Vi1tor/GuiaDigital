import React from 'react';
import { 
  Wifi, MapPin, Coffee, Key, BookOpen, 
  ShoppingBag, Compass, Info, Utensils, 
  Trees, MessageSquareText, LifeBuoy 
} from 'lucide-react';
import { MenuItem, ScreenName } from '../types';

interface IconGridProps {
  onNavigate: (screen: ScreenName) => void;
}

const menuItems: MenuItem[] = [
  { id: '1', label: 'Wi-Fi', iconName: 'Wifi', targetScreen: 'WIFI' },
  { id: '2', label: 'Como Chegar', iconName: 'MapPin', targetScreen: 'DIRECTIONS' },
  { id: '3', label: 'Café da Manhã', iconName: 'Coffee', targetScreen: 'SERVICES' }, 
  { id: '4', label: 'Cardápio', iconName: 'Utensils', targetScreen: 'SERVICES' }, 
  { id: '5', label: 'Minibar', iconName: 'ShoppingBag', targetScreen: 'SERVICES' }, 
  { id: '6', label: 'Passeios', iconName: 'Compass', targetScreen: 'TOURS' }, 
  { id: '7', label: 'Guia da Pousada', iconName: 'Info', targetScreen: 'GUIDE' }, 
  { id: '8', label: 'Gastronomia', iconName: 'Utensils', targetScreen: 'RESTAURANTS' },
  { id: '9', label: 'Spa & Lazer', iconName: 'Trees', targetScreen: 'SERVICES' }, 
  { id: '10', label: 'Toalhas & Lareira', iconName: 'LifeBuoy', targetScreen: 'GUIDE' }, 
  { id: '11', label: 'Recepção', iconName: 'MessageSquareText', externalUrl: 'https://wa.me/5535984687353?text=Ol%C3%A1%2C%20preciso%20de%20ajuda!' },
  { id: '12', label: 'Nossas Regras', iconName: 'BookOpen', targetScreen: 'GUIDE' }, 
];

const IconMap: Record<string, React.ElementType> = {
  Wifi, MapPin, Key, BookOpen, ShoppingBag, Compass, Info, Utensils, Trees, LifeBuoy, MessageSquareText, Coffee
};

export const IconGrid: React.FC<IconGridProps> = ({ onNavigate }) => {
  return (
    <div className="grid grid-cols-3 gap-3 p-6">
      {menuItems.map((item) => {
        const IconComponent = IconMap[item.iconName] || Info;
        const commonClasses = "group flex flex-col items-center justify-center aspect-square bg-white rounded-2xl shadow-sm border border-sand-100 hover:border-sand-400 hover:shadow-card transition-all duration-300 active:scale-[0.98]";
        
        const content = (
          <>
            <div className="text-sand-600 mb-2.5 p-2.5 rounded-xl bg-sand-50/50 group-hover:bg-sand-100 group-hover:text-sand-800 transition-colors duration-300">
                <IconComponent size={20} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] font-sans text-charcoal-800 font-medium tracking-wide text-center px-1 leading-tight uppercase opacity-80 group-hover:opacity-100">
              {item.label}
            </span>
          </>
        );

        if (item.externalUrl) {
          return (
            <a
              key={item.id}
              href={item.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={commonClasses}
            >
              {content}
            </a>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => item.targetScreen && onNavigate(item.targetScreen)}
            className={commonClasses}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
};