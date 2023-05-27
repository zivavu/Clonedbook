import { IUserBasicInfo } from '@/types/user';
import { BoxProps } from '@mui/material';

export interface UserAvatarProps extends BoxProps {
  userId?: string;
  alt?: string;
  size?: number;
  useLink?: boolean;
  showBorder?: boolean;
}

export interface UserImageProps {
  user: Omit<IUserBasicInfo, 'id'> | null;
  alt?: string;
}
