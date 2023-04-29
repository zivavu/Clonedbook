import { IUser } from '@/types/user';
import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface CreatePostDialogProps extends BoxProps {
  user: IUser;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface CreatePostError {
  content: string;
  sevariety: 'error' | 'warning' | 'info' | 'success';
}
