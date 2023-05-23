import { IUserBasicInfo } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface UserAvatarProps extends BoxProps {
  src?: string;
  userId?: string;
  alt?: string;
  size?: number;
  useLink?: boolean;
}

export interface UserImageProps {
  user: Omit<IUserBasicInfo, 'id'> | null;
  alt?: string;
}
