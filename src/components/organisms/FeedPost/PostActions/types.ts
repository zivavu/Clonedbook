import { IPost } from '@/types/post';
import { BoxProps } from '@mui/material';

export interface PostActionsProps extends BoxProps {
  post: IPost;
  handleShowMoreComments(): void;
  refetchPost(): void;
  handleCommentInputFocus(): void;
}
