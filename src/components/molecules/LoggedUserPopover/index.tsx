import { Box, List, PopoverProps, Switch, Typography, useTheme } from '@mui/material';

import {
  StyledContentWrapper,
  StyledIconContainer,
  StyledListButton,
  StyledListItemIcon,
  StyledLoggedUserButton,
  StyledRoot,
} from './styles';

import HorizontalContentDevider from '@/components/atoms/ContentDeviders/HorizontalContentDevider';
import { InvisibleScrollableStack } from '@/components/atoms/Scrollables/ScrollableStack';
import UserAvatar from '@/components/atoms/UserAvatar';
import { toggleTheme } from '@/redux/features/themeSlice';
import { useFetchLoggedUserQuery } from '@/redux/services/userAPI';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

export default function LoggedUserPopover({
  open,
  onClose,
  anchorEl,
  sx,
  ...rootProps
}: PopoverProps) {
  const theme = useTheme();
  const { data: loggedUser } = useFetchLoggedUserQuery({});
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  const router = useRouter();
  const handleRedirectToProfile = () => {
    router.push(`/profile`);
  };
  if (!loggedUser) return null;
  return (
    <StyledRoot
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      sx={sx}
      {...rootProps}>
      <StyledContentWrapper>
        <InvisibleScrollableStack spacing={1} paddingY={1.5}>
          <Box paddingX={1}>
            <StyledLoggedUserButton onClick={handleRedirectToProfile}>
              <UserAvatar userId={loggedUser.id} mr={1} size={36} />
              <Typography variant='subtitle1' fontWeight={500}>
                {loggedUser.firstName} {loggedUser.lastName}
              </Typography>
            </StyledLoggedUserButton>
          </Box>

          <List sx={{ padding: theme.spacing(0, 1) }}>
            <StyledListButton onClick={handleRedirectToProfile}>
              <StyledIconContainer>
                <StyledListItemIcon icon='user' />
              </StyledIconContainer>
              <Typography variant='subtitle2'>Profile</Typography>
            </StyledListButton>

            <StyledListButton>
              <StyledIconContainer>
                <StyledListItemIcon icon='repeat' />
              </StyledIconContainer>
              <Typography variant='subtitle2'>Change User</Typography>
            </StyledListButton>

            <StyledListButton onClick={() => dispatch(toggleTheme())}>
              <StyledIconContainer>
                <StyledListItemIcon icon='moon' />
              </StyledIconContainer>
              <Typography variant='subtitle2'>Dark Mode</Typography>
              <Switch checked={mode === 'dark'} sx={{ marginLeft: 'auto' }}></Switch>
            </StyledListButton>
          </List>

          <List sx={{ padding: theme.spacing(0, 1), paddingTop: theme.spacing(1) }}>
            <HorizontalContentDevider top={0} />
            <StyledListButton onClick={() => window.open('mailto:zivavu@gmail.com', '_self')}>
              <StyledIconContainer>
                <StyledListItemIcon icon='envelope' />
              </StyledIconContainer>
              <Typography variant='subtitle2'>Email me</Typography>
            </StyledListButton>

            <StyledListButton
              onClick={() => window.open('https://github.com/zivavu/facebook-clone', '_blank')}>
              <StyledIconContainer>
                <StyledListItemIcon icon={['fab', 'github']} />
              </StyledIconContainer>
              <Typography variant='subtitle2'>GitHub Project</Typography>
            </StyledListButton>
          </List>
        </InvisibleScrollableStack>
      </StyledContentWrapper>
    </StyledRoot>
  );
}
