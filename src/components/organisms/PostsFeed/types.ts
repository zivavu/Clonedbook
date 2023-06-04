import { IPost } from '@/types/post';
import { StackProps } from '@mui/material';

export interface PostsFeedProps extends StackProps {
  posts: IPost[];
  isLoading: boolean;
  isError: boolean;
  //eslint-disable-next-line no-unused-vars
  refetchPostById: (id: string) => Promise<void>;
}
