import { IBasicUserInfo, IUser } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface CreatePostProps extends BoxProps {
  user: IUser;
}
