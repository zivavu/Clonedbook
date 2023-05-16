import { StyledRoot } from './styles';

import { useFetchAllUserData } from '@/hooks/useFetchAllUserData';
import { Container } from '@mui/material';
import BackgroundPicture from './BackgroundPicture';
import ProfileTabToggleGroup from './ProfileTabToggleGroup';
import UserInfoSection from './UserInfoSection';
import { ProfileProps } from './types';

export default function Profile({ userId, sx, ...rootProps }: ProfileProps) {
  const { userData, isLoading, isError } = useFetchAllUserData(userId);
  return isLoading || isError || !userData ? null : (
    <StyledRoot sx={sx} {...rootProps}>
      <BackgroundPicture userData={userData} />
      <Container>
        <UserInfoSection userData={userData} />
        <ProfileTabToggleGroup />
      </Container>
    </StyledRoot>
  );
}
