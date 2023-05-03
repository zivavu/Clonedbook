import { Stack, Typography } from '@mui/material';

import { StyledRoot } from './styles';

import UserAvatar from '@/components/atoms/UserAvatar';
import getDateFromTimestamp from '@/utils/getDateFromTimestamp';
import { PostOwnerInfoDisplayProps } from './types';

export default function PostOwnerInfoDisplay({
  owner,
  createdAt,
  sx,
  ...rootProps
}: PostOwnerInfoDisplayProps) {
  const date = getDateFromTimestamp(createdAt.seconds);
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Stack direction='row' spacing={1}>
        <UserAvatar src={owner.profilePicture} />
        <Stack justifyContent='center'>
          <Typography fontWeight={500} variant='subtitle2' lineHeight='1rem'>
            {owner.firstName} {owner.lastName}
          </Typography>
          <Typography variant='caption'>
            {date.month} {date.day}, {date.year}.
          </Typography>
        </Stack>
      </Stack>
    </StyledRoot>
  );
}
