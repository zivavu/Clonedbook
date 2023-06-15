import { Stack, Typography, useTheme } from '@mui/material';

import getDateFromTimestamp from '@/common/misc/dateManagment/getDateFromTimestamp';
import { useUserDataByIdQuery } from '@/redux/services/userDataAPI';
import { StyledContentWrapper, StyledRoot } from '../../../organisms/FeedPost/styles';
import { StyledIcon, StyledIconContainer } from '../styles';
import { BornAtPostTileProps } from './types';

export default function BornAtPostTile({ userId, sx, ...rootProps }: BornAtPostTileProps) {
  const theme = useTheme();
  const { data: user } = useUserDataByIdQuery(userId);
  const date = user?.about.birthDate && getDateFromTimestamp(user?.about.birthDate?.seconds);

  if (!date) return null;
  return (
    <StyledRoot height={220} position='relative' sx={sx} {...rootProps}>
      <StyledContentWrapper
        sx={{
          width: '90%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
        spacing={2}>
        <StyledIconContainer>
          <StyledIcon icon='baby-carriage' />
        </StyledIconContainer>
        <Stack alignItems='center'>
          <Typography variant='h3' fontWeight={500}>
            {`Born on ${date.month} ${date.day}, ${date.year}`}
          </Typography>
        </Stack>
      </StyledContentWrapper>
    </StyledRoot>
  );
}
