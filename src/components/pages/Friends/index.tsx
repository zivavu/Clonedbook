import { Stack, StackProps, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { NAVBAR_HEIGHT } from '@/components/organisms/NavBar';
import { useEffect, useState } from 'react';
import Profile from '../Profile';
import AllFriendsList from './FriendsLists/AllFriendsList';
import FriendRequestsList from './FriendsLists/FriendRequestsList';
import FriendSuggestionsList from './FriendsLists/FriendSuggestionsList';
import FriendNotSelectedPlaceholder from './FriendsLists/components/FriendNotSelectedPlaceholder';
import HomeTab from './HomeTab';
import TabsList from './TabsList';
import { TFriendsTabs } from './types';

export default function Friends({ sx, ...rootProps }: StackProps) {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState<TFriendsTabs>('home');
  const [shownProfile, setShownProfile] = useState<string | null>(null);

  useEffect(() => {
    setShownProfile(null);
  }, [currentTab]);

  return (
    <StyledRoot sx={sx} {...rootProps} direction='row'>
      <Stack
        minWidth='360px'
        p={theme.spacing(2, 1)}
        height={`calc(100vh - ${NAVBAR_HEIGHT})`}
        bgcolor={theme.palette.background.paper}>
        {currentTab === 'home' && (
          <TabsList currentTab={currentTab} setCurrentTab={setCurrentTab} />
        )}
        {currentTab === 'recieved_requests' && (
          <FriendRequestsList setCurrentTab={setCurrentTab} setShownProfile={setShownProfile} />
        )}
        {currentTab === 'suggestions' && (
          <FriendSuggestionsList setCurrentTab={setCurrentTab} setShownProfile={setShownProfile} />
        )}
        {currentTab === 'all_friends' && (
          <AllFriendsList setCurrentTab={setCurrentTab} setShownProfile={setShownProfile} />
        )}
      </Stack>
      {currentTab === 'home' && <HomeTab />}
      {currentTab !== 'home' && !shownProfile && <FriendNotSelectedPlaceholder />}
      {currentTab !== 'home' && shownProfile && <Profile userId={shownProfile} width='100%' />}
    </StyledRoot>
  );
}
