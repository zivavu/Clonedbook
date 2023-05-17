import { IPost } from '@/types/post';
import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface PhotosCarouselProps extends BoxProps {
  picturesUrls: IPost['pictures'];
  currentPictureIndex: number;
  setCurrentPictureIndex: Dispatch<SetStateAction<number>>;
}
