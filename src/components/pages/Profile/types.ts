import { StackProps } from '@mui/material';

export interface ProfileProps extends StackProps {
  userId: string;
  useTabsRouting?: boolean;
}

export type TProfileTabs = 'posts' | 'about' | 'friends' | 'photos' | 'likes' | 'music' | null;
