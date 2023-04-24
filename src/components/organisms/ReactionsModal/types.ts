import { IReactionReference } from '@/types/reaction';
import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface ReactionsModalProps extends BoxProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  reactionsArr: IReactionReference[];
}