import { StyledRoot } from './styles';

import { useFetchAllUserData } from '@/hooks/useFetchAllUserData';
import UserInfoSection from './UserInfoSection';
import { ProfileProps } from './types';

export default function Profile({ userId, sx, ...rootProps }: ProfileProps) {
  const { userData, isLoading, isError } = useFetchAllUserData(userId);
  return isLoading || isError || !userData ? null : (
    <StyledRoot sx={sx} {...rootProps}>
      <UserInfoSection userData={userData} />
    </StyledRoot>
  );
}
