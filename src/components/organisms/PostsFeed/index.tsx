import { StyledRoot } from './styles';

import FeedPost from '@/components/organisms/FeedPost';
import { Stack } from '@mui/material';
import { PostsFeedProps } from './types';

export default function PostsFeed({ posts, ...rootProps }: PostsFeedProps) {
  return (
    <StyledRoot {...rootProps}>
      <Stack spacing={2}>
        {posts.map((post) => (
          <FeedPost key={post.id} post={post}></FeedPost>
        ))}
      </Stack>
    </StyledRoot>
  );
}
