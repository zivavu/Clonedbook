import { BoxProps } from '@mui/material';

export interface PicturesDisplayProps extends BoxProps {
  pictures: string[];
}

export interface PictureToDisplay {
  src: string;
}

export type DisplayMode = 'single' | 'duo' | 'many';
export type pictureSize = 'small' | 'medium' | 'large';
