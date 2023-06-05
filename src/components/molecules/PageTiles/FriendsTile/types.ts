import { IUser } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface FriendsTileProps extends BoxProps {
  user: IUser;
  friendsLimit?: number;
}
