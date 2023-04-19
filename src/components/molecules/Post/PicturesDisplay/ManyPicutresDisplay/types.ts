import { BoxProps } from '@mui/material';
import { PictureToDisplay } from '../types';

export interface ManyPicutresDisplayProps extends BoxProps {
  pictures: PictureToDisplay[];
}

export interface Layouts {
  [key: string]: Layout;
}

export type Layout = {
  width: string;
  height: string;
}[];
