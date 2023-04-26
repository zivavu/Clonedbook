import { ICreatedAt } from '@/types/createdAt';
import { IBasicUserInfo } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface PostOwnerInfoDisplayProps extends BoxProps {
  owner: IBasicUserInfo;
  createdAt: ICreatedAt;
}
