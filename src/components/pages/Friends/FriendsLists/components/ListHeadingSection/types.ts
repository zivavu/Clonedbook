import { StackProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { TFriendsTabs } from '../../../types';

export interface ListHeadingSectionProps extends StackProps {
  heading: string;
  setCurrentTab: Dispatch<SetStateAction<TFriendsTabs>>;
}
