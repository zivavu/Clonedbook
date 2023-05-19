import { TPostOrPicture } from '@/types/misc';
import { TLocalUserReaction } from '@/types/reaction';
import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface ActionButtonsProps extends BoxProps {
  elementId: string;
  ownerId: string;
  userReaction: TLocalUserReaction;
  setUserReaction: Dispatch<SetStateAction<TLocalUserReaction>>;
  type: TPostOrPicture;
}
