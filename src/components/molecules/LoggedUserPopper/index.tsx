import { Box, List, PopperProps, Switch, Typography, useTheme } from '@mui/material';

import {
  StyledContentWrapper,
  StyledIconContainer,
  StyledListButton,
  StyledListItemIcon,
  StyledLoggedUserButton,
  StyledRoot,
} from './styles';

import useChangeLoggedUser from '@/common/misc/userDataManagment/useChangeLoggedUser';
import UserAvatar from '@/components/atoms/UserAvatar';
import HorizontalContentDevider from '@/components/atoms/contentDeviders/HorizontalContentDevider';
import { InvisibleScrollableStack } from '@/components/atoms/scrollables/ScrollableStack';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { useTheme as useNextThemes } from 'next-themes';
import { useRouter } from 'next/router';

export default function LoggedUserPopper({ open, anchorEl, sx, ...rootProps }: PopperProps) {
  const theme = useTheme();
  const { setTheme: setThemeMode, theme: themeMode } = useNextThemes();

  const { data: loggedUser } = useGetLoggedUserQuery({});

  const { switchLoggedUser, isLoading } = useChangeLoggedUser();

  const router = useRouter();
  const handleRedirectToProfile = () => {
    router.push(`/profile`);
  };

  if (!loggedUser) return null;
  return (
    <StyledRoot open={open} anchorEl={anchorEl} sx={sx} {...rootProps}>
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

            <StyledListButton onClick={switchLoggedUser} disabled={isLoading}>
              <StyledIconContainer>
                <StyledListItemIcon icon='repeat' />
              </StyledIconContainer>
              <Typography variant='subtitle2'>
                {isLoading ? 'Loading...' : 'Reroll user'}
              </Typography>
            </StyledListButton>

            <StyledListButton
              onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}>
              <StyledIconContainer>
                <StyledListItemIcon icon='moon' />
              </StyledIconContainer>
              <Typography variant='subtitle2'>Dark Mode</Typography>
              <Switch checked={themeMode === 'dark'} sx={{ marginLeft: 'auto' }}></Switch>
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
              <Typography variant='subtitle2'>GitHub Repo</Typography>
            </StyledListButton>
          </List>
        </InvisibleScrollableStack>
      </StyledContentWrapper>
    </StyledRoot>
  );
}
