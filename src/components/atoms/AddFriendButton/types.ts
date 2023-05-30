import { ButtonBaseProps } from '@mui/material';

export interface AddFriendButtonProps extends ButtonBaseProps {
  friendId: string;
  showIcon?: boolean;
}
