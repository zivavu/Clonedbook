import { ButtonBase, ButtonBaseProps, useTheme } from '@mui/material';

/**
 * @description - A button that only styling is text underline on hover
 */
export default function StyledInteractButton({ children, sx, onClick }: ButtonBaseProps) {
  const theme = useTheme();
  return (
    <ButtonBase
      disableTouchRipple
      focusRipple
      onClick={onClick}
      sx={{
        padding: theme.spacing(0.2, 0.5),
        '&:hover': {
          textDecoration: 'underline',
        },
        ...sx,
      }}
    >
      {children}
    </ButtonBase>
  );
}
