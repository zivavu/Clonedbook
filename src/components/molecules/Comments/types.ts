import { ICommentMap } from '@/types/comment';
import { IPost } from '@/types/post';
import { BoxProps } from '@mui/material';

export interface CommentsProps extends BoxProps {
  comments: ICommentMap | undefined;
  post: IPost;
  maxComments?: number | 'all';
  onlyUniqueUsers?: boolean;
}
