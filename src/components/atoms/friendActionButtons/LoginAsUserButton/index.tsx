import { StyledButtonIcon, StyledButtonText, StyledRoot } from './styles';

import useChangeLoggedUser from '@/common/misc/userDataManagment/useChangeLoggedUser';
import useGetUserBasicInfo from '@/common/misc/userDataManagment/useGetUsersPublicData';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { Box, CircularProgress, useTheme } from '@mui/material';
import { LoginAsUserButtonProps } from './types';

export default function LoginAsUserButton({
  userId,
  showIcon,
  sx,
  ...rootProps
}: LoginAsUserButtonProps) {
  const theme = useTheme();
  const user = useGetUserBasicInfo(userId);
  const { data: loggedUser } = useGetLoggedUserQuery({});

  const { switchLoggedUser, isLoading } = useChangeLoggedUser(userId);

  if (!user || loggedUser?.id === user.id) return null;
  return (
    <StyledRoot focusRipple sx={sx} {...rootProps} onClick={switchLoggedUser} disabled={isLoading}>
      {isLoading ? (
        <Box width='24px' pr={0.5}>
          <CircularProgress thickness={6} size={18} sx={{ color: theme.palette.common.white }} />
        </Box>
      ) : (
        showIcon && <StyledButtonIcon icon='right-to-bracket' />
      )}
      <StyledButtonText>{isLoading ? 'Loading...' : 'Login as'} </StyledButtonText>
    </StyledRoot>
  );
}
