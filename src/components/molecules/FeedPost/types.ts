import { IPost } from '@/types/post';
import { BoxProps } from '@mui/material';

export interface FeedPostProps extends BoxProps {
  post: IPost;
}
