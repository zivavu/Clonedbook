import { ButtonBaseProps } from '@mui/material';

export interface MessageButtonProps extends ButtonBaseProps {
  userId: string;
  showIcon?: boolean;
}
