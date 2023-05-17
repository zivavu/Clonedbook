import { TPostOrPicture } from '@/types/misc';
import { TLocalUserReaction } from '@/types/reaction';
import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface PostInfoProps extends BoxProps {
  post: TPostOrPicture;
  userReaction: TLocalUserReaction;
  setUserReaction: Dispatch<SetStateAction<TLocalUserReaction>>;
}
