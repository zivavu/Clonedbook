import * as icons from '@/assets/pageIcons';
import { Shortcut } from './types';

export const sidebarItems: Shortcut[] = [
  {
    key: 'friends',
    icon: icons.FriendsIcon,
    href: '/friends',
    active: true,
  },
  {
    key: 'groups',
    icon: icons.GroupsIcon,
    href: '/groups',
    active: false,
  },
  {
    key: 'pages',
    icon: icons.PagesIcon,
    href: '/pages',
    active: false,
  },
  {
    key: 'events',
    icon: icons.EventsIcon,
    href: '/events',
    active: false,
  },
  {
    key: 'most-recent',
    href: '/marketplace',
    icon: icons.MostRecentIcon,
    active: false,
  },
  {
    key: 'favourites',
    href: '/favourites',
    icon: icons.FavouritesIcon,
    active: false,
  },
  {
    key: 'games',
    href: '/games',
    icon: icons.GamesIcon,
    active: false,
  },
  {
    key: 'climate-and-science',
    href: '/climate-and-science',
    icon: icons.ClimateAndScienceIcon,
    active: false,
  },
  {
    key: 'ad-center',
    href: '/ad-center',
    icon: icons.AdCenterIcon,
    active: false,
  },
  {
    key: 'ads-manager',
    href: '/ads-manager',
    icon: icons.AdsManagerIcon,
    active: false,
  },
];
