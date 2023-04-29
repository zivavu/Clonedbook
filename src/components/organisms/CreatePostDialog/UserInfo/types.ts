import { IUser } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface UserInfoProps extends BoxProps {
  user: IUser;
}
