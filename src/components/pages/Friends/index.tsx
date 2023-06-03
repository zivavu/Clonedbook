import { Box, Stack, StackProps, useTheme } from '@mui/material';

import { NAVBAR_HEIGHT } from '@/components/organisms/NavBar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Profile from '../Profile';
import AllFriendsSidebarList from './FriendsLists/AllFriendsList';
import FriendRequestsSidebarList from './FriendsLists/FriendRequestsList';
import FriendSuggestionsSidebarList from './FriendsLists/FriendSuggestionsList';
import FriendNotSelectedPlaceholder from './FriendsLists/components/FriendNotSelectedPlaceholder';
import HomeTab from './HomeTab';
import SidebarDrawer from './SidebarDrawer';
import TabSelectList from './TabsSidebar';
import { TFriendsTabs } from './types';

export default function Friends({ sx, ...rootProps }: StackProps) {
  const theme = useTheme();
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<TFriendsTabs>('home');
  const [shownProfile, setShownProfile] = useState<string | null>(null);

  useEffect(() => {
    if (!router.query.tab) return;
    setCurrentTab((router.query.tab as TFriendsTabs) || 'home');
  }, [router.query.tab]);

  useEffect(() => {
    router.push(`/friends/?tab=${currentTab}`, undefined, { shallow: true });
    setShownProfile(null);
  }, [currentTab]);

  return (
    <Stack
      sx={sx}
      {...rootProps}
      direction='row'
      position='relative'
      maxWidth='100vw'
      minHeight={`calc(100vh - ${NAVBAR_HEIGHT})`}>
      <SidebarDrawer>
        {currentTab === 'home' && (
          <TabSelectList currentTab={currentTab} setCurrentTab={setCurrentTab} />
        )}

        {currentTab === 'recieved_requests' && (
          <FriendRequestsSidebarList
            setCurrentTab={setCurrentTab}
            setShownProfile={setShownProfile}
          />
        )}
        {currentTab === 'suggestions' && (
          <FriendSuggestionsSidebarList
            setCurrentTab={setCurrentTab}
            setShownProfile={setShownProfile}
          />
        )}
        {currentTab === 'all_friends' && (
          <AllFriendsSidebarList setCurrentTab={setCurrentTab} setShownProfile={setShownProfile} />
        )}
      </SidebarDrawer>

      {currentTab === 'home' && <HomeTab />}

      {currentTab !== 'home' && !shownProfile && <FriendNotSelectedPlaceholder />}
      {currentTab !== 'home' && shownProfile && (
        <Box width='100%' height='100%' position='relative'>
          <Profile userId={shownProfile} useTabsRouting={false} />
        </Box>
      )}
    </Stack>
  );
}
