import { Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import PostsFeed from '../PostsFeed';
import { HomeWallProps } from './types';

export default function HomeWall({ ...rootProps }: HomeWallProps) {
  return (
    <StyledRoot {...rootProps}>
      <PostsFeed />
      <Typography>HomeWall</Typography>
    </StyledRoot>
  );
}
