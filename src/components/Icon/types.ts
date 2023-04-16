import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export interface IconProps extends FontAwesomeIconProps {
	/**
	 * Override or extend the styles applied to the component.
	 */
	classes?: Partial<IconClasses>;
}

export interface IconClasses {
	/** Styles applied to the root element. */
	root: string;
}
