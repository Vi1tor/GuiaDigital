import React from 'react';
import { motion } from 'framer-motion';
import {
  Wifi, MapPin, Coffee, Key, BookOpen,
  ShoppingBag, Compass, Info, Utensils,
  Trees, MessageSquareText, LifeBuoy,
} from 'lucide-react';
import { MenuItem, ScreenName } from '../types';

interface IconGridProps {
  onNavigate: (screen: ScreenName) => void;
}

interface MenuItemExtended extends MenuItem {
  accent?: string;
  iconBg?: string;
  iconColor?: string;
}

const menuItems: MenuItemExtended[] = [
  {
    id: '1', label: 'Wi-Fi', iconName: 'Wifi', targetScreen: 'WIFI',
    iconBg: 'bg-blue-50', iconColor: 'text-blue-500',
  },
  {
    id: '2', label: 'Como Chegar', iconName: 'MapPin', targetScreen: 'DIRECTIONS',
    iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600',
  },
  {
    id: '3', label: 'Café da Manhã', iconName: 'Coffee', targetScreen: 'SERVICES',
    iconBg: 'bg-amber-50', iconColor: 'text-amber-600',
  },
  {
    id: '4', label: 'Cardápio', iconName: 'Utensils', targetScreen: 'SERVICES',
    iconBg: 'bg-rose-50', iconColor: 'text-rose-500',
  },
  {
    id: '5', label: 'Minibar', iconName: 'ShoppingBag', targetScreen: 'SERVICES',
    iconBg: 'bg-violet-50', iconColor: 'text-violet-500',
  },
  {
    id: '6', label: 'Passeios', iconName: 'Compass', targetScreen: 'TOURS',
    iconBg: 'bg-teal-50', iconColor: 'text-teal-600',
  },
  {
    id: '7', label: 'Guia', iconName: 'Info', targetScreen: 'GUIDE',
    iconBg: 'bg-sand-100', iconColor: 'text-sand-600',
  },
  {
    id: '8', label: 'Gastronomia', iconName: 'Utensils', targetScreen: 'RESTAURANTS',
    iconBg: 'bg-orange-50', iconColor: 'text-orange-500',
  },
  {
    id: '9', label: 'Spa & Lazer', iconName: 'Trees', targetScreen: 'SERVICES',
    iconBg: 'bg-lime-50', iconColor: 'text-lime-600',
  },
  {
    id: '10', label: 'Lareira', iconName: 'LifeBuoy', targetScreen: 'GUIDE',
    iconBg: 'bg-red-50', iconColor: 'text-red-400',
  },
  {
    id: '11', label: 'Recepção', iconName: 'MessageSquareText',
    externalUrl: 'https://wa.me/5535984691082?text=Ol%C3%A1%2C%20preciso%20de%20ajuda!',
    iconBg: 'bg-green-50', iconColor: 'text-green-500',
  },
  {
    id: '12', label: 'Regras', iconName: 'BookOpen', targetScreen: 'GUIDE',
    iconBg: 'bg-slate-50', iconColor: 'text-slate-500',
  },
];

const IconMap: Record<string, React.ElementType> = {
  Wifi, MapPin, Key, BookOpen, ShoppingBag, Compass,
  Info, Utensils, Trees, LifeBuoy, MessageSquareText, Coffee,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.048,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] as const },
  },
};

interface GridItemProps {
  item: MenuItemExtended;
  onNavigate: (screen: ScreenName) => void;
}

const GridItem: React.FC<GridItemProps> = ({ item, onNavigate }) => {
  const IconComponent = IconMap[item.iconName] || Info;
  const iconBg = item.iconBg ?? 'bg-sand-50';
  const iconColor = item.iconColor ?? 'text-sand-600';

  const baseClass =
    'w-full flex flex-col items-center justify-center gap-2.5 py-4 px-2 ' +
    'bg-white rounded-2xl border border-sand-100/80 select-none cursor-pointer';

  const inner = (
    <>
      <motion.div
        className={`${iconBg} ${iconColor} p-2.5 rounded-xl`}
        whileHover={{ scale: 1.15 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <IconComponent size={18} strokeWidth={1.6} />
      </motion.div>
      <span className="text-[10px] font-medium text-charcoal-800/75 tracking-wide text-center leading-tight w-full px-0.5 truncate">
        {item.label}
      </span>
    </>
  );

  if (item.externalUrl) {
    return (
      <motion.a
        variants={itemVariants}
        href={item.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        whileHover={{ scale: 1.04, boxShadow: '0 6px 20px -4px rgba(0,0,0,0.09)', borderColor: 'rgb(210,205,195)' }}
        whileTap={{ scale: 0.93 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      variants={itemVariants}
      onClick={() => item.targetScreen && onNavigate(item.targetScreen)}
      className={baseClass}
      whileHover={{ scale: 1.04, boxShadow: '0 6px 20px -4px rgba(0,0,0,0.09)', borderColor: 'rgb(210,205,195)' }}
      whileTap={{ scale: 0.93 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {inner}
    </motion.button>
  );
};

export const IconGrid: React.FC<IconGridProps> = ({ onNavigate }) => {
  return (
    <motion.div
      className="grid grid-cols-3 gap-2.5 px-5 pt-5 pb-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {menuItems.map((item) => (
        <GridItem key={item.id} item={item} onNavigate={onNavigate} />
      ))}
    </motion.div>
  );
};
