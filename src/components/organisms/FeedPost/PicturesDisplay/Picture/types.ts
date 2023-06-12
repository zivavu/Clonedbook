import { IPictureWithPlaceholders } from '@/types/picture';
import { BoxProps } from '@mui/material';
import { TPictureSize } from '../types';

export interface PictureProps extends BoxProps {
  picture: IPictureWithPlaceholders;
  postId: string;
  size: TPictureSize;
}
