import { Box, Stack, Typography } from '@mui/material';

import AccountAboutItem from '@/components/atoms/AccountAboutItem';
import { IAccountDetail } from '@/components/atoms/AccountAboutItem/types';
import ContentDevider from '@/components/atoms/ContentDevider';
import useGetUsersPublicData from '@/hooks/useGetUsersPublicData';
import { StyledPageTile, StyledPageTileHeader } from '../styles';
import { IntroTileProps } from './types';

export default function IntroTile({ user, sx, ...rootProps }: IntroTileProps) {
  const { about } = user;
  const { relationship, city, college, country, highSchool, hometown, workplace } = about;

  const partner = useGetUsersPublicData(relationship?.partnerId || '');
  const partnerName = `${partner?.firstName} ${partner?.lastName}` || undefined;
  const relationshipLabel = !partner
    ? 'Relationship status'
    : (relationship?.status &&
        relationship?.status?.charAt(0).toUpperCase() + relationship?.status?.slice(1)) ||
      '';

  const relationshipStatus: IAccountDetail = {
    icon: 'heart',
    label: relationshipLabel,
    value: (!partner ? relationship?.status : `with ${partnerName}`) || '',
    valueLink: partner ? `/profile/${partner.id}` : undefined,
  };
  const publicAddres =
    city && country ? `${city}, ${country}` : city || country ? `${city}${country}` : null;
  const school = college || highSchool || null;
  const details: IAccountDetail[] = [
    { label: 'Lives in', value: publicAddres, icon: 'home' },
    { label: 'Works at', value: workplace || null, icon: 'briefcase' },
    { label: 'Goes to', value: school, icon: 'graduation-cap' },
    { label: 'From', value: hometown || null, icon: 'location-dot' },
    relationshipStatus,
  ];

  return (
    <StyledPageTile sx={sx} {...rootProps}>
      <Stack spacing={2}>
        <StyledPageTileHeader>Intro</StyledPageTileHeader>
        <Box position='relative'>
          <Typography textAlign='center' mb={2}>
            {user.about.bio}
          </Typography>
          <ContentDevider bottom={0} />
        </Box>
        <Stack spacing={2}>
          {details.map(({ label, value, icon, valueLink }) => {
            if (!value) return null;
            return (
              <AccountAboutItem
                key={label}
                label={label}
                value={value}
                icon={icon}
                valueLink={valueLink}
                iconSize={20}
              />
            );
          })}
        </Stack>
      </Stack>
    </StyledPageTile>
  );
}
