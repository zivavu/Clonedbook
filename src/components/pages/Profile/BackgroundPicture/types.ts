import { IUser } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface BackgroundPictureProps extends BoxProps {
  userData: IUser;
  userId: string;
}
