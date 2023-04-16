import { BoxProps } from '@mui/material';

export interface NavBarProps extends BoxProps {
	classes?: Partial<NavBarClasses>;
}

export interface NavBarClasses {
	root: string;
}
