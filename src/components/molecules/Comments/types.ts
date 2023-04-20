import { Comment } from '@/types/comment';
import { BasicUserInfo } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface CommentsProps extends BoxProps {
  comments: Comment[] | undefined;
  user: BasicUserInfo;
}
