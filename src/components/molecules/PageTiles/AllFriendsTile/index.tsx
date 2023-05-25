import { Stack, ToggleButtonGroup, Typography, useTheme } from '@mui/material';

import SelectedButtonUnderline from '@/components/atoms/SelectedButtonUnderline';
import { useState } from 'react';
import { StyledFullSizePageTile, StyledPageTileHeader } from '../styles';
import AllFriendsSection from './Sections/AllFriends';
import MutalFriendsSection from './Sections/MutalFriends';
import RecentlyAddedSection from './Sections/RecentlyAdded';
import { SeeAllButton, StyledToggleButton } from './styles';
import { AllFriendsTileProps, TFriendsSections } from './types';

export default function AllFriendsTile({
  profileData,
  limit,
  setSelectedTab,
  sx,
  ...rootProps
}: AllFriendsTileProps) {
  const theme = useTheme();
  const [currentSection, setCurrentSection] = useState<TFriendsSections>('all friends');
  const friendsSections: TFriendsSections[] = ['all friends', 'mutual friends', 'recently added'];

  return (
    <StyledFullSizePageTile sx={sx} {...rootProps}>
      <StyledPageTileHeader>Friends</StyledPageTileHeader>
      <Stack direction='row'>
        <ToggleButtonGroup exclusive onChange={(e, value) => setCurrentSection(value)}>
          {friendsSections.map((section) => {
            const selected = currentSection === section;
            return (
              <StyledToggleButton key={section} value={section} selected={selected}>
                <Typography variant='subtitle2' fontWeight={500} textTransform='capitalize'>
                  {section}
                </Typography>
                {selected ? <SelectedButtonUnderline /> : null}
              </StyledToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </Stack>
      {currentSection === 'all friends' && (
        <AllFriendsSection profileId={profileData.id} limit={limit} />
      )}
      {currentSection === 'mutual friends' && (
        <MutalFriendsSection profileId={profileData.id} limit={limit} />
      )}
      {currentSection === 'recently added' && (
        <RecentlyAddedSection profileId={profileData.id} limit={limit} />
      )}
      {limit && setSelectedTab && (
        <SeeAllButton focusRipple onClick={() => setSelectedTab('friends')}>
          <Typography variant='h6' fontWeight={500}>
            See all
          </Typography>
        </SeeAllButton>
      )}
    </StyledFullSizePageTile>
  );
}
