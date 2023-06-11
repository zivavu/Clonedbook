import { BoxProps, PopperProps } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface RightSectionProps extends BoxProps {
  classes?: Partial<RightSectionClasses>;
}

export interface RightSectionClasses {
  root: string;
}

export type TTopbarPoper = 'chats' | 'notifications' | 'account' | 'none';
