import { BoxProps } from '@mui/material';
import { pictureSize } from '../../types';

export interface LastPictureProps extends BoxProps {
  src: string;
  blurSrc: string;
  postId: string;
  picturesLength: number;
  alt?: string;
  size?: pictureSize;
  quality?: number;
}
