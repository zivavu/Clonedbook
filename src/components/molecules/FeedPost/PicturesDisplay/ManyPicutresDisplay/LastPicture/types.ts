import { BoxProps } from '@mui/material';
import { pictureSize } from '../../types';
import { Layout } from '../types';

export interface LastPictureProps extends BoxProps {
  src: string;
  postId: string;
  picturesLength: number;
  alt?: string;
  size?: pictureSize;
  quality?: number;
}
