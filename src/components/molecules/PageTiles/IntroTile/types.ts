import { IUser } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface IntroTileProps extends BoxProps {
  user: IUser;
}
