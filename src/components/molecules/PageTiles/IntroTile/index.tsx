import { Box, Stack, Typography } from '@mui/material';

import BornIn from '@/components/atoms/accountDetails/detailCategories/BornIn';
import GoesTo from '@/components/atoms/accountDetails/detailCategories/GoesTo';
import LivesIn from '@/components/atoms/accountDetails/detailCategories/LivesIn';
import Relationship from '@/components/atoms/accountDetails/detailCategories/Relationship';
import WorksAt from '@/components/atoms/accountDetails/detailCategories/WorksAt';
import HorizontalContentDevider from '@/components/atoms/contentDeviders/HorizontalContentDevider';
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
          <LivesIn userData={user} iconSize={iconSize} showPlaceholder={false} preventEdit />
          <WorksAt userData={user} iconSize={iconSize} showPlaceholder={false} preventEdit />
          <GoesTo userData={user} iconSize={iconSize} showPlaceholder={false} preventEdit />
          <Relationship userData={user} iconSize={iconSize} showPlaceholder={false} preventEdit />
          <BornIn userData={user} iconSize={iconSize} showPlaceholder={false} preventEdit />
        </Stack>
      </Stack>
    </StyledPageTile>
  );
}
