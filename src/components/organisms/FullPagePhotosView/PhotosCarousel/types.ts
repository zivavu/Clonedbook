import { IPictureWithPlaceholders } from '@/types/picture';
import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface PhotosCarouselProps extends BoxProps {
  pictures: IPictureWithPlaceholders[];
  currentPictureIndex: number;
  setCurrentPictureIndex: Dispatch<SetStateAction<number>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
