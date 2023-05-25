import { Stack, ToggleButtonGroup, Typography, useTheme } from '@mui/material';

import SelectedButtonUnderline from '@/components/atoms/SelectedButtonUnderline';
import { default as useGetUsersPublicFriends } from '@/hooks/useFetchUsersPublicFriends';
import { useState } from 'react';
import { StyledFullSizePageTile, StyledPageTileHeader } from '../styles';
import SingleFriend from './SingleFriend';
import { StyledToggleButton } from './styles';
import { AllFriendsTileProps, TFriendsSections } from './types';

export default function AllFriendsTile({ profileData, sx, ...rootProps }: AllFriendsTileProps) {
  const theme = useTheme();
  const publicFriends = useGetUsersPublicFriends(profileData.id);
  const [currentSection, setCurrentSection] = useState<TFriendsSections>('all friends');
  const friendsSections: TFriendsSections[] = ['all friends', 'mutual friends', 'recently added'];
  if (!publicFriends) return null;
  const friendsIds = Object.entries(publicFriends)
    .sort(([idA, timestampA], [idB, timestampB]) => timestampA.seconds - timestampB.seconds)
    .map(([id]) => id);
  return (
    <StyledFullSizePageTile sx={sx} {...rootProps} px={2} pb={2}>
      <StyledPageTileHeader mt={theme.spacing(1.5)}>Friends</StyledPageTileHeader>
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
      <Stack spacing={2}>
        {friendsIds.map((friendId) => (
          <SingleFriend key={friendId} friendId={friendId} />
        ))}
      </Stack>
    </StyledFullSizePageTile>
  );
}
