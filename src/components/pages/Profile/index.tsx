import { StyledContentWrapper, StyledRoot } from './styles';

import { useUserDataByIdQuery } from '@/redux/services/userDataAPI';
import { Box, Container, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BackgroundPicture from './BackgroundPicture';
import ProfileTabToggleGroup from './ProfileTabToggleGroup';
import AboutTab from './Tabs/AboutTab';
import FriendsTab from './Tabs/FriendsTab';
import PhotosTab from './Tabs/PhotosTab';
import PostsTab from './Tabs/PostsTab';
import UserInfoSection from './UserInfoSection';
import { ProfileProps, TProfileTabs } from './types';

export default function Profile({ userId, useTabsRouting = true, sx, ...rootProps }: ProfileProps) {
  const theme = useTheme();
  const router = useRouter();
  const { data: profileData, refetch } = useUserDataByIdQuery(userId);

  const [selectedTab, setSelectedTab] = useState<TProfileTabs>(useTabsRouting ? null : 'posts');

  useEffect(() => {
    if (useTabsRouting) {
      setSelectedTab((router.query.tab as TProfileTabs) || 'posts');
    }
  }, [router.query.tab]);

  useEffect(() => {
    if (useTabsRouting && userId && selectedTab) {
      router.replace(`/profile/${userId}/?tab=${selectedTab}`, undefined, { shallow: true });
    }
  }, [selectedTab]);

  if (!profileData) return null;
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Box bgcolor={theme.palette.background.paper} boxShadow={theme.shadows[1]}>
        <BackgroundPicture key={userId} userData={profileData} userId={userId} />
        <Container
          maxWidth='lg'
          sx={{
            [theme.breakpoints.down('md')]: {
              padding: 0,
            },
          }}>
          <UserInfoSection userData={profileData} refetchUser={refetch} userId={userId} />
          <ProfileTabToggleGroup selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </Container>
      </Box>
      <StyledContentWrapper>
        {selectedTab === 'posts' && (
          <PostsTab key={userId} userId={userId} profileData={profileData} />
        )}
        {selectedTab === 'about' && (
          <AboutTab key={userId} profileData={profileData} setSelectedTab={setSelectedTab} />
        )}
        {selectedTab === 'friends' && <FriendsTab key={userId} profileData={profileData} />}
        {selectedTab === 'photos' && <PhotosTab key={userId} profileData={profileData} />}
      </StyledContentWrapper>
    </StyledRoot>
  );
}
