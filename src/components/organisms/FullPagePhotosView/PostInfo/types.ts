import { IPost } from '@/types/post';
import { TLocalUserReaction } from '@/types/reaction';
import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface PostInfoProps extends BoxProps {
  post: IPost;
  userReaction: TLocalUserReaction;
  setUserReaction: Dispatch<SetStateAction<TLocalUserReaction>>;
}
