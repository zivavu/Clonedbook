import { IPictureWithPlaceholders } from '@/types/picture';
import { BoxProps } from '@mui/material';

export interface PicturesDisplayProps extends BoxProps {
  pictures: IPictureWithPlaceholders[];
  postId: string;
}

export interface PictureToDisplay {
  url: string;
  blurUrl: string;
  dominantHex: string;
}

export type TDisplayMode = 'single' | 'duo' | 'many';
export type TPictureSize = 'small' | 'medium' | 'large';
