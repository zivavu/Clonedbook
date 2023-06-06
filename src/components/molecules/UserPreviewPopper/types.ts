import { PopperProps, SxProps, Theme } from '@mui/material';

export interface UserPreviewPopperProps extends PopperProps {
  sx?: SxProps<Theme>;
  userId: string;
  handleMouseEnter(): void;
  handleMouseLeave(): void;
}
