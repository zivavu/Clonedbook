import { BoxProps, ButtonBase, ButtonBaseProps, useTheme } from '@mui/material';

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
