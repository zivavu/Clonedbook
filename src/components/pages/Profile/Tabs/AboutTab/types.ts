import { IUser } from '@/types/user';
import { StackProps } from '@mui/material';

export interface AboutTabProps extends StackProps {
  loggedUser: IUser | undefined;
  profileData: IUser;
}
