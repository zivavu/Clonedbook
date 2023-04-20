import { IPost } from '@/types/post';
import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface FullPagePhotosDisplayProps extends BoxProps {
  post: IPost;
  photo: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
