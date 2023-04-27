import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { BoxProps } from '@mui/material';

export interface IconProps extends FontAwesomeIconProps {
  classes?: Partial<IconClasses>;
}

export interface IconClasses {
  root: string;
}
