import { IFriendsMap } from '@/types/firend';
import { BoxProps, ButtonBaseProps } from '@mui/material';

export interface FriendsButtonProps extends ButtonBaseProps {
  friendsMap: IFriendsMap;
}
