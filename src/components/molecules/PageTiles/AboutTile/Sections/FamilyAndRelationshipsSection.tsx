import { Box, Stack, Typography } from '@mui/material';

import AccountDetailCategory from '@/components/atoms/accountDetails/AccountDetailCategory';
import FamilyMember from '@/components/atoms/accountDetails/detailCategories/FamilyMember';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { TKinship } from '@/types/user';
import { SectionRoot, SectionTitle } from '../styles';
import { SectionProps } from '../types';
export default function FamilyAndRelationshipsSection({
  profileData,
  sx,
  ...rootProps
}: SectionProps) {
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const isOwner = loggedUser?.id === profileData.id;

  const partnertId = profileData?.about.relationship?.partnerId;
  const status = profileData?.about.relationship?.status;

  const familyMembers = Object.entries(profileData?.about.relatives || {})
    .map(([key, value]) => {
      return { id: key, kindship: value };
    })
    .sort((a, b) => (a.kindship < b.kindship ? 0 : 1));

  return (
    <SectionRoot sx={sx} {...rootProps} spacing={4} mb={2}>
      <Box>
        <SectionTitle pb={isOwner ? 2 : 1}>Relationship</SectionTitle>
        <Stack spacing={2}>
          {!!partnertId && status && (
            <FamilyMember kinshipType={status as TKinship} relativeId={partnertId} />
          )}
          {!partnertId && (
            <AccountDetailCategory detailType='relationship' userData={profileData} />
          )}
          {!!familyMembers.length && (
            <Typography variant='subtitle1' fontWeight='bold' mt={2}>
              Family
            </Typography>
          )}
          {familyMembers.map((member) => (
            <FamilyMember key={member.id} kinshipType={member.kindship} relativeId={member.id} />
          ))}
        </Stack>
      </Box>
    </SectionRoot>
  );
}
