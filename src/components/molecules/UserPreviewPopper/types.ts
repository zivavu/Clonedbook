import { PopperProps, SxProps, Theme } from '@mui/material';

export interface UserPreviewPopperProps extends PopperProps {
  sx?: SxProps<Theme>;
  userId: string;
  handleMouseOver(): void;
  handleMouseOut(): void;
}
