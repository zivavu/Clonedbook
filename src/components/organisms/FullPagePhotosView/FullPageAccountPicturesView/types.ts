import { IAccountPicture } from '@/types/picture';
import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface FullPageAccountPicturesViewProps extends BoxProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  initialPhoto: number | IAccountPicture;
  ownerId: string;
}
