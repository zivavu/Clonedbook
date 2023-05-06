import { StyledRoot } from './styles';

import WhatsOnYourMindBox from '@/components/molecules/WhatsOnYourMindBox';
import FeedPost from '@/components/organisms/FeedPost';
import { useFetchUserQuery } from '@/features/userAPI';
import { PostsFeedProps } from './types';

export default function PostsFeed({ posts, ...rootProps }: PostsFeedProps) {
  const { data: user } = useFetchUserQuery({});

  return (
    <StyledRoot {...rootProps}>
      {user?.profileId && <WhatsOnYourMindBox user={user} />}
      {posts.map((post) => (
        <FeedPost key={post.id} post={post}></FeedPost>
      ))}
    </StyledRoot>
  );
}
