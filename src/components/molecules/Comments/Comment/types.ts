import { IComment } from '@/types/comment';
import { IRefetchElementHadler, TElementType } from '@/types/misc';
import { IAccountPicture } from '@/types/picture';
import { IPost } from '@/types/post';
import { BoxProps } from '@mui/material';

export interface CommentProps extends BoxProps {
  comment: IComment;
  refetchElement: IRefetchElementHadler;
  element: IPost | IAccountPicture;
  elementType: TElementType;
}
