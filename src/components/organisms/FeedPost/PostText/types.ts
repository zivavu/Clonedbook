import { IPost } from '@/types/post';
import { BoxProps } from '@mui/material';

export interface PostTextAreaProps extends BoxProps {
  post: IPost;
  isInEditMode: boolean;
  handleCloseEditMode: () => void;
  refetchPost: () => Promise<void> | void;
}
