import { Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import getShortDate from '@/common/misc/dateManagment/getShortDate';
import UserAvatar from '@/components/atoms/UserAvatar';
import UserLink from '@/components/atoms/UserLink';
import { PostOwnerInfoDisplayProps } from './types';

export default function PostOwnerInfoDisplay({
  owner,
  createdAt,
  sx,
  ...rootProps
}: PostOwnerInfoDisplayProps) {
  const theme = useTheme();
  if (!owner) return null;
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Stack direction='row' spacing={1}>
        <UserAvatar userId={owner.id} />
        <Stack justifyContent='center'>
          <UserLink
            userId={owner.id}
            usePopper
            fontWeight={500}
            variant='subtitle2'
            lineHeight='1rem'
          />
          <Typography variant='body2' color={theme.palette.text.secondary}>
            {getShortDate(createdAt.seconds, 'week')}
          </Typography>
        </Stack>
      </Stack>
    </StyledRoot>
  );
}
