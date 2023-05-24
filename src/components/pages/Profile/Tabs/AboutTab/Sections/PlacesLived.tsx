import { Box, Stack, useTheme } from '@mui/material';

import BornIn from '@/components/atoms/AccountDetaills/DetailCategories/BornIn';
import LivesIn from '@/components/atoms/AccountDetaills/DetailCategories/LivesIn';
import { SectionRoot, SectionTitle } from '../styles';
import { SectionProps } from '../types';

export default function PlacesLived({ profileData, sx, ...rootProps }: SectionProps) {
  const theme = useTheme();
  return (
    <SectionRoot sx={sx} {...rootProps} spacing={4} mb={2}>
      <Box>
        <SectionTitle>Places lived</SectionTitle>
        <Stack spacing={3}>
          <LivesIn userData={profileData} />
          <BornIn userData={profileData} />
        </Stack>
      </Box>
    </SectionRoot>
  );
}
