import { BoxProps } from '@mui/material';

export interface PictureProps extends BoxProps {
  src: string;
  alt?: string;
}
