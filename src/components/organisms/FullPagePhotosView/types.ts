import { IPost } from '@/types/post';
import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface FullPagePhotosViewProps extends BoxProps {
  post: IPost;
  initialPhoto: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
