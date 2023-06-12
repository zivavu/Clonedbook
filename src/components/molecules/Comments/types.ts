import { TElementType } from '@/types/misc';
import { IAccountPicture } from '@/types/picture';
import { IPost } from '@/types/post';
import { StackProps } from '@mui/material';

export interface CommentsProps extends StackProps {
  elementType: TElementType;
  element: IPost | IAccountPicture;
  refetchElement: () => Promise<void> | void;
  commentInputRef: React.RefObject<HTMLTextAreaElement | null>;
  maxComments?: number | 'all';
  onlyUniqueUsers?: boolean;
  displayMode?: TDisplayMode;
  useAutoScroll?: boolean;
}
export type TDisplayMode = 'post' | 'picture' | 'feed';
