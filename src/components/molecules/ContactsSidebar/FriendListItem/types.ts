import { IFriendWithBasicInfo } from '@/types/firend';
import { BoxProps } from '@mui/material';

export interface FriendListItemProps extends BoxProps {
  friend: IFriendWithBasicInfo;
}
