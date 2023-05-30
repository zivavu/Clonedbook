import Icon from '@/components/atoms/Icon/Icon';
import UserAvatar from '@/components/atoms/UserAvatar';

import { useFetchLoggedUserQuery } from '@/redux/services/userAPI';
import { useFetchUsersBasicInfoQuery } from '@/redux/services/usersBasicInfoAPI';
import { IFriendWithBasicInfo } from '@/types/firend';
import {
  Box,
  BoxProps,
  IconButton,
  List,
  ListItemButton,
  Typography,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { StyledHeadingContainer, StyledRoot } from './styles';

export default function ContactsSidebar({ sx, ...rootProps }: BoxProps) {
  const { data: userData } = useFetchLoggedUserQuery({});
  const { data: everyUserData } = useFetchUsersBasicInfoQuery({});
  const [friends, setFriends] = useState<IFriendWithBasicInfo[] | []>([]);

  useEffect(() => {
    if (userData && everyUserData) {
      const friendsWithBasicInfo = Object.values(userData.friends)
        .filter((friend) => friend.status === 'accepted')
        .map((friend) => {
          const friendData = everyUserData[friend.id];
          return { basicInfo: friendData, ...friend } as IFriendWithBasicInfo;
        });
      setFriends(friendsWithBasicInfo);
    }
  }, [userData, everyUserData]);

  const theme = useTheme();
  return (
    <StyledRoot sx={sx} {...rootProps}>
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
              component={Link}
              href={`/profile/${friend.id}`}
              key={friend.id}
              sx={{ pl: theme.spacing(1) }}>
              <UserAvatar
                userId={friend.id}
                useLink={false}
                sx={{ mr: theme.spacing(1.5), width: 36, height: 36 }}
              />
              <Typography variant='body1'>
                {friend.basicInfo.firstName} {friend.basicInfo.lastName}
              </Typography>
            </ListItemButton>
          );
        })}
      </List>
    </StyledRoot>
  );
}
