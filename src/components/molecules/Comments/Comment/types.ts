import { Comment } from '@/types/comment';
import { BoxProps } from '@mui/material';

export interface CommentProps extends BoxProps {
  comment: Comment;
}
