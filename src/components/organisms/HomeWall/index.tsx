import { StyledRoot } from './styles';

import { useFetchPostsQuery } from '@/features/postsAPI';
import PostsFeed from '../PostsFeed';
import { HomeWallProps } from './types';

export default function HomeWall({ ...rootProps }: HomeWallProps) {
  const { data } = useFetchPostsQuery({});
  console.log(data);
  return <StyledRoot {...rootProps}>{data ? <PostsFeed posts={data} /> : null}</StyledRoot>;
}
