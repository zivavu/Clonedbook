import { BoxProps } from '@mui/material';

export interface ProfileProps extends BoxProps {
  userId: string;
}

export type TProfileTabs = 'posts' | 'about' | 'friends' | 'photos' | 'likes' | 'music';
