import { Box, ButtonBase, useTheme } from '@mui/material';
import { InteractButtonProps } from './types';

/**
 * @description - A button that only styling is text underline on hover
 */
export default function StyledInteractButton({
  children,
  onClickHandler,
  buttonRef,
  sx,
  ...rootProps
}: InteractButtonProps) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        padding: theme.spacing(0.2, 0.5),
        ...sx,
      }}
      {...rootProps}>
      <ButtonBase
        disableTouchRipple
        focusRipple
        ref={buttonRef}
        onClick={onClickHandler}
        sx={{
          '&:hover': {
            textDecoration: 'underline',
          },
        }}>
        {children}
      </ButtonBase>
    </Box>
  );
}
