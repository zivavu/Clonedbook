import { TProfileTabs } from '@/components/pages/Profile/types';
import { IUser } from '@/types/user';
import { StackProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface AllFriendsTileProps extends StackProps {
  profileData: IUser;
  limit?: number;
  setSelectedTab?: Dispatch<SetStateAction<TProfileTabs>>;
}

export type TFriendsSections = 'all friends' | 'mutual friends' | 'recently added';

export interface SectionProps extends StackProps {
  profileId: string;
  limit?: number;
}
