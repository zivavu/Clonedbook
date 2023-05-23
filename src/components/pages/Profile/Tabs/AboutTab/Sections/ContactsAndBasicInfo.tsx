import { Box, Stack, useTheme } from '@mui/material';

import Birthdate from '@/components/atoms/AccountDetaills/DetailCategories/Birthdate';
import Email from '@/components/atoms/AccountDetaills/DetailCategories/Email';
import Gender from '@/components/atoms/AccountDetaills/DetailCategories/Gender';
import Phone from '@/components/atoms/AccountDetaills/DetailCategories/Phone';
import { SectionRoot, SectionTitle } from '../styles';
import { SectionProps } from '../types';

export default function ContactAndBasicInfo({ profileData, sx, ...rootProps }: SectionProps) {
  const theme = useTheme();
  const iconSize = 22;
  return (
    <SectionRoot sx={sx} {...rootProps} spacing={4} mb={2}>
      <Box>
        <SectionTitle>Contact info</SectionTitle>
        <Stack spacing={3}>
          <Email userData={profileData} iconSize={iconSize} />
          <Phone userData={profileData} iconSize={iconSize} />
        </Stack>
      </Box>
      <Box>
        <SectionTitle>Basic info</SectionTitle>
        <Stack spacing={3}>
          <Gender userData={profileData} iconSize={iconSize} />
          <Birthdate userData={profileData} iconSize={iconSize} />
        </Stack>
      </Box>
    </SectionRoot>
  );
}
