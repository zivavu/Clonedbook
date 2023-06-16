import { StyledRoot } from './styles';

import WriteSomethingTile from '@/components/molecules/PageTiles/WriteSomethingTile';
import usePostsInfiniteScrolling from '@/services/posts/usePostsInfiniteScrolling';
import PostsFeed from '../PostsFeed';
import { HomeWallProps } from './types';

export default function HomeWall({ sx, ...rootProps }: HomeWallProps) {
  const { posts, isError, isLoading, refetchPostById } = usePostsInfiniteScrolling({
    type: 'homeWall',
  });

  return (
    <StyledRoot sx={sx} {...rootProps}>
      <WriteSomethingTile mb={2} refetchPostById={refetchPostById} />
      {posts ? (
        <PostsFeed
          posts={posts}
          isError={isError}
          isLoading={isLoading}
          refetchPostById={refetchPostById}
          pb={6}
        />
      ) : null}
    </StyledRoot>
  );
}
