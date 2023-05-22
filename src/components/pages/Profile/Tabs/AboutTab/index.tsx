import { Stack, useTheme } from '@mui/material';

import { useState } from 'react';
import { StyledRoot } from './styles';
import { AboutTabProps } from './types';

export default function AboutTab({ loggedUser, profileData, sx, ...rootProps }: AboutTabProps) {
  const theme = useTheme();
  const [currentSection, setCurrentSection] = useState<'overview' | 'work and education'>(
    'overview',
  );
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Stack direction='row' width='100%'>
        <Stack></Stack>
        <Stack></Stack>
      </Stack>
    </StyledRoot>
  );
}
