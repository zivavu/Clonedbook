import { Box, Stack, Typography, useTheme } from '@mui/material';

import ContentDevider from '@/components/atoms/ContentDevider';
import Icon from '@/components/atoms/Icon/Icon';
import Link from '@/components/atoms/Link';
import useGetUsersPublicData from '@/hooks/useGetUsersPublicData';
import { StyledPageTile, StyledPageTileHeader } from '../styles';
import { IDetail, IntroTileProps } from './types';

export default function IntroTile({ user, sx, ...rootProps }: IntroTileProps) {
  const theme = useTheme();
  const { about } = user;
  const { relationship, city, college, country, highSchool, hometown, workplace } = about;

  const partner = useGetUsersPublicData(relationship?.partnerId || '');
  const partnerName = `${partner?.firstName} ${partner?.lastName}` || undefined;
  const relationshipLabel = !partner
    ? 'Relationship status'
    : (relationship?.status &&
        relationship?.status?.charAt(0).toUpperCase() + relationship?.status?.slice(1)) ||
      '';
  const relationshipStatus: IDetail = {
    icon: 'heart',
    label: relationshipLabel,
    value: (!partner ? relationship?.status : `with ${partnerName}`) || '',
    valueLink: partner ? `/profile/${partner.id}` : undefined,
  };

  const publicAddres =
    city && country ? `${city}, ${country}` : city || country ? `${city}${country}` : null;
  const school = college || highSchool || null;
  const details: IDetail[] = [
    { label: 'Lives in', value: publicAddres, icon: 'home' },
    { label: 'Works at', value: workplace || null, icon: 'briefcase' },
    { label: 'Goes to', value: school, icon: 'graduation-cap' },
    relationshipStatus,
    { label: 'From', value: hometown || null, icon: 'location-dot' },
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
              <Stack key={label} direction='row' alignItems='center' spacing={0.5}>
                <Icon icon={icon} width='30px' fontSize={20} color={theme.palette.grey['500']} />
                <Typography variant='subtitle2' fontWeight='360' pl={0.5}>
                  {label}
                </Typography>
                {valueLink ? (
                  <Link href={valueLink}>
                    <Typography variant='subtitle2' fontWeight='400'>
                      {value}
                    </Typography>
                  </Link>
                ) : (
                  <Typography variant='subtitle2' fontWeight='400'>
                    {value}
                  </Typography>
                )}
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </StyledPageTile>
  );
}
