import { Box, Stack, Typography } from '@mui/material';

import From from '@/components/atoms/AccountDetaills/DetailCategories/From';
import GoesTo from '@/components/atoms/AccountDetaills/DetailCategories/GoesTo';
import LivesIn from '@/components/atoms/AccountDetaills/DetailCategories/LivesIn';
import Relationship from '@/components/atoms/AccountDetaills/DetailCategories/Relationship';
import WorksAt from '@/components/atoms/AccountDetaills/DetailCategories/WorksAt';
import HorizontalContentDevider from '@/components/atoms/ContentDeviders/HorizontalContentDevider';
import { StyledPageTile, StyledPageTileHeader } from '../styles';
import { IntroTileProps } from './types';

export default function IntroTile({ user, sx, ...rootProps }: IntroTileProps) {
  const iconSize = 20;
  return (
    <StyledPageTile sx={sx} {...rootProps}>
      <Stack spacing={2}>
        <StyledPageTileHeader>Intro</StyledPageTileHeader>
        <Box position='relative'>
          <Typography textAlign='center' mb={2}>
            {user.about.bio}
          </Typography>
          <HorizontalContentDevider bottom={0} />
        </Box>
        <Stack spacing={2}>
          <LivesIn userData={user} iconSize={iconSize} showPlaceholder={false} />
          <WorksAt userData={user} iconSize={iconSize} showPlaceholder={false} />
          <GoesTo userData={user} iconSize={iconSize} showPlaceholder={false} />
          <Relationship userData={user} iconSize={iconSize} showPlaceholder={false} />
          <From userData={user} iconSize={iconSize} showPlaceholder={false} />
        </Stack>
      </Stack>
    </StyledPageTile>
  );
}
