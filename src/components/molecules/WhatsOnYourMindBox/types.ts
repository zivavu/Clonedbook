import { IBasicUserInfo, IUser } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface WhatsOnYourMindBoxProps extends BoxProps {
  user: IUser;
}
