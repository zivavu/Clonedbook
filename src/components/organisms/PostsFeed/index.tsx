import { StyledRoot } from './styles';

import FeedPost from '@/components/organisms/FeedPost';
import { Stack } from '@mui/material';
import LoadingPostPlaceholder from '../FeedPost/LoadingPostPlaceholder';
import { PostsFeedProps } from './types';

export default function PostsFeed({
  posts,
  isLoading,
  isError,
  refetchPost,
  sx,
  ...rootProps
}: PostsFeedProps) {
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Stack spacing={2}>
        {posts.map((post) => (
          <FeedPost key={post.id} post={post} refetchPost={() => refetchPost(post.id)}></FeedPost>
        ))}
        {isLoading && (
          <>
            <LoadingPostPlaceholder />
            <LoadingPostPlaceholder />
          </>
        )}
      </Stack>
    </StyledRoot>
  );
}
