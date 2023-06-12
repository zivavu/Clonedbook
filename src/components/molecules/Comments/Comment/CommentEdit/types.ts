import { IComment } from '@/types/comment';
import { IRefetchElementHadler, TElementType } from '@/types/misc';
import { IAccountPicture } from '@/types/picture';
import { IPost } from '@/types/post';
import { OutlinedInputProps } from '@mui/material';

export interface CommentEditProps extends OutlinedInputProps {
  element: IPost | IAccountPicture;
  elementType: TElementType;
  refetchElement: IRefetchElementHadler;
  comment: IComment;
  handleCloseEditMode: () => void;
}
