import { Box, Stack, useTheme } from '@mui/material';

import College from '@/components/atoms/AccountDetaills/DetailCategories/College';
import HighSchool from '@/components/atoms/AccountDetaills/DetailCategories/HighSchool';
import JobTitle from '@/components/atoms/AccountDetaills/DetailCategories/JobTitle';
import WorksAt from '@/components/atoms/AccountDetaills/DetailCategories/WorksAt';
import { SectionRoot, SectionTitle } from '../styles';
import { SectionProps } from '../types';

export default function WorkAndEducationSection({ profileData, sx, ...rootProps }: SectionProps) {
  const theme = useTheme();
  return (
    <SectionRoot sx={sx} {...rootProps} spacing={4} mb={2}>
      <Box>
        <SectionTitle>Work</SectionTitle>
        <Stack spacing={3}>
          <WorksAt userData={profileData} />
          <JobTitle userData={profileData} />
        </Stack>
      </Box>
      <Box>
        <SectionTitle>Education</SectionTitle>
        <Stack spacing={3}>
          <College userData={profileData} />
          <HighSchool userData={profileData} />
        </Stack>
      </Box>
    </SectionRoot>
  );
}
