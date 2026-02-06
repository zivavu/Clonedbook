import {
  BarChartImage,
  EventsImage,
  FavouritesImage,
  FlagImage,
  FriendsImage,
  GameImage,
  GroupImage,
  MegaphoneImage,
  MemoriesImage,
} from '@/assets/sidebarIcons';
import { Shortcut } from './types';

export const sidebarItems: Shortcut[] = [
  {
    key: 'friends',
    IconImage: FriendsImage,
    href: '/friends',
    active: true,
  },
  {
    key: 'groups',
    IconImage: GroupImage,
    href: '/groups',
    active: false,
  },
  {
    key: 'pages',
    IconImage: FlagImage,
    href: '/pages',
    active: false,
  },
  {
    key: 'news',
    IconImage: MegaphoneImage,
    href: '/news',
    active: false,
  },
  {
    key: 'events',
    IconImage: EventsImage,
    href: '/events',
    active: false,
  },
  {
    key: 'favourites',
    href: '/favourites',
    IconImage: FavouritesImage,
    active: false,
  },
  {
    key: 'games',
    href: '/games',
    IconImage: GameImage,
    active: false,
  },
  {
    key: 'ads-manager',
    href: '/ads-manager',
    IconImage: BarChartImage,
    active: false,
  },
  {
    key: 'memories',
    href: '/memories',
    IconImage: MemoriesImage,
    active: false,
  },
];
