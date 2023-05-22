import { Box, ButtonBase, Stack, Typography, useTheme } from '@mui/material';

import { StyledBasicInfoContainer, StyledProfilePictureButton, StyledRoot } from './styles';

import ContentDevider from '@/components/atoms/ContentDevider';
import FriendsButton from '@/components/atoms/FriendsButton';
import Icon from '@/components/atoms/Icon/Icon';
import LazyImage from '@/components/atoms/LazyImage';
import MessageButton from '@/components/atoms/MessageButton';
import UserAvatar from '@/components/atoms/UserAvatar';
import FullPageAccountPicturesView from '@/components/organisms/FullPagePhotosView/FullPageAccountPicturesView';
import { useFetchLoggedUserQuery } from '@/features/userAPI';
import useFetchUsersPictures from '@/hooks/useFetchUsersPictures';
import { useState } from 'react';
import { UserInfoSectionProps } from './types';

export default function UserInfoSection({ userData, sx, ...rootProps }: UserInfoSectionProps) {
  const theme = useTheme();
  const { data: loggedUser } = useFetchLoggedUserQuery({});
  const { isLoading, isError, picturesMap } = useFetchUsersPictures(userData.id);
  const profilePictureData = picturesMap
    ? picturesMap.account[userData?.profilePictureId || '']
    : null;
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);

  const friendsCount = Object.keys(userData.friends.accepted).length || 0;
  const mutalFriends = Object.values(userData.friends.accepted).filter((friend) => {
    if (!loggedUser?.friends.accepted) return false;
    return Object.values(loggedUser?.friends.accepted).some(
      (loggedUserFriend) => loggedUserFriend.friendId === friend.friendId,
    );
  });

  const containerHeight = '140px';
  return (
    <>
      {isFullViewOpen && profilePictureData && !isLoading && !isError && (
        <FullPageAccountPicturesView
          setOpen={setIsFullViewOpen}
          initialPhoto={profilePictureData}
          ownerId={userData.id}
        />
      )}
      <StyledRoot sx={sx} {...rootProps}>
        <StyledBasicInfoContainer>
          <Box height={containerHeight}>
            <StyledProfilePictureButton onClick={() => setIsFullViewOpen(true)}>
              <LazyImage
                unoptimized
                alt={`${userData?.firstName}'s Profile Picture`}
                src={profilePictureData?.url || userData?.pictureUrl || ''}
                fill
                style={{ objectFit: 'cover' }}
              />
            </StyledProfilePictureButton>
          </Box>
          <Stack direction='row' width='100%' justifyContent='space-between'>
            <Stack padding={theme.spacing(2)}>
              <Typography variant='h4' fontWeight={700}>
                {userData?.firstName} {userData?.lastName}
              </Typography>
              <Typography variant='subtitle1' fontWeight={600} color={theme.palette.text.secondary}>
                {friendsCount} friends • {mutalFriends.length} mutual
              </Typography>
              <Stack direction='row' mt={0.8} ml={1}>
                {mutalFriends.slice(0, 8).map((friend, i) => (
                  <UserAvatar
                    key={friend.friendId}
                    userId={friend.friendId}
                    size={30}
                    sx={{
                      zIndex: 10 - i,
                      boxShadow: `0 0 0 2px ${theme.palette.secondary.light}`,
                      marginLeft: theme.spacing(-0.7),
                    }}
                  />
                ))}
              </Stack>
            </Stack>
            <Stack
              direction='row'
              justifyContent='center'
              alignSelf='flex-end'
              spacing={1}
              mb={1}
              height={36}>
              <FriendsButton friendsMap={userData.friends} />
              <MessageButton />
              <ButtonBase
                focusRipple
                sx={{
                  height: '100%',
                  padding: theme.spacing(0, 2.5),
                  bgcolor: theme.palette.secondary.dark,
                  borderRadius: theme.spacing(0.75),
                }}>
                <Icon icon='caret-down' />
              </ButtonBase>
            </Stack>
          </Stack>
          <ContentDevider sx={{ bottom: 0 }} />
        </StyledBasicInfoContainer>
      </StyledRoot>
    </>
  );
}
