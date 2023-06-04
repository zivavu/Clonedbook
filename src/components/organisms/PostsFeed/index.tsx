import { StyledRoot } from './styles';

import FeedPost from '@/components/organisms/FeedPost';
import LoadingPostPlaceholder from '../FeedPost/LoadingPostPlaceholder';
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
      {posts.map((post) => (
        <FeedPost key={post.id} post={post} refetchPost={() => refetchPostById(post.id)}></FeedPost>
      ))}
      {isLoading && (
        <>
          <LoadingPostPlaceholder />
          <LoadingPostPlaceholder />
        </>
      )}
    </StyledRoot>
  );
}
