import { Box, Stack } from '@mui/material';

import College from '@/components/atoms/accountDetails/detailCategories/College';
import HighSchool from '@/components/atoms/accountDetails/detailCategories/HighSchool';
import JobTitle from '@/components/atoms/accountDetails/detailCategories/JobTitle';
import WorksAt from '@/components/atoms/accountDetails/detailCategories/WorksAt';
import { SectionRoot, SectionTitle } from '../styles';
import { SectionProps } from '../types';

export default function WorkAndEducationSection({ profileData, sx, ...rootProps }: SectionProps) {
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
