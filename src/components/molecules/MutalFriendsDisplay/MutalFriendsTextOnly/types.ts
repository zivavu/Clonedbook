import { BoxProps } from '@mui/material';

export interface MutalFriendsTextOnlyProps extends BoxProps {
  userId: string;
  size?: 'small' | 'medium';
  friendsToInclude?: number;
}
