import { IPost } from '@/types/post';
import { IReactionReference } from '@/types/reaction';
import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface ActionButtonsProps extends BoxProps {
  post: IPost;
  userReaction: IReactionReference | null;
  setUserReaction: Dispatch<SetStateAction<IReactionReference | null>>;
}
