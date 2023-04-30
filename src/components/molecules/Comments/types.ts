import { IComment } from '@/types/comment';
import { BoxProps } from '@mui/material';

export interface CommentsProps extends BoxProps {
  comments: IComment[] | undefined;
  maxComments?: number | 'all';
  onlyUniqueUsers?: boolean;
}
