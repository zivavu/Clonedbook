import { List, Switch, Typography, useTheme } from '@mui/material';

import {
  StyledIconContainer,
  StyledListItem,
  StyledListItemIcon,
  StyledLoggedUserDispaly,
  StyledRoot,
} from './styles';

import { InvisibleScrollableStack } from '@/components/atoms/Scrollables/ScrollableStack';
import UserAvatar from '@/components/atoms/UserAvatar';
import { toggleTheme } from '@/redux/features/themeSlice';
import { useFetchLoggedUserQuery } from '@/redux/services/userAPI';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { LoggedUserPopperProps } from './types';

export default function LoggedUserPopper({
  open,
  anchorEl,
  sx,
  ...rootProps
}: LoggedUserPopperProps) {
  const theme = useTheme();
  const { data: loggedUser } = useFetchLoggedUserQuery({});
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();
  if (!loggedUser) return null;
  return (
    <StyledRoot open={open} anchorEl={anchorEl} placement='bottom-start' sx={sx} {...rootProps}>
      <InvisibleScrollableStack padding={theme.spacing(1.5, 2)} spacing={1}>
        <StyledLoggedUserDispaly direction='row' spacing={1}>
          <UserAvatar userId={loggedUser.id} />
          <Typography variant='subtitle1' fontWeight={500}>
            {loggedUser.firstName} {loggedUser.lastName}
          </Typography>
        </StyledLoggedUserDispaly>
        <List>
          <StyledListItem onClick={() => dispatch(toggleTheme())}>
            <StyledIconContainer>
              <StyledListItemIcon icon='moon' />
            </StyledIconContainer>
            <Typography>Dark Mode</Typography>
            <Switch checked={mode === 'dark'}></Switch>
          </StyledListItem>
          <StyledListItem>My Profile</StyledListItem>
          <StyledListItem>Switch User</StyledListItem>
          <StyledListItem>Give Feedback</StyledListItem>
        </List>
      </InvisibleScrollableStack>
    </StyledRoot>
  );
}
