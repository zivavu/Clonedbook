import { StyledRoot } from './styles';

import IntroTile from '@/components/molecules/PageTiles/IntroTile';
import PicturesTile from '@/components/molecules/PageTiles/PicturesTile';
import WriteSomethingTile from '@/components/molecules/PageTiles/WriteSomethingTile';
import PostsFeed from '@/components/organisms/PostsFeed';
import { useFetchLoggedUserQuery } from '@/features/userAPI';
import { useFetchAllUserData } from '@/hooks/useFetchAllUserData';
import useFetchUsersPosts from '@/hooks/useFetchUsersPosts';
import { IUser } from '@/types/user';
import { Box, Container, Stack, useTheme } from '@mui/material';
import BackgroundPicture from './BackgroundPicture';
import ProfileTabToggleGroup from './ProfileTabToggleGroup';
import UserInfoSection from './UserInfoSection';
import { ProfileProps } from './types';

export default function Profile({ userId, sx, ...rootProps }: ProfileProps) {
  const theme = useTheme();
  const { userData: profileData, isLoading: isUserLoading, isError } = useFetchAllUserData(userId);
  const { data: loggedUser } = useFetchLoggedUserQuery({});
  const { posts, isLoading: arePostsLoading, isError: isPostsError } = useFetchUsersPosts(userId);
  return isUserLoading || isError || !profileData ? null : (
    <StyledRoot sx={sx} {...rootProps}>
      <Box bgcolor={theme.palette.secondary.light} boxShadow={`rgba(0, 0, 0, 0.1) 0px 1px 2px 0px`}>
        <BackgroundPicture userData={profileData} />
        <Container>
          <UserInfoSection userData={profileData} />
          <ProfileTabToggleGroup />
        </Container>
      </Box>
      <Container sx={{ mt: 2 }}>
        <Stack direction='row' spacing={2}>
          <Stack width='43%' spacing={2}>
            <IntroTile user={profileData as IUser} />
            <PicturesTile user={profileData} />
          </Stack>
          <Stack width='57%'>
            {!!loggedUser && <WriteSomethingTile user={loggedUser} mb={2} />}
            {!arePostsLoading && !isPostsError && posts && posts.length > 0 ? (
              <PostsFeed
                posts={posts}
                isLoading={arePostsLoading}
                isError={isPostsError}></PostsFeed>
            ) : null}
          </Stack>
        </Stack>
      </Container>
    </StyledRoot>
  );
}
