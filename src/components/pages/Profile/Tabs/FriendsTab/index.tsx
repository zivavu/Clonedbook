import AllFriendsTile from '@/components/molecules/PageTiles/AllFriendsTile';
import { Stack } from '@mui/material';
import { FriendsTabProps } from './types';

export default function FriendsTab({ profileData, sx, ...rootProps }: FriendsTabProps) {
  return (
    <Stack sx={sx} {...rootProps} spacing={2}>
      <AllFriendsTile profileData={profileData} />
    </Stack>
  );
}
