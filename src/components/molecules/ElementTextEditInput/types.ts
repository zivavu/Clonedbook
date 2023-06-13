import { TElementType } from '@/types/misc';
import { IAccountPicture } from '@/types/picture';
import { IPost } from '@/types/post';
import { BoxProps } from '@mui/material';

export interface ElementTextEditInputProps extends BoxProps {
  element: IPost | IAccountPicture;
  elementType: TElementType;
  handleCloseEditMode: () => void;
  refetchElement: () => Promise<void> | void;
}
