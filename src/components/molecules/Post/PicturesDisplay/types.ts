import { BoxProps } from '@mui/material';

export interface PicturesDisplayProps extends BoxProps {
  pictures: string[];
}

export type DisplayMode = 'single' | 'duo' | 'many';
