import { IPictureWithPlaceholders } from '@/types/picture';
import { BoxProps } from '@mui/material';
import { pictureSize } from '../types';

export interface PictureProps extends BoxProps {
  picture: IPictureWithPlaceholders;
  postId: string;
  alt?: string;
  size?: pictureSize;
  quality?: number;
}
