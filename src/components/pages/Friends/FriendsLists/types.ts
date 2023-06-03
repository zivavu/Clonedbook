import { StackProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { TFriendsTabs } from '../types';

export interface FriendSidebarListProps extends StackProps {
  setCurrentTab: Dispatch<SetStateAction<TFriendsTabs>>;
  setShownProfile: Dispatch<SetStateAction<string | null>>;
}
