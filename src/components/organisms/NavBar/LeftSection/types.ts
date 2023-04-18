import { BoxProps } from '@mui/material';

export interface LeftSectionProps extends BoxProps {
  classes?: Partial<LeftSectionClasses>;
}

export interface LeftSectionClasses {
  root: string;
}
