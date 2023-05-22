import { BoxProps } from '@mui/material';

export interface UserAvatarProps extends BoxProps {
  userId?: string;
  alt?: string;
  size?: number;
}
