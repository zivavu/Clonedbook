import { Box, Stack } from '@mui/material';

import AccountDetailCategory from '@/components/atoms/accountDetails/AccountDetailCategory';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { SectionRoot, SectionTitle } from '../styles';
import { SectionProps } from '../types';

export default function WorkAndEducationSection({ profileData, sx, ...rootProps }: SectionProps) {
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const isOwner = loggedUser?.id === profileData.id;

  return (
    <SectionRoot sx={sx} {...rootProps} spacing={4} mb={2}>
      <Box>
        <SectionTitle pb={isOwner ? 2 : 1}>Work</SectionTitle>
        <Stack spacing={3}>
          <AccountDetailCategory detailType='worksAt' userData={profileData} />
          <AccountDetailCategory detailType='jobTitle' userData={profileData} />
        </Stack>
      </Box>
      <Box>
        <SectionTitle pb={isOwner ? 2 : 1}>Education</SectionTitle>
        <Stack spacing={3}>
          <AccountDetailCategory detailType='college' userData={profileData} />
          <AccountDetailCategory detailType='highSchool' userData={profileData} />
        </Stack>
      </Box>
    </SectionRoot>
  );
}
