import AboutTile from '@/components/molecules/PageTiles/AboutTile';
import AllFriendsTile from '@/components/molecules/PageTiles/AllFriendsTile';
import AllPicturesTile from '@/components/molecules/PageTiles/AllPicturesTile';
import { Stack } from '@mui/material';
import { AboutTabProps } from './types';

export default function AboutTab({ setSelectedTab, profileData, sx, ...rootProps }: AboutTabProps) {
  return (
    <Stack sx={sx} {...rootProps} spacing={2}>
      <AboutTile profileData={profileData} />
      <AllFriendsTile profileData={profileData} limit={8} setSelectedTab={setSelectedTab} />
      <AllPicturesTile profileData={profileData} />
    </Stack>
  );
}
