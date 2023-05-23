import { TElementTypes, TPostOrPictureObj } from '@/types/misc';
import { TLocalUserReaction } from '@/types/reaction';
import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface ElementInfoProps extends BoxProps {
  element: TPostOrPictureObj;
  userReaction: TLocalUserReaction;
  setUserReaction: Dispatch<SetStateAction<TLocalUserReaction>>;
  type: TElementTypes;
}
