import { IUserBasicInfo } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface UserAvatarProps extends BoxProps {
  src?: string;
  alt?: string;
  size?: number;
  userBasicInfo?: IUserBasicInfo;
}
