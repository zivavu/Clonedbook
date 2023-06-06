import { Box, Stack } from '@mui/material';

import BornIn from '@/components/atoms/accountDetails/detailCategories/BornIn';
import LivesIn from '@/components/atoms/accountDetails/detailCategories/LivesIn';
import { useLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { SectionRoot, SectionTitle } from '../styles';
import { SectionProps } from '../types';

export default function PlacesLived({ profileData, sx, ...rootProps }: SectionProps) {
  const { data: loggedUser } = useLoggedUserQuery({});
  const isOwner = loggedUser?.id === profileData.id;
  return (
    <SectionRoot sx={sx} {...rootProps} spacing={4} mb={2}>
      <Box>
        <SectionTitle pb={isOwner ? 2 : 1}>Places lived</SectionTitle>
        <Stack spacing={3}>
          <LivesIn userData={profileData} />
          <BornIn userData={profileData} />
        </Stack>
      </Box>
    </SectionRoot>
  );
}
