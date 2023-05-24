import { useTheme } from '@mui/material';

import AboutTile from '@/components/molecules/PageTiles/AboutTile';
import AllFriendsTile from '@/components/molecules/PageTiles/AllFriendsTile';
import { StyledRoot } from './styles';
import { AboutTabProps } from './types';

export default function AboutTab({ profileData, sx, ...rootProps }: AboutTabProps) {
  const theme = useTheme();

  return (
    <StyledRoot sx={sx} {...rootProps} spacing={2}>
      <AboutTile profileData={profileData} />
      <AllFriendsTile profileData={profileData} />
    </StyledRoot>
  );
}
