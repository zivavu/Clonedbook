import { BoxProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { TProfileTabs } from '../types';

export interface ProfileTabToggleGroupProps extends BoxProps {
  selectedTab: TProfileTabs;
  setSelectedTab: Dispatch<SetStateAction<TProfileTabs>>;
}
