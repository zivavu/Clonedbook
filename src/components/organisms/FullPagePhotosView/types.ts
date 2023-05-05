import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface FullPagePhotosViewProps extends BoxProps {
  postId: string;
  initialPhoto: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
