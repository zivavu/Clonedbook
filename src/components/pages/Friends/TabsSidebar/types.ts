import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { TFriendsTabs } from '../types';

export interface TabSelectListProps extends BoxProps {
  currentTab: TFriendsTabs;
  setCurrentTab: Dispatch<SetStateAction<TFriendsTabs>>;
}
