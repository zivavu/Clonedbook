import { Stack, useMediaQuery, useTheme } from '@mui/material';

import { NoBarScrollableStack } from '@/components/atoms/scrollables/ScrollableStack';
import FriendsTile from '@/components/molecules/PageTiles/FriendsTile';
import IntroTile from '@/components/molecules/PageTiles/IntroTile';
import PicturesTile from '@/components/molecules/PageTiles/PicturesTile';
import WriteSomethingTile from '@/components/molecules/PageTiles/WriteSomethingTile';
import BornAtPostTile from '@/components/organisms/FeedPost/customPostTemplates/BornAtTile';
import NoPostsTile from '@/components/organisms/FeedPost/customPostTemplates/NoPostsTile';
import { NAVBAR_HEIGHT } from '@/components/organisms/NavBar';
import PostsFeed from '@/components/organisms/PostsFeed';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import usePostsInfiniteScrolling from '@/services/posts/usePostsInfiniteScrolling';
import { PostsTabProps } from './types';

export default function PostsTab({ userId, profileData, sx, ...rootProps }: PostsTabProps) {
  const theme = useTheme();
  const { posts, isError, isLoading, refetchPostById } = usePostsInfiniteScrolling({
    type: 'profileFeed',
    wallOwnerId: userId,
  });
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const mainDirection = useMediaQuery(theme.breakpoints.down('md')) ? 'column' : 'row';
  return (
    <>
      <Stack direction={mainDirection} spacing={2} sx={sx} {...rootProps}>
        {profileData && (
          <NoBarScrollableStack
            width={mainDirection === 'column' ? '100%' : '45%'}
            spacing={2}
            borderRadius={1}
            maxHeight={
              mainDirection === 'row'
                ? `calc(100vh - ${NAVBAR_HEIGHT} - ${theme.spacing(2)})`
                : 'none'
            }
            position={mainDirection === 'column' ? 'static' : 'sticky'}
            top={`calc(${NAVBAR_HEIGHT})`}>
            <IntroTile user={profileData} />
            <PicturesTile user={profileData} />
            <FriendsTile user={profileData} />
          </NoBarScrollableStack>
        )}
        <Stack width={mainDirection === 'column' ? '100%' : '55%'} spacing={2}>
          {loggedUser?.id === profileData.id && (
            <WriteSomethingTile refetchPostById={refetchPostById} />
          )}
          {posts && posts[0] && (
            <PostsFeed
              posts={posts}
              isLoading={isLoading}
              isError={isError}
              refetchPostById={refetchPostById}
            />
          )}
          {!posts[0] && !isLoading && !isError && <NoPostsTile wallOwnerId={userId} />}
          {!isLoading && <BornAtPostTile userId={userId} />}
        </Stack>
      </Stack>
    </>
  );
}
