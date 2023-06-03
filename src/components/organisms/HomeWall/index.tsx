import { StyledRoot } from './styles';

import WriteSomethingTile from '@/components/molecules/PageTiles/WriteSomethingTile';
import usePostsInfiniteScrolling from '@/common/misc/usePostsInfiniteScrolling';
import PostsFeed from '../PostsFeed';
import { HomeWallProps } from './types';

export default function HomeWall({ sx, ...rootProps }: HomeWallProps) {
  const { posts, isError, isLoading } = usePostsInfiniteScrolling({
    type: 'homeWall',
  });

  return (
    <StyledRoot sx={sx} {...rootProps}>
      <WriteSomethingTile mb={2} />
      {posts ? <PostsFeed posts={posts} isError={isError} isLoading={isLoading} /> : null}
    </StyledRoot>
  );
}
