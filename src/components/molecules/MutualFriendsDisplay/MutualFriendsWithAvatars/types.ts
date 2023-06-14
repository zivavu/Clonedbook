import { BoxProps } from '@mui/material';

export interface MutualFriendsWithAvatarsProps extends BoxProps {
  userId: string;
  avatarsToShow: number;
  size?: 'small' | 'medium';
}
