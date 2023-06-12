import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { ICreatePostStatus } from '../types';

export interface PhotosInputProps extends BoxProps {
  photos: File[];
  setPhotos: Dispatch<SetStateAction<File[]>>;
  setErrors: Dispatch<SetStateAction<ICreatePostStatus[]>>;
}
