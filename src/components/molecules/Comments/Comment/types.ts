import { IComment } from '@/types/comment';
import { IAccountPicture } from '@/types/picture';
import { IPost } from '@/types/post';
import { BoxProps } from '@mui/material';

export interface CommentProps extends BoxProps {
  comment: IComment;
  post: IPost | IAccountPicture;
}
