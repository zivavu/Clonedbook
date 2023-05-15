import { Box, Stack, Typography, useTheme } from '@mui/material';

import {
  StyledBacgroundPictureContainer,
  StyledBasicInfoContainer,
  StyledPictureGradient,
  StyledProfilePictureContainer,
  StyledRoot,
} from './styles';

import ContentDevider from '@/components/atoms/ContentDevider';
import FriendsButton from '@/components/atoms/FriendsButton';
import MessageButton from '@/components/atoms/MessageButton';
import UserAvatar from '@/components/atoms/UserAvatar';
import { useFetchUserQuery } from '@/features/userAPI';
import Image from 'next/image';
import { UserInfoSectionProps } from './types';

export default function UserInfoSection({ userData, sx, ...rootProps }: UserInfoSectionProps) {
  const theme = useTheme();
  const { data: loggedUser } = useFetchUserQuery({});
  const friendsCount = Object.keys(userData.friends.accepted).length || 0;

  const mutalFriends = Object.values(userData.friends.accepted).filter((friend) => {
    if (!loggedUser?.friends.accepted) return false;
    return Object.values(loggedUser?.friends.accepted).some(
      (loggedUserFriend) => loggedUserFriend.friendId === friend.friendId,
    );
  });

  const containerHeight = '140px';
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <StyledPictureGradient />
      <StyledBacgroundPictureContainer>
        <Image
          unoptimized
          alt={`${userData?.firstName}'s Bacground Picture`}
          src={userData?.backgroundPicture || ''}
          fill
          style={{ objectFit: 'cover' }}
        />
      </StyledBacgroundPictureContainer>
      <StyledBasicInfoContainer>
        <Box height={containerHeight}>
          <StyledProfilePictureContainer>
            <Image
              unoptimized
              alt={`${userData?.firstName}'s Profile Picture`}
              src={userData?.profilePicture || ''}
              fill
              style={{ objectFit: 'cover' }}
            />
          </StyledProfilePictureContainer>
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
          <Stack direction='row' alignItems='flex-end' justifyContent='center'>
            <FriendsButton friendsMap={userData.friends} />
            <MessageButton />
          </Stack>
        </Stack>
        <ContentDevider sx={{ bottom: 0 }} />
      </StyledBasicInfoContainer>
    </StyledRoot>
  );
}
