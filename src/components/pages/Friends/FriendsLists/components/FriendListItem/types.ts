import { ListItemButtonProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface FriendListItemProps extends ListItemButtonProps {
  userId: string;
  setShownProfile: Dispatch<SetStateAction<string | null>>;
  mode: 'friends' | 'requests' | 'suggestions';
}
