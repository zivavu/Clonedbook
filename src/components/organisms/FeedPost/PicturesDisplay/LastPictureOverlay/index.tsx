import { Box, Typography, useTheme } from '@mui/material';
import { LastPictureOverlayProps } from './types';

export default function LastPictureOverlay({
  picturesLength,
  sx,
  children,
  ...rootProps
}: LastPictureOverlayProps) {
  const theme = useTheme();
  return (
    <Box sx={{ ...sx, position: 'relative', pointerEvents: 'none' }} {...rootProps}>
      <Box
        sx={{
          position: 'absolute',
          zIndex: '1',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}>
        <Typography
          variant='h4'
          color={theme.palette.common.white}
          sx={{
            position: 'absolute',
            fontWeight: '400',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            userSelect: 'none',
          }}>
          +{picturesLength - 5}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}
