import { TReactionType } from '@/types/reaction';
import { BoxProps } from '@mui/material';

export interface ReactionIconProps extends BoxProps {
  type?: TReactionType;
  alt?: string;
  size?: number;
  zIndex?: number;
  showBorder?: boolean;
  overlap?: boolean;
}
