import { Box, Stack } from '@mui/material';

import FamilyMember from '@/components/atoms/accountDetails/detailCategories/FamilyMember';
import Relationship from '@/components/atoms/accountDetails/detailCategories/Relationship';
import { useLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { SectionRoot, SectionTitle } from '../styles';
import { SectionProps } from '../types';
export default function FamilyAndRelationshipsSection({
  profileData,
  sx,
  ...rootProps
}: SectionProps) {
  const { data: loggedUser } = useLoggedUserQuery({});
  const isOwner = loggedUser?.id === profileData.id;

  const partnertId = profileData?.about.relationship?.partnerId;
  const status = profileData?.about.relationship?.status;
  const hasPartner =
    !!partnertId && (status === 'in relation' || status === 'married' || status === 'engaged');
  const familyMembers = Object.entries(profileData?.about.relatives || {})
    .map(([key, value]) => {
      return { id: key, kindship: value };
    })
    .sort((a, b) => (a.kindship < b.kindship ? 0 : 1));
  return (
    <SectionRoot sx={sx} {...rootProps} spacing={4} mb={2}>
      <Box>
        <SectionTitle pb={isOwner ? 2 : 1}>Relationship</SectionTitle>
        <Stack spacing={3}>
          {hasPartner ? (
            <FamilyMember kinshipType={status} relativeId={partnertId} />
          ) : (
            <Relationship userData={profileData} />
          )}
        </Stack>
      </Box>
      <Box>
        <SectionTitle>Family Members</SectionTitle>
        <Stack spacing={3}>
          {familyMembers.map((member) => {
            return (
              <FamilyMember key={member.id} kinshipType={member.kindship} relativeId={member.id} />
            );
          })}
        </Stack>
      </Box>
    </SectionRoot>
  );
}
