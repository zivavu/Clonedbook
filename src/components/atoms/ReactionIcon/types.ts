import { BoxProps } from '@mui/material';

export interface ReactionIconProps extends BoxProps {
  src: string;
  alt?: string;
  size?: number;
  zIndex?: number;
  showBorder?: boolean;
}
