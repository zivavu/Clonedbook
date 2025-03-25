import { Box, Stack, Typography } from '@mui/material';

import AccountDetailCategory from '@/components/atoms/accountDetails/AccountDetailCategory';
import HorizontalContentDevider from '@/components/atoms/contentDeviders/HorizontalContentDevider';
import { StyledPageTile, StyledPageTileHeader } from '../styles';
import { IntroTileProps } from './types';

export default function IntroTile({ user, sx, ...rootProps }: IntroTileProps) {
  const iconSize = 20;
  if (!user) return null;
  return (
    <StyledPageTile sx={sx} {...rootProps}>
      <Stack spacing={2}>
        <StyledPageTileHeader>Intro</StyledPageTileHeader>
        <Box position='relative'>
          <Typography textAlign='center' mb={2}>
            {user?.about?.bio}
          </Typography>
          <HorizontalContentDevider bottom={0} />
        </Box>
        <Stack spacing={2}>
          <AccountDetailCategory
            detailType='livesIn'
            userData={user}
            iconSize={iconSize}
            showPlaceholder={false}
            preventEdit
          />
          <AccountDetailCategory
            detailType='worksAt'
            userData={user}
            iconSize={iconSize}
            showPlaceholder={false}
            preventEdit
          />
          <AccountDetailCategory
            detailType='goesTo'
            userData={user}
            iconSize={iconSize}
            showPlaceholder={false}
            preventEdit
          />
          <AccountDetailCategory
            detailType='relationship'
            userData={user}
            iconSize={iconSize}
            showPlaceholder={false}
            preventEdit
          />
          <AccountDetailCategory
            detailType='bornin'
            userData={user}
            iconSize={iconSize}
            showPlaceholder={false}
            preventEdit
          />
        </Stack>
      </Stack>
    </StyledPageTile>
  );
}
