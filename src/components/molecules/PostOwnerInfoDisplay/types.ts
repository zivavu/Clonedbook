import { TElementType } from '@/types/misc';
import { IAccountPicture } from '@/types/picture';
import { IPost } from '@/types/post';
import { IUserBasicInfo } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface PostOwnerInfoDisplayProps extends BoxProps {
  owner: IUserBasicInfo | null;
  element: IPost | IAccountPicture;
  elementType: TElementType;
  refetchElement: () => Promise<void> | void;
}
