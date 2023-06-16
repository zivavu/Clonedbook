import { IPost } from '@/types/post';
import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface FullPagePostViewProps extends BoxProps {
  post: IPost;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetchPost: () => Promise<void> | void;
}
