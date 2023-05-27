import { Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import Link from '@/components/atoms/Link';
import UserAvatar from '@/components/atoms/UserAvatar';
import getShortDate from '@/utils/dateManagment/getShortDate';
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
          <Link href={`/profile/${owner.id}`}>
            <Typography fontWeight={500} variant='subtitle2' lineHeight='1rem'>
              {owner.firstName} {owner.lastName}
            </Typography>
          </Link>
          <Typography variant='body2' color={theme.palette.text.secondary}>
            {getShortDate(createdAt.seconds, 'week')}
          </Typography>
        </Stack>
      </Stack>
    </StyledRoot>
  );
}
