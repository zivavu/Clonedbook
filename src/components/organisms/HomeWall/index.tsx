import { Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { useFetchUserQuery } from '@/features/userAPI';
import { getPastDate } from '@/utils/generateRandomUsers';
import PostsFeed from '../PostsFeed';
import { HomeWallProps } from './types';

export default function HomeWall({ ...rootProps }: HomeWallProps) {
  const { data } = useFetchUserQuery({});

  return (
    <StyledRoot {...rootProps}>
      {data?.posts ? <PostsFeed posts={data.posts} /> : null}
      <Typography>HomeWall</Typography>
    </StyledRoot>
  );
}
