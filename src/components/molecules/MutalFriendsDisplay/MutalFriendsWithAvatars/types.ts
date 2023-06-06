import { BoxProps } from '@mui/material';

export interface MutalFriendsWithAvatarsProps extends BoxProps {
  userId: string;
  avatarsToShow: number;
  size?: 'small' | 'medium';
}
