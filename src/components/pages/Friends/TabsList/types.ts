import { BoxProps, ListProps } from '@mui/material';
import { TFriendsTabs } from '../types';
import { Dispatch, SetStateAction } from 'react';

export interface TabsListProps extends ListProps {
  currentTab: TFriendsTabs;
  setCurrentTab: Dispatch<SetStateAction<TFriendsTabs>>;
}
