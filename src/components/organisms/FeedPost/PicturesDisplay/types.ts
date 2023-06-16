import { IPictureWithPlaceholders } from '@/types/picture';
import { IPost } from '@/types/post';
import { BoxProps } from '@mui/material';

export interface PicturesDisplayProps extends BoxProps {
  pictures: IPictureWithPlaceholders[];
  post: IPost;
  refetchPost: () => Promise<void>;
}

export interface PictureToDisplay {
  url: string;
  blurUrl: string;
  dominantHex: string;
}

export type TDisplayMode = 'single' | 'duo' | 'many';
export type TPictureSize = 'small' | 'medium' | 'large';
