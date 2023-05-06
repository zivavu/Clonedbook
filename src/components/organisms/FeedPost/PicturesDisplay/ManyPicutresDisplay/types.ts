import { Theme } from '@emotion/react';
import { BoxProps, SxProps } from '@mui/material';
import { PictureToDisplay } from '../types';

export interface ManyPicutresDisplayProps extends BoxProps {
  pictures: PictureToDisplay[];
  pictureBorder: string;
  postId: string;
}

export interface Layouts {
  [key: string]: Layout;
}

export type Layout = SxProps<Theme>[];
