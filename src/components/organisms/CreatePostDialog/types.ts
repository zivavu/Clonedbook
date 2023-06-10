import { IUser } from '@/types/user';
import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface CreatePostDialogProps extends BoxProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  refetchPostById: (id: string) => Promise<void>;
}

export interface CreatePostError {
  content: string;
  sevariety: 'error' | 'warning' | 'info' | 'success';
}

export type FormInputs = {
  postText: string;
  photos: File[];
};
