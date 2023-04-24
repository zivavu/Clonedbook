import { IReactionReference } from '@/types/reaction';
import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface ReactionsPortalProps extends BoxProps {
  setShowPortal: Dispatch<SetStateAction<boolean>>;
  reactionsArr: IReactionReference[];
}
