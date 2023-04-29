import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { CreatePostError } from './../types';

export interface ErrorsFeedProps extends BoxProps {
  errors: CreatePostError[];
  setErrors: Dispatch<SetStateAction<CreatePostError[]>>;
}
