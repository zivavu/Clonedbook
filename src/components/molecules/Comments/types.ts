import { ICommentMap } from '@/types/comment';
import { IAccountPicture } from '@/types/picture';
import { IPost } from '@/types/post';
import { BoxProps } from '@mui/material';

export interface CommentsProps extends BoxProps {
  comments: ICommentMap | undefined;
  post: IPost | IAccountPicture;
  maxComments?: number | 'all';
  onlyUniqueUsers?: boolean;
  mode?: TDisplayMode;
}
export type TDisplayMode = 'post' | 'picture' | 'feed';
