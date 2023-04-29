import { Box, ButtonBase, Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import UserAvatar from '@/components/atoms/UserAvatar';
import { UserInfoProps } from './types';

export default function UserInfo({ user, sx, ...rootProps }: UserInfoProps) {
  const theme = useTheme();
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Stack direction='row' spacing={1}>
        <UserAvatar src={user.profilePicture} />
        <Box>
          <Typography fontWeight='400' variant='body2'>
            {user.firstName} {user.lastName}
          </Typography>
          <ButtonBase
            sx={{
              backgroundColor: theme.palette.secondary.main,
              padding: theme.spacing(0.2, 1),
              borderRadius: '6px',
              height: '24px',
            }}
          >
            <Icon icon='globe-africa' fontSize='12px' />
            <Typography ml={theme.spacing(0.5)} variant='caption' lineHeight='1rem'>
              Public
            </Typography>
          </ButtonBase>
        </Box>
      </Stack>
    </StyledRoot>
  );
}
