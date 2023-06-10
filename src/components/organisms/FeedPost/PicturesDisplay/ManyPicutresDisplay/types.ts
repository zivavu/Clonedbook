import { IPictureWithPlaceholders } from '@/types/picture';
import { Theme } from '@emotion/react';
import { BoxProps, SxProps } from '@mui/material';

export interface ManyPicutresDisplayProps extends BoxProps {
  pictures: IPictureWithPlaceholders[];
  pictureBorder: string;
  postId: string;
}

export interface Layouts {
  [key: string]: Layout;
}

export type Layout = SxProps<Theme>[];
