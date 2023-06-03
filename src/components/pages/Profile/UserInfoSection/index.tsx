import { Box, ButtonBase, Stack, Typography, useTheme } from '@mui/material';

import { StyledBasicInfoContainer, StyledProfilePictureButton, StyledRoot } from './styles';

import getAcceptedFriends from '@/common/friendsManage/getAcceptedFriends';
import useGetMutalFriends from '@/common/friendsManage/useGetMutalFriends';
import AddFriendButton from '@/components/atoms/AddFriendButton';
import HorizontalContentDevider from '@/components/atoms/ContentDeviders/HorizontalContentDevider';
import Icon from '@/components/atoms/Icon/Icon';
import ImageWithGradientLoading from '@/components/atoms/ImageWithGradientLoading';
import MessageButton from '@/components/atoms/MessageButton';
import UserAvatar from '@/components/atoms/UserAvatar';
import FullPageAccountPicturesView from '@/components/organisms/FullPagePhotosView/FullPageAccountPicturesView';
import { useState } from 'react';
import { UserInfoSectionProps } from './types';

export default function UserInfoSection({
  userData,
  picturesMap,
  sx,
  ...rootProps
}: UserInfoSectionProps) {
  const theme = useTheme();
  const profilePictureData = picturesMap
    ? picturesMap.account[userData?.profilePictureId || '']
    : null;
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);

  const friendsCount = getAcceptedFriends(userData).length || 0;
  const mutalFriends = useGetMutalFriends(userData.id);

  const containerHeight = '140px';
  return (
    <>
      {isFullViewOpen && profilePictureData && (
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
              <ImageWithGradientLoading
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
              <AddFriendButton friendId={userData.id} />
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
          <HorizontalContentDevider sx={{ bottom: 0 }} />
        </StyledBasicInfoContainer>
      </StyledRoot>
    </>
  );
}
