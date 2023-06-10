import { BoxProps } from '@mui/material';
import { pictureSize } from '../../types';
import { IPictureWithPlaceholders } from '@/types/picture';

export interface LastPictureProps extends BoxProps {
  picture: IPictureWithPlaceholders;
  postId: string;
  picturesLength: number;
  alt?: string;
  size?: pictureSize;
  quality?: number;
}
