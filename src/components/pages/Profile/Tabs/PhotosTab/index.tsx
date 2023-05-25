import AllPicturesTile from '@/components/molecules/PageTiles/AllPicturesTile';
import { Stack } from '@mui/material';
import { FriendsTabProps } from './types';

export default function PhotosTab({ profileData, sx, ...rootProps }: FriendsTabProps) {
  return (
    <Stack sx={sx} {...rootProps} spacing={2}>
      <AllPicturesTile profileData={profileData} />
    </Stack>
  );
}
