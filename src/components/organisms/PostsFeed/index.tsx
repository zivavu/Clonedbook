import { StyledRoot } from './styles';

import FeedPost from '@/components/organisms/FeedPost';
import LoadingPostPlaceholder from '@/components/organisms/FeedPost/customPostTemplates/LoadingPostPlaceholder';
import PostsErrorPlaceholder from '@/components/organisms/FeedPost/customPostTemplates/PostsErrorPlaceholder';
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
          <LoadingPostPlaceholder />
          <LoadingPostPlaceholder />
        </>
      )}
    </StyledRoot>
  );
}
