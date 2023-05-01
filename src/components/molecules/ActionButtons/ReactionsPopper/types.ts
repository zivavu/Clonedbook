import { IPost } from '@/types/post';
import { IReactionReference } from '@/types/reaction';
import { SxProps, Theme } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface ReactionsPopperProps {
  sx?: SxProps<Theme>;
  post: IPost;
  anchorEl: HTMLElement | null;
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
  mouseOver: boolean;
  setMouseOver: Dispatch<SetStateAction<boolean>>;
  setUserReaction: Dispatch<SetStateAction<IReactionReference | null>>;
}
