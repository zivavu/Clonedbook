import * as icons from '@/assets/icons';
import { Shortcut } from './types';

export const sidebarItems: Shortcut[] = [
	{
		key: 'friends',
		icon: icons.Friends,
		href: '/friends',
		active: true,
	},
	{
		key: 'groups',
		icon: icons.Groups,
		href: '/groups',
		active: true,
	},
	{
		key: 'pages',
		icon: icons.Pages,
		href: '/pages',
		active: true,
	},
	{
		key: 'events',
		icon: icons.Events,
		href: '/events',
		active: true,
	},
	{
		key: 'most-recent',
		href: '/marketplace',
		icon: icons.MostRecent,
		active: false,
	},
	{
		key: 'favourites',
		href: '/favourites',
		icon: icons.Favourites,
		active: false,
	},
	{
		key: 'games',
		href: '/games',
		icon: icons.Games,
		active: false,
	},
	{
		key: 'climate-and-science',
		href: '/climate-and-science',
		icon: icons.ClimateAndScience,
		active: false,
	},
	{
		key: 'ad-center',
		href: '/ad-center',
		icon: icons.AdCenter,
		active: false,
	},
	{
		key: 'ads-manager',
		href: '/ads-manager',
		icon: icons.AdsManager,
		active: false,
	},
];
