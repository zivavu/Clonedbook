import { IUser } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface WriteSomethingTileProps extends BoxProps {
  user: IUser;
}
