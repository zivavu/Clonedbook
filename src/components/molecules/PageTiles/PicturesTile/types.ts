import { IUser } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface PicturesTileProps extends BoxProps {
  user: IUser;
}
