import { IPost } from '@/types/post';
import { IReactionReference, TReactionType } from '@/types/reaction';
import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface ActionButtonsProps extends BoxProps {
  post: IPost;
  userReaction: TReactionType | null;
  setUserReaction: Dispatch<SetStateAction<TReactionType | null>>;
}
