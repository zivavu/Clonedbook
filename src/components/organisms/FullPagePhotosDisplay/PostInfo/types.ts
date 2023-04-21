import { IPost } from '@/types/post';
import { BoxProps } from '@mui/material';

export interface PostInfoProps extends BoxProps {
  post: IPost;
}
