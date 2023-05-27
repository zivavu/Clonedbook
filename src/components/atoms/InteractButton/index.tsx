import { ButtonBase, useTheme } from '@mui/material';
import { InteractButtonProps } from './types';

/**
 * @description - A button that only styling is text underline on hover
 */

export default function InteractButton({
  children,
  onClickHandler,
  buttonRef,
  sx,
  ...rootProps
}: InteractButtonProps) {
  const theme = useTheme();
  return (
    <ButtonBase
      disableTouchRipple
      focusRipple
      ref={buttonRef}
      onClick={onClickHandler}
      sx={{
        padding: theme.spacing(0.2),
        color: theme.palette.text.secondary,
        '&:hover': {
          textDecoration: 'underline',
        },
        ...sx,
      }}
      {...rootProps}>
      {children}
    </ButtonBase>
  );
}
