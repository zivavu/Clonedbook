import { IUser } from '@/types/user';
import { StackProps } from '@mui/material';

export interface PostsTabProps extends StackProps {
  userId: string;
  loggedUser: IUser | undefined;
  profileData: IUser;
}
