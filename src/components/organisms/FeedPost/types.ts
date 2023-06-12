import { IPost } from '@/types/post';
import { BoxProps } from '@mui/material';
import { RefObject } from 'react';

export interface FeedPostProps extends BoxProps {
  post: IPost;
  refetchPost: () => Promise<void>;
}
