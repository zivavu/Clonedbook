import { IUser } from '@/types/user';
import { StackProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { TProfileTabs } from '../../types';

export interface AboutTabProps extends StackProps {
  profileData: IUser;
  setSelectedTab: Dispatch<SetStateAction<TProfileTabs>>;
}
