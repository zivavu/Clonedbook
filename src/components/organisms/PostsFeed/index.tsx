import { StyledRoot } from './styles';

import WriteSomethingTile from '@/components/molecules/PageTiles/WriteSomethingTile';
import FeedPost from '@/components/organisms/FeedPost';
import { useFetchLoggedUserQuery } from '@/features/userAPI';
import { Stack } from '@mui/material';
import { PostsFeedProps } from './types';

export default function PostsFeed({ posts, ...rootProps }: PostsFeedProps) {
  const { data: user } = useFetchLoggedUserQuery({});

  return (
    <StyledRoot {...rootProps}>
      <Stack spacing={2} mt={2} px={2}>
        {user?.profileId && <WriteSomethingTile user={user} />}
        {posts.map((post) => (
          <FeedPost key={post.id} post={post}></FeedPost>
        ))}
      </Stack>
    </StyledRoot>
  );
}
