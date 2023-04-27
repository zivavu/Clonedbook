import { StyledRoot } from './styles';

import CreatePostTile from '@/components/molecules/CreatePostTile';
import FeedPost from '@/components/molecules/FeedPost';
import { useFetchUserQuery } from '@/features/userAPI';
import { IBasicUserInfo, IUser } from '@/types/user';
import { PostsFeedProps } from './types';

export default function PostsFeed({ posts, ...rootProps }: PostsFeedProps) {
  const { data: user } = useFetchUserQuery({});

  return (
    <StyledRoot {...rootProps}>
      {user && <CreatePostTile user={user as IUser} />}
      {posts.map((post) => (
        <FeedPost key={post.id} post={post}></FeedPost>
      ))}
    </StyledRoot>
  );
}
