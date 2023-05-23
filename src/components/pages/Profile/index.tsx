import { StyledRoot } from './styles';

import { useFetchLoggedUserQuery } from '@/features/userAPI';
import { useFetchAllUserData } from '@/hooks/useFetchAllUserData';
import { Box, Container, useTheme } from '@mui/material';
import { useState } from 'react';
import BackgroundPicture from './BackgroundPicture';
import ProfileTabToggleGroup from './ProfileTabToggleGroup';
import AboutTab from './Tabs/AboutTab';
import PostsTab from './Tabs/PostsTab';
import UserInfoSection from './UserInfoSection';
import { ProfileProps, TProfileTabs } from './types';

export default function Profile({ userId, sx, ...rootProps }: ProfileProps) {
  const theme = useTheme();
  const { userData: profileData, isLoading: isUserLoading, isError } = useFetchAllUserData(userId);
  const { data: loggedUser } = useFetchLoggedUserQuery({});
  const [selectedTab, setSelectedTab] = useState<TProfileTabs>('posts');

  return isUserLoading || isError || !profileData ? null : (
    <StyledRoot sx={sx} {...rootProps}>
      <Box bgcolor={theme.palette.secondary.light} boxShadow={theme.shadows[1]}>
        <BackgroundPicture userData={profileData} />
        <Container>
          <UserInfoSection userData={profileData} />
          <ProfileTabToggleGroup selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </Container>
      </Box>
      <Container sx={{ mt: 2, pb: 4 }}>
        {selectedTab === 'posts' && (
          <PostsTab userId={userId} loggedUser={loggedUser} profileData={profileData} />
        )}
        {selectedTab === 'about' && <AboutTab loggedUser={loggedUser} profileData={profileData} />}
      </Container>
    </StyledRoot>
  );
}
