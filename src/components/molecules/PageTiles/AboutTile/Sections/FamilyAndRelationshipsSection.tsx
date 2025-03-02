import { Box, Stack, Typography } from '@mui/material';

import useGetUserBasicInfo from '@/common/misc/userDataManagment/useGetUsersPublicData';
import AccountDetailCategory from '@/components/atoms/accountDetails/AccountDetailCategory';
import FamilyAccountDetail from '@/components/atoms/accountDetails/accountDetailItems/FamillyAccountDetail';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { TKinship, TPartnerStatus } from '@/types/user';
import { SectionRoot, SectionTitle } from '../styles';
import { SectionProps } from '../types';

type FamilyMemberProps = {
  relativeId: string;
  kinshipType: TKinship | TPartnerStatus;
  pictureSize?: number;
};

function FamilyMemberDisplay({ relativeId, kinshipType, pictureSize = 40 }: FamilyMemberProps) {
  const relative = useGetUserBasicInfo(relativeId);
  if (!relative) return null;

  const isPartner =
    kinshipType === 'in relation' || kinshipType === 'engaged' || kinshipType === 'married';
  const kindship = kinshipType[0].toUpperCase() + kinshipType.slice(1);
  const label = isPartner
    ? `${kindship} with ${relative.firstName} ${relative.lastName}`
    : kindship;

  return <FamilyAccountDetail label={label} user={relative} pictureSize={pictureSize} />;
}

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
            <FamilyMemberDisplay kinshipType={status as TKinship} relativeId={partnertId} />
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
            <FamilyMemberDisplay
              key={member.id}
              kinshipType={member.kindship}
              relativeId={member.id}
            />
          ))}
        </Stack>
      </Box>
    </SectionRoot>
  );
}
