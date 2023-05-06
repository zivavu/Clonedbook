import { Typography } from '@mui/material';

import { StyledRoot } from './styles';

import { useFetchAllUserData } from '@/hooks/useFetchAllUserData';
import { ProfileProps } from './types';

export default function Profile({ userId, sx, ...rootProps }: ProfileProps) {
  useFetchAllUserData(userId);
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Typography>Profile</Typography>
    </StyledRoot>
  );
}
