import { IUser } from '@/types/user';
import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface CreatePostDialogProps extends BoxProps {
  user: IUser;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
