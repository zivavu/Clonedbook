import { IUser } from '@/types/user';
import { StackProps } from '@mui/material';

export interface UserInfoPlaceholderProps extends StackProps {
  userData: IUser;
}
