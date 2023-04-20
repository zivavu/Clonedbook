import { IPost } from '@/types/post';
import { BoxProps } from '@mui/material';

export interface PostProps extends BoxProps {
  post: IPost;
}
