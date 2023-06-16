import { TElementType } from '@/types/misc';
import { IAccountPicture } from '@/types/picture';
import { IPost } from '@/types/post';
import { IUserBasicInfo } from '@/types/user';
import { BoxProps, StackProps } from '@mui/material';

export interface PostOwnerInfoDisplayProps extends StackProps {
  owner: IUserBasicInfo | null;
  element: IPost | IAccountPicture;
  elementType: TElementType;
  handleOpenEditMode: () => void;
  refetchElement: () => Promise<void> | void;
}
