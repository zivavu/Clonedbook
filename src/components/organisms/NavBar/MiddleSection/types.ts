import { BoxProps } from '@mui/material';

export interface MiddleSectionProps extends BoxProps {
  classes?: Partial<MiddleSectionClasses>;
}

export interface MiddleSectionClasses {
  root: string;
}
