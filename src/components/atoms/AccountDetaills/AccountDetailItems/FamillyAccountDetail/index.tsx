import { Stack, Typography, useTheme } from '@mui/material';

import Link from '@/components/atoms/Link';
import UserAvatar from '@/components/atoms/UserAvatar';
import { FamilyAcountDetailProps } from '../../types';
import { StyledRoot } from './styles';

export default function FamilyAccountDetail({
  label,
  user,
  pictureSize,
  sx,
  ...rootProps
}: FamilyAcountDetailProps) {
  const theme = useTheme();
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Stack direction='row' spacing={1.5}>
        <UserAvatar userId={user.id} size={pictureSize} />
        <Stack>
          <Link href={`/profile/${user.id}`}>
            <Typography fontWeight={550}>{`${user.firstName} ${user.lastName}`}</Typography>
          </Link>
          <Typography color={theme.palette.text.secondary}>{label}</Typography>
        </Stack>
      </Stack>
    </StyledRoot>
  );
}
