import { Box, Stack } from '@mui/material';

import Birthdate from '@/components/atoms/accountDetails/detailCategories/Birthdate';
import Email from '@/components/atoms/accountDetails/detailCategories/Email';
import Gender from '@/components/atoms/accountDetails/detailCategories/Gender';
import Phone from '@/components/atoms/accountDetails/detailCategories/Phone';
import { SectionRoot, SectionTitle } from '../styles';
import { SectionProps } from '../types';

export default function ContactAndBasicInfo({ profileData, sx, ...rootProps }: SectionProps) {
  return (
    <SectionRoot sx={sx} {...rootProps} spacing={4} mb={2}>
      <Box>
        <SectionTitle>Contact info</SectionTitle>
        <Stack spacing={3}>
          <Email userData={profileData} />
          <Phone userData={profileData} />
        </Stack>
      </Box>
      <Box>
        <SectionTitle>Basic info</SectionTitle>
        <Stack spacing={3}>
          <Gender userData={profileData} />
          <Birthdate userData={profileData} />
        </Stack>
      </Box>
    </SectionRoot>
  );
}
