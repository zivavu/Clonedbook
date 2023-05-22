import { Stack } from '@mui/material';

import IntroTile from '@/components/molecules/PageTiles/IntroTile';
import PicturesTile from '@/components/molecules/PageTiles/PicturesTile';
import WriteSomethingTile from '@/components/molecules/PageTiles/WriteSomethingTile';
import PostsFeed from '@/components/organisms/PostsFeed';
import useFetchUsersPosts from '@/hooks/useFetchUsersPosts';
import { PostsTabProps } from './types';

export default function PostsTab({
  userId,
  profileData,
  loggedUser,
  sx,
  ...rootProps
}: PostsTabProps) {
  const { posts, isLoading: arePostsLoading, isError: isPostsError } = useFetchUsersPosts(userId);

  return (
    <Stack direction='row' spacing={2} minHeight='100vh' sx={sx} {...rootProps}>
      {profileData && (
        <Stack width='43%' spacing={2}>
          <IntroTile user={profileData} />
          <PicturesTile user={profileData} />
        </Stack>
      )}
      <Stack width='57%'>
        {!!loggedUser && <WriteSomethingTile user={loggedUser} mb={2} />}
        {!arePostsLoading && !isPostsError && posts && posts.length > 0 ? (
          <PostsFeed posts={posts} isLoading={arePostsLoading} isError={isPostsError}></PostsFeed>
        ) : null}
      </Stack>
    </Stack>
  );
}
