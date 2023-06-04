import { ButtonBaseProps } from '@mui/material';
import { RefObject } from 'react';

export interface InteractButtonProps extends ButtonBaseProps {
  buttonRef?: RefObject<HTMLButtonElement>;
}
