import { StyledRoot } from './styles';

import FeedPost from '@/components/molecules/FeedPost';
import { PostsFeedProps } from './types';

export default function PostsFeed({ posts, ...rootProps }: PostsFeedProps) {
  return (
    <StyledRoot {...rootProps}>
      {posts.map((post) => (
        <FeedPost key={post.id} post={post}></FeedPost>
      ))}
    </StyledRoot>
  );
}
