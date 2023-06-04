import { StyledContentWrapper, StyledRoot } from './styles';

import { useFetchAllUserData } from '@/common/readData/useFetchAllUserData';
import useFetchUsersPictures from '@/common/readData/useFetchUsersPictures';
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
  const { userData: profileData, isLoading: isUserLoading, isError } = useFetchAllUserData(userId);
  const { picturesMap } = useFetchUsersPictures(userId);
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

  return isUserLoading || isError || !profileData ? null : (
    <StyledRoot sx={sx} {...rootProps}>
      <Box bgcolor={theme.palette.background.paper} boxShadow={theme.shadows[1]}>
        <BackgroundPicture userData={profileData} picturesMap={picturesMap} />
        <Container maxWidth='lg'>
          <UserInfoSection userData={profileData} picturesMap={picturesMap} />
          <ProfileTabToggleGroup selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </Container>
      </Box>
      <StyledContentWrapper>
        {selectedTab === 'posts' && <PostsTab userId={userId} profileData={profileData} />}
        {selectedTab === 'about' && (
          <AboutTab profileData={profileData} setSelectedTab={setSelectedTab} />
        )}
        {selectedTab === 'friends' && <FriendsTab profileData={profileData} />}
        {selectedTab === 'photos' && <PhotosTab profileData={profileData} />}
      </StyledContentWrapper>
    </StyledRoot>
  );
}
