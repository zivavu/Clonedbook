import { IComment } from '@/types/comment';
import { IPost } from '@/types/post';
import { BoxProps } from '@mui/material';

export interface CommentProps extends BoxProps {
  comment: IComment;
  post: IPost;
}
