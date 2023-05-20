import { IPost } from '@/types/post';
import { BoxProps } from '@mui/material';

export interface PostsFeedProps extends BoxProps {
  posts: IPost[];
  isLoading: boolean;
  isError: boolean;
}
