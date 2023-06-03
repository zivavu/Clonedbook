import { StackProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface FullPagePostPicturesViewProps extends StackProps {
  postId: string;
  initialPhoto: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
