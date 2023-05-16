import Icon from '@/components/atoms/Icon/Icon';
import UserAvatar from '@/components/atoms/UserAvatar';
import { useFetchLoggedUserQuery } from '@/features/userAPI';
import { useFetchUsersPublicDataQuery } from '@/features/usersPublicDataAPI';
import { IFriendWithBasicInfo } from '@/types/firend';
import { Box, IconButton, List, ListItemButton, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { StyledHeadingContainer, StyledRoot } from './styles';
import { ContactsSidebarProps } from './types';

export default function ContactsSidebar({ ...rootProps }: ContactsSidebarProps) {
  const { data: userData } = useFetchLoggedUserQuery({});
  const { data: allUsersData } = useFetchUsersPublicDataQuery({});
  const [friends, setFriends] = useState<IFriendWithBasicInfo[] | []>([]);

  useEffect(() => {
    if (userData && allUsersData) {
      const friendsWithBasicInfo = Object.entries(userData.friends.accepted).map(
        ([connection, friend]) => {
          const friendData = allUsersData[friend.friendId];
          return { basicInfo: friendData, ...friend } as IFriendWithBasicInfo;
        },
      );
      setFriends(friendsWithBasicInfo);
    }
  }, [userData, allUsersData]);

  const theme = useTheme();
  return (
    <StyledRoot {...rootProps}>
      <Box>
        <StyledHeadingContainer>
          <Typography variant='subtitle1' fontWeight={400}>
            Contacts
          </Typography>
          <Box
            sx={{
              width: '20%',
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <IconButton size='small'>
              <Icon icon='magnifying-glass' size='sm' />
            </IconButton>
            <IconButton size='small'>
              <Icon icon='ellipsis' />
            </IconButton>
          </Box>
        </StyledHeadingContainer>
        <List sx={{ pt: theme.spacing(0) }}>
          {friends.slice(0, 30).map((friend) => {
            return (
              <ListItemButton
                LinkComponent={Link}
                href={`/profile/${friend.friendId}`}
                key={friend.friendId}
                sx={{ pl: theme.spacing(1) }}>
                <UserAvatar
                  sx={{ mr: theme.spacing(1.5), width: 36, height: 36 }}
                  src={friend.basicInfo.profilePicture || ''}
                />
                <Typography variant='body1'>
                  {friend.basicInfo.firstName} {friend.basicInfo.lastName}
                </Typography>
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </StyledRoot>
  );
}
