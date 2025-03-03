import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import { StyledBasicInfoContainer, StyledProfilePictureButton, StyledRoot } from './styles';

import getAcceptedFriends from '@/common/friendsManage/getAcceptedFriends';
import useGetMutualFriends from '@/common/friendsManage/useGetMutualFriends';
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
  const mutualFriends = useGetMutualFriends(userId);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const pictureContainerHeight = isMobile ? '100px' : '140px';
  return (
    <>
      <StyledRoot sx={sx} {...rootProps}>
        <StyledBasicInfoContainer>
          <Box height={pictureContainerHeight}>
            <StyledProfilePictureButton onClick={() => setIsFullViewOpen(true)}>
              <ImageWithGradientLoading
                alt={`${userData?.firstName}'s Profile Picture`}
                sizes='350px'
                type='profile'
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

          <Stack
            direction={isMobile ? 'column' : 'row'}
            width='100%'
            alignItems='center'
            textAlign={isMobile ? 'center' : 'left'}
            justifyContent='space-between'>
            <Stack padding={theme.spacing(2)}>
              <Typography variant='h4' fontWeight={700}>
                {userData?.firstName} {userData?.lastName}
              </Typography>

              <Typography variant='subtitle1' fontWeight={600} color={theme.palette.text.secondary}>
                {friendsCount} friends{' '}
                {loggedUser?.id !== userId && `• ${mutualFriends.length} mutual`}
              </Typography>

              <Stack direction='row' mt={0.8}>
                {mutualFriends.slice(0, 8).map((friend, i) => (
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
              alignSelf={isMobile ? 'center' : 'flex-end'}
              spacing={1.3}
              mb={1}
              height={36}>
              <AddFriendButton
                friendId={userId}
                allowMenu={true}
                refetchOtherUser={refetchUser}
                showIcon={!isXs}
              />
              <MessageButton userId={userId} showIcon={!isXs} />
              <LoginAsUserButton userId={userId} showIcon={!isXs} />
            </Stack>
          </Stack>

          <HorizontalContentDevider sx={{ bottom: 0 }} />
        </StyledBasicInfoContainer>
      </StyledRoot>
      {isFullViewOpen && profilePictureData && (
        <FullPageAccountPicturesView
          setOpen={setIsFullViewOpen}
          initialPhoto={profilePictureData}
          ownerId={userId}
        />
      )}
    </>
  );
}
