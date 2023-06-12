import { ButtonBaseProps } from '@mui/material';

export interface LoginAsUserButtonProps extends ButtonBaseProps {
  userId: string;
  showIcon?: boolean;
}
