import { TReactionType } from '@/types/reaction';
import { PopperProps, SxProps, Theme } from '@mui/material';

export interface ReactionsPopperProps extends PopperProps {
  sx?: SxProps<Theme>;
  //eslint-disable-next-line no-unused-vars
  updateDocHandler: (type: TReactionType | null) => void;
  handleMouseOver(): void;
  handleMouseOut(): void;
}
