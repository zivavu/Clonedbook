import { IPost } from '@/types/post';
import { BoxProps, StackProps } from '@mui/material';

export interface PostActionsProps extends StackProps {
  post: IPost;
  handleShowMoreComments(): void;
  refetchPost(): void;
  handleCommentInputFocus(): void;
}
