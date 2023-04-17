import { BoxProps } from '@mui/material';

export interface ShortcutsSidebarProps extends BoxProps {}

export interface Shortcut {
	key: string;
	icon?: string;
	href: string;
	active: boolean;
}
