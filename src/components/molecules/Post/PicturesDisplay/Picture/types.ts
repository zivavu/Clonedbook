import { BoxProps } from '@mui/material';
import { pictureSize } from '../types';

export interface PictureProps extends BoxProps {
  src: string;
  alt?: string;
  size?: pictureSize;
  quality?: number;
}
