import { BoxProps } from '@mui/material';

export interface NavbarProps extends BoxProps {
	classes?: Partial<NavbarPropsClasses>;
}

export interface NavbarPropsClasses {
	root: string;
}
