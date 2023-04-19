import { Button, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import { useFetchUserQuery } from '@/features/userAPI';
import { generateUsersAndPostToDb } from '@/utils/generateRandomUsers';
import PostsFeed from '../PostsFeed';
import { HomeWallProps } from './types';

export default function HomeWall({ ...rootProps }: HomeWallProps) {
  const { data } = useFetchUserQuery({});

  return (
    <StyledRoot {...rootProps}>
      <Button onClick={() => generateUsersAndPostToDb(100, 100)}>LETS GOOO</Button>
      {data?.posts ? <PostsFeed posts={data.posts} /> : null}
      <Typography>HomeWall</Typography>
    </StyledRoot>
  );
}
