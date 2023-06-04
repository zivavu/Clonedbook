import { TReactionType } from '@/types/reaction';
import { PopperProps, SxProps, Theme } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface ReactionsPopperProps extends PopperProps {
  sx?: SxProps<Theme>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  //eslint-disable-next-line no-unused-vars
  updateDocHandler: (type: TReactionType | null) => void;
  handleMouseOver(): void;
  handleMouseOut(): void;
}
