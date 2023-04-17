import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export interface IconProps extends FontAwesomeIconProps {
	classes?: Partial<IconClasses>;
}

export interface IconClasses {
	root: string;
}
