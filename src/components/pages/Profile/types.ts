import { BoxProps } from '@mui/material';

export interface ProfileProps extends BoxProps {
  userId: string;
  useRouting?: boolean;
}

export type TProfileTabs = 'posts' | 'about' | 'friends' | 'photos' | 'likes' | 'music' | null;
