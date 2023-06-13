import { IAccountPicture } from '@/types/picture';
import { StackProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface FullPageBackgroundPicturesViewProps extends StackProps {
  initialPhoto: IAccountPicture;
  ownerId: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
