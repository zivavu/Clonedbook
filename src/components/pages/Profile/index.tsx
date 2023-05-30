import { StyledRoot } from './styles';

import { useFetchAllUserData } from '@/hooks/useFetchAllUserData';
import useFetchUsersPictures from '@/hooks/useFetchUsersPictures';
import { Box, Container, useTheme } from '@mui/material';
import { useState } from 'react';
import BackgroundPicture from './BackgroundPicture';
import ProfileTabToggleGroup from './ProfileTabToggleGroup';
import AboutTab from './Tabs/AboutTab';
import FriendsTab from './Tabs/FriendsTab';
import PhotosTab from './Tabs/PhotosTab';
import PostsTab from './Tabs/PostsTab';
import UserInfoSection from './UserInfoSection';
import { ProfileProps, TProfileTabs } from './types';

export default function Profile({ userId, sx, ...rootProps }: ProfileProps) {
  const theme = useTheme();
  const { userData: profileData, isLoading: isUserLoading, isError } = useFetchAllUserData(userId);
  const { picturesMap } = useFetchUsersPictures(userId);
  const [selectedTab, setSelectedTab] = useState<TProfileTabs>('posts');

  return isUserLoading || isError || !profileData ? null : (
    <StyledRoot sx={sx} {...rootProps}>
      <Box bgcolor={theme.palette.background.paper} boxShadow={theme.shadows[1]}>
        <BackgroundPicture userData={profileData} picturesMap={picturesMap} />
        <Container maxWidth='lg'>
          <UserInfoSection userData={profileData} picturesMap={picturesMap} />
          <ProfileTabToggleGroup selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </Container>
      </Box>
      <Container maxWidth='lg' sx={{ mt: 2, pb: 4, minHeight: '70vh', paddingX: theme.spacing(1) }}>
        {selectedTab === 'posts' && <PostsTab userId={userId} profileData={profileData} />}
        {selectedTab === 'about' && (
          <AboutTab profileData={profileData} setSelectedTab={setSelectedTab} />
        )}
        {selectedTab === 'friends' && <FriendsTab profileData={profileData} />}
        {selectedTab === 'photos' && <PhotosTab profileData={profileData} />}
      </Container>
    </StyledRoot>
  );
}
