import { Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import Post from '@/components/molecules/Post';
import { useFetchUserQuery } from '@/features/userAPI';
import { PostsFeedProps } from './types';

export default function PostsFeed({ posts, ...rootProps }: PostsFeedProps) {
  return (
    <StyledRoot {...rootProps}>
      {posts.map((post) => (
        <Post key={post.id} post={post}></Post>
      ))}
    </StyledRoot>
  );
}
