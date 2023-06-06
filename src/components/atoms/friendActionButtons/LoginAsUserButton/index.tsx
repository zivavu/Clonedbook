import { StyledButtonIcon, StyledButtonText, StyledRoot } from './styles';

import useGetUserPublicData from '@/common/misc/userDataManagment/useGetUsersPublicData';
import { useLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { LoginAsUserButtonProps } from './types';

export default function LoginAsUserButton({ userId, sx, ...rootProps }: LoginAsUserButtonProps) {
  const user = useGetUserPublicData(userId);
  const { refetch } = useLoggedUserQuery({});
  function loginAsUserHandler() {
    localStorage.setItem('loggedUser', JSON.stringify(userId));
    refetch();
  }
  if (!user) return null;
  return (
    <StyledRoot focusRipple sx={sx} {...rootProps} onClick={loginAsUserHandler}>
      <StyledButtonIcon icon='right-to-bracket' />
      <StyledButtonText>Login as</StyledButtonText>
    </StyledRoot>
  );
}
