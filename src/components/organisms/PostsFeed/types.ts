import { IPost } from '@/types/post';
import { BoxProps, StackProps } from '@mui/material';

export interface PostsFeedProps extends StackProps {
  posts: IPost[];
  isLoading: boolean;
  isError: boolean;
  refetchPost: (id: string) => Promise<void>;
}
