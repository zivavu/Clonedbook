import { Box, Stack, Typography, useTheme } from '@mui/material';

import ContentDevider from '@/components/atoms/ContentDevider';
import Icon from '@/components/atoms/Icon/Icon';
import { StyledPageTile, StyledPageTileHeader } from '../styles';
import { IDetail, IntroTileProps } from './types';

export default function IntroTile({ user, sx, ...rootProps }: IntroTileProps) {
  const theme = useTheme();
  const { about } = user;
  const { relationship, city, college, country, highSchool, hometown, workplace } = about;

  const publicAddres =
    city && country ? `${city}, ${country}` : city || country ? `${city}${country}` : null;
  const school = college || highSchool || null;
  const details: IDetail[] = [
    { label: 'Lives in', value: publicAddres, icon: 'home' },
    { label: 'Works at', value: workplace || null, icon: 'briefcase' },
    { label: 'Goes to', value: school, icon: 'graduation-cap' },
    { label: 'Relationship status', value: relationship || null, icon: 'heart' },
    { label: 'From', value: hometown || null, icon: 'location-dot' },
  ];

  return (
    <StyledPageTile sx={sx} {...rootProps}>
      <Stack spacing={2}>
        <StyledPageTileHeader>Intro</StyledPageTileHeader>
        <Box position='relative'>
          <Typography textAlign='center' mb={2}>
            {user.biography}
          </Typography>
          <ContentDevider bottom={0} />
        </Box>
        <Stack spacing={2}>
          {details.map(({ label, value, icon }) => {
            if (!value) return null;
            return (
              <Stack key={label} direction='row' alignItems='center' spacing={0.5}>
                <Icon icon={icon} width='30px' fontSize={20} color={theme.palette.grey['500']} />
                <Typography variant='subtitle2' fontWeight='360' pl={0.5}>
                  {label}
                </Typography>
                <Typography variant='subtitle2' fontWeight='400'>
                  {value}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </StyledPageTile>
  );
}
