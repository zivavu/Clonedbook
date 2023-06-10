import { StyledButtonIcon, StyledButtonText, StyledRoot } from './styles';

import useGetUserPublicData from '@/common/misc/userDataManagment/useGetUsersPublicData';
import { useGetLoggedUserQuery, useGetUserChatsQuery } from '@/redux/services/loggedUserAPI';
import { LoginAsUserButtonProps } from './types';

export default function LoginAsUserButton({ userId, sx, ...rootProps }: LoginAsUserButtonProps) {
  const user = useGetUserPublicData(userId);
  const { data: loggedUser, refetch: refetchLoggedUser } = useGetLoggedUserQuery({});
  const { refetch: refetchChats } = useGetUserChatsQuery({});
  async function loginAsUserHandler() {
    localStorage.setItem('loggedUser', JSON.stringify(userId));
    await refetchLoggedUser();
    refetchChats();
  }
  if (!user || loggedUser?.id === user.id) return null;
  return (
    <StyledRoot focusRipple sx={sx} {...rootProps} onClick={loginAsUserHandler}>
      <StyledButtonIcon icon='right-to-bracket' />
      <StyledButtonText>Login as</StyledButtonText>
    </StyledRoot>
  );
}
