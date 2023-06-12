import { IPictureWithPlaceholders } from '@/types/picture';
import { BoxProps } from '@mui/material';
import { TPictureSize } from '../../types';

export interface LastPictureProps extends BoxProps {
  picture: IPictureWithPlaceholders;
  postId: string;
  picturesLength: number;
  alt?: string;
  quality?: number;
}
