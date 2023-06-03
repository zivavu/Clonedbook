import { ICommentMap } from '@/types/comment';
import { TElementTypes } from '@/types/misc';
import { IAccountPicture } from '@/types/picture';
import { IPost } from '@/types/post';
import { BoxProps } from '@mui/material';

export interface CommentsProps extends BoxProps {
  comments: ICommentMap | undefined;
  post: IPost | IAccountPicture;
  elementType: TElementTypes;
  maxComments?: number | 'all';
  onlyUniqueUsers?: boolean;
  displayMode?: TDisplayMode;
}
export type TDisplayMode = 'post' | 'picture' | 'feed';
