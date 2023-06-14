import { BoxProps } from '@mui/material';

export interface MutualFriendsTextOnlyProps extends BoxProps {
  userId: string;
  size?: 'small' | 'medium';
  friendsToInclude?: number;
}
