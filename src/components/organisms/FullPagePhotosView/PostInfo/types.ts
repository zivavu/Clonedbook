import { IPost } from '@/types/post';
import { TReactionType } from '@/types/reaction';
import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface PostInfoProps extends BoxProps {
  post: IPost;
  userReaction: TReactionType | null;
  setUserReaction: Dispatch<SetStateAction<TReactionType | null>>;
}
