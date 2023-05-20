import { StyledRoot } from './styles';

import WriteSomethingTile from '@/components/molecules/PageTiles/WriteSomethingTile';
import { useFetchLoggedUserQuery } from '@/features/userAPI';
import usePostsInfiniteScrolling from '@/hooks/usePostsInfiniteScrolling';
import PostsFeed from '../PostsFeed';
import { HomeWallProps } from './types';

export default function HomeWall({ sx, ...rootProps }: HomeWallProps) {
  const { posts, isError, isLoading } = usePostsInfiniteScrolling({
    type: 'homeWall',
  });
  const { data: user } = useFetchLoggedUserQuery({});

  return (
    <StyledRoot sx={sx} {...rootProps}>
      {user?.id && <WriteSomethingTile user={user} mb={2} />}
      {posts ? <PostsFeed posts={posts} isError={isError} isLoading={isLoading} /> : null}
    </StyledRoot>
  );
}
