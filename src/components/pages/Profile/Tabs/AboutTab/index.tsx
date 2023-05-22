import { Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';
import { AboutTabProps } from './types';

export default function AboutTab({ loggedUser, profileData, sx, ...rootProps }: AboutTabProps) {
  const theme = useTheme();
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Stack>
        <Typography variant='h5' fontWeight={620}>
          About
        </Typography>
      </Stack>
    </StyledRoot>
  );
}
