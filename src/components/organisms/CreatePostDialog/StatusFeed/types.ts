import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { ICreatePostStatus } from '../types';

export interface ErrorsFeedProps extends BoxProps {
  status: ICreatePostStatus[];
  setStatus: Dispatch<SetStateAction<ICreatePostStatus[]>>;
}
