import { Box, Stack, Typography, useTheme } from '@mui/material';

import { StyledBasicInfoContainer, StyledProfilePictureButton, StyledRoot } from './styles';

import getAcceptedFriends from '@/common/friendsManage/getAcceptedFriends';
import useGetMutalFriends from '@/common/friendsManage/useGetMutalFriends';
import ImageWithGradientLoading from '@/components/atoms/ImageWithGradientLoading';
import UserAvatar from '@/components/atoms/UserAvatar';
import HorizontalContentDevider from '@/components/atoms/contentDeviders/HorizontalContentDevider';
import AddFriendButton from '@/components/atoms/friendActionButtons/AddFriendButton';
import LoginAsUserButton from '@/components/atoms/friendActionButtons/LoginAsUserButton';
import MessageButton from '@/components/atoms/friendActionButtons/MessageButton';
import FullPageAccountPicturesView from '@/components/organisms/FullPagePhotosView/variants/FullPageAccountPicturesView';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { useUserPicturesByIdQuery } from '@/redux/services/userDataAPI';
import { useState } from 'react';
import { UserInfoSectionProps } from './types';

export default function UserInfoSection({
  userId,
  userData,
  refetchUser,
  sx,
  ...rootProps
}: UserInfoSectionProps) {
  const theme = useTheme();
  const { data: picturesMap } = useUserPicturesByIdQuery(userId);
  const { data: loggedUser } = useGetLoggedUserQuery({});

  const profilePictureData = picturesMap
    ? picturesMap.account[userData?.profilePictureId || '']
    : null;
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);

  const friendsCount = getAcceptedFriends(userData).length || 0;
  const mutalFriends = useGetMutalFriends(userId);

  const containerHeight = '140px';
  return (
    <>
      {isFullViewOpen && profilePictureData && (
        <FullPageAccountPicturesView
          setOpen={setIsFullViewOpen}
          initialPhoto={profilePictureData}
          ownerId={userId}
        />
      )}
      <StyledRoot sx={sx} {...rootProps}>
        <StyledBasicInfoContainer>
          <Box height={containerHeight}>
            <StyledProfilePictureButton onClick={() => setIsFullViewOpen(true)}>
              <ImageWithGradientLoading
                alt={`${userData?.firstName}'s Profile Picture`}
                sizes='250px'
                src={profilePictureData?.image.url || ''}
                blurDataURL={profilePictureData?.image.blurDataUrl || ''}
                placeholder='blur'
                fill
                style={{
                  objectFit: 'cover',
                  backgroundColor: profilePictureData?.image.dominantHex,
                }}
              />
            </StyledProfilePictureButton>
          </Box>
          <Stack direction='row' width='100%' justifyContent='space-between'>
            <Stack padding={theme.spacing(2)}>
              <Typography variant='h4' fontWeight={700}>
                {userData?.firstName} {userData?.lastName}
              </Typography>
              <Typography variant='subtitle1' fontWeight={600} color={theme.palette.text.secondary}>
                {friendsCount} friends{' '}
                {loggedUser?.id !== userId && `• ${mutalFriends.length} mutual`}
              </Typography>
              <Stack direction='row' mt={0.8} ml={1}>
                {mutalFriends.slice(0, 8).map((friend, i) => (
                  <UserAvatar
                    key={friend.id}
                    userId={friend.id}
                    size={30}
                    showBorder={true}
                    sx={{
                      zIndex: 10 - i,
                      marginLeft: theme.spacing(-0.5),
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
              <AddFriendButton friendId={userId} allowMenu={true} refetchOtherUser={refetchUser} />
              <MessageButton userId={userId} />
              <LoginAsUserButton userId={userId} />
            </Stack>
          </Stack>
          <HorizontalContentDevider sx={{ bottom: 0 }} />
        </StyledBasicInfoContainer>
      </StyledRoot>
    </>
  );
}
