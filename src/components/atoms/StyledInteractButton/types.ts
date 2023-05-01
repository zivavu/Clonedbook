import { BoxProps } from '@mui/material';
import { MouseEventHandler, RefObject } from 'react';

export interface InteractButtonProps extends BoxProps {
  onClickHandler?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  buttonRef?: RefObject<HTMLButtonElement>;
}
