import { IComment } from '@/types/comment';
import { IRefetchElementHadler, TElementType } from '@/types/misc';
import { IAccountPicture } from '@/types/picture';
import { IPost } from '@/types/post';
import { IUserBasicInfo } from '@/types/user';
import { StackProps } from '@mui/material';

export interface CommentDisplayProps extends StackProps {
  element: IPost | IAccountPicture;
  elementType: TElementType;
  refetchElement: IRefetchElementHadler;
  comment: IComment;
  commentOwner: IUserBasicInfo;
  handleOpenEditMode: () => void;
}
