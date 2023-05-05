import { IPost } from '@/types/post';
import { IReactionReference, TLocalUserReaction, TReactionType } from '@/types/reaction';
import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface ActionButtonsProps extends BoxProps {
  post: IPost;
  userReaction: TLocalUserReaction;
  setUserReaction: Dispatch<SetStateAction<TLocalUserReaction>>;
}
