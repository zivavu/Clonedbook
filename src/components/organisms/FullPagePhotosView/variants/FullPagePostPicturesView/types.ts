import { IPost } from '@/types/post';
import { StackProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface FullPagePostPicturesViewProps extends StackProps {
  post: IPost;
  refetchPost: () => Promise<void>;
  initialPhotoUrl: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
