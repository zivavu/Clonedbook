import { IFriendsMap } from '@/types/firend';
import { ButtonBaseProps } from '@mui/material';

export interface FriendsButtonProps extends ButtonBaseProps {
  friendsMap: IFriendsMap;
}
