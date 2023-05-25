import { Stack, useTheme } from '@mui/material';

import { InvisibleScrollableStack } from '@/components/atoms/Scrollables/ScrollableStack';
import FriendsTile from '@/components/molecules/PageTiles/FriendsTile';
import IntroTile from '@/components/molecules/PageTiles/IntroTile';
import PicturesTile from '@/components/molecules/PageTiles/PicturesTile';
import WriteSomethingTile from '@/components/molecules/PageTiles/WriteSomethingTile';
import { NAVBAR_HEIGHT } from '@/components/organisms/NavBar';
import PostsFeed from '@/components/organisms/PostsFeed';
import { useFetchLoggedUserQuery } from '@/features/userAPI';
import useFetchUsersPosts from '@/hooks/useFetchUsersPosts';
import { PostsTabProps } from './types';

export default function PostsTab({ userId, profileData, sx, ...rootProps }: PostsTabProps) {
  const { posts, isLoading: arePostsLoading, isError: isPostsError } = useFetchUsersPosts(userId);
  const loggedUser = useFetchLoggedUserQuery({});
  const theme = useTheme();
  return (
    <>
      <Stack direction='row' spacing={2} sx={sx} {...rootProps}>
        {profileData && (
          <InvisibleScrollableStack
            width='43%'
            spacing={2}
            borderRadius={1}
            maxHeight={`calc(100vh - ${NAVBAR_HEIGHT} - ${theme.spacing(2)})`}
            position='sticky'
            top={`calc(${NAVBAR_HEIGHT})`}>
            <IntroTile user={profileData} />
            <PicturesTile user={profileData} />
            <FriendsTile friend={profileData} friendsLimit={9} />
          </InvisibleScrollableStack>
        )}
        <Stack width='57%' spacing={2}>
          {!!loggedUser && <WriteSomethingTile />}
          {!arePostsLoading && !isPostsError && posts && posts.length > 0 ? (
            <PostsFeed posts={posts} isLoading={arePostsLoading} isError={isPostsError}></PostsFeed>
          ) : null}
        </Stack>
      </Stack>
    </>
  );
}
