import { IUser } from '@/types/user';
import { StackProps } from '@mui/material';

export interface FriendsTabProps extends StackProps {
  profileData: IUser;
}
