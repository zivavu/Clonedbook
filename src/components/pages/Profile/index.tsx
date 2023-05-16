import { StyledRoot } from './styles';

import IntroTile from '@/components/molecules/PageTiles/IntroTile';
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
  const { posts, isLoading: arePostsLoading, error } = useFetchUsersPosts(userId);
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
          <Stack width='40%'>
            <IntroTile user={profileData as IUser} />
          </Stack>
          <Stack width='60%'>
            {!!loggedUser && <WriteSomethingTile user={loggedUser as IUser} />}
            {!arePostsLoading && !error && posts && posts.length > 0 ? (
              <PostsFeed posts={posts}></PostsFeed>
            ) : null}
          </Stack>
        </Stack>
      </Container>
    </StyledRoot>
  );
}
