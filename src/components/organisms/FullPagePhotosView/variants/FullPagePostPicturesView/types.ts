import { StackProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface FullPagePostPicturesViewProps extends StackProps {
  postId: string;
  initialPhotoUrl: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
