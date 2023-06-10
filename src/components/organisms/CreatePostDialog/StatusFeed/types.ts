import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { CreatePostStatus } from '../types';

export interface ErrorsFeedProps extends BoxProps {
  status: CreatePostStatus[];
  setStatus: Dispatch<SetStateAction<CreatePostStatus[]>>;
}
