import { IUser } from '@/types/user';
import { StackProps } from '@mui/material';

export interface AllFriendsTileProps extends StackProps {
  profileData: IUser;
}

export type TFriendsSections = 'all friends' | 'mutual friends' | 'recently added';

export interface SectionProps extends StackProps {
  friendsIds: string[];
}
