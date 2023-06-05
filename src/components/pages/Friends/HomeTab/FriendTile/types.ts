import { StackProps } from '@mui/material';

export interface FriendTileProps extends StackProps {
  userId: string;
  allowRemove?: boolean;
}
