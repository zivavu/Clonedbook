import { TReactionType } from '@/types/reaction';
import { PopperProps, SxProps, Theme } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface ReactionsPopperProps extends PopperProps {
  sx?: SxProps<Theme>;
  updateDocHandler: (type: TReactionType | null) => void;
  anchorEl: HTMLElement | HTMLButtonElement | HTMLDivElement | null;
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
  mouseOver: boolean;
  setMouseOver: Dispatch<SetStateAction<boolean>>;
  setUserReaction: Dispatch<SetStateAction<TReactionType | null>>;
}
