import { IPost } from '@/types/post';
import { BoxProps } from '@mui/material';

export interface ActionButtonsProps extends BoxProps {
  post: IPost;
}
