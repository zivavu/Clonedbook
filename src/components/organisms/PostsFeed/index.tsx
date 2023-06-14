import { StyledRoot } from './styles';

import LoadingPostPlaceholder from '@/components/molecules/postCustomTiles/LoadingPostPlaceholder';
import PostsErrorPlaceholder from '@/components/molecules/postCustomTiles/PostsErrorPlaceholder';
import FeedPost from '@/components/organisms/FeedPost';
import { PostsFeedProps } from './types';

export default function PostsFeed({
  posts,
  isLoading,
  isError,
  refetchPostById,
  sx,
  ...rootProps
}: PostsFeedProps) {
  return (
    <StyledRoot sx={sx} {...rootProps} spacing={2}>
      {posts.map((post) => {
        return <FeedPost key={post.id} post={post} refetchPost={() => refetchPostById(post.id)} />;
      })}
      {isError && <PostsErrorPlaceholder />}
      {isLoading && (
        <>
          <LoadingPostPlaceholder />
          <LoadingPostPlaceholder />
        </>
      )}
    </StyledRoot>
  );
}
