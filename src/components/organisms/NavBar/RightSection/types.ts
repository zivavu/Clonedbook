import { BoxProps, PopperProps } from '@mui/material';

export interface RightSectionProps extends BoxProps {
  classes?: Partial<RightSectionClasses>;
}

export interface RightSectionClasses {
  root: string;
}

export type TTopbarPoper = 'chats' | 'notifications' | 'account' | 'none';

export interface TopbarPopperProps extends PopperProps {}
