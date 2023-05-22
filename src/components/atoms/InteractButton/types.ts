import { ButtonBaseProps } from '@mui/material';
import { MouseEventHandler, RefObject } from 'react';

export interface InteractButtonProps extends ButtonBaseProps {
  onClickHandler?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  buttonRef?: RefObject<HTMLButtonElement>;
}
