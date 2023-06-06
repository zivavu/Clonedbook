import Icon from '@/components/atoms/Icon/Icon';
import UserAvatar from '@/components/atoms/UserAvatar';

import { useAllUsersBasicInfoQuery } from '@/redux/services/allUsersPublicData';
import { useLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { IFriendWithBasicInfo } from '@/types/firend';
import {
  Box,
  BoxProps,
  IconButton,
  List,
  ListItemButton,
  OutlinedInput,
  Typography,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { StyledHeadingContainer, StyledRoot } from './styles';

export default function ContactsSidebar({ sx, ...rootProps }: BoxProps) {
  const { data: loggedUser } = useLoggedUserQuery({});
  const { data: everyUserBasicInfo } = useAllUsersBasicInfoQuery({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [friends, setFriends] = useState<IFriendWithBasicInfo[] | []>([]);
  useEffect(() => {
    if (loggedUser && everyUserBasicInfo) {
      const friendsWithBasicInfo = Object.values(loggedUser.friends)
        .filter((friend) => friend.status === 'accepted')
        .map((friend) => {
          const friendData = everyUserBasicInfo[friend.id];
          return { basicInfo: friendData, ...friend } as IFriendWithBasicInfo;
        })
        .sort((a, b) => b.acceptedAt.seconds - a.acceptedAt.seconds);
      setFriends(friendsWithBasicInfo);
    }
  }, [loggedUser, everyUserBasicInfo]);

  function handleSearchButtonClick() {
    setIsSearchOpen((prev) => !prev);
    setSearchValue('');
  }

  const theme = useTheme();
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <StyledHeadingContainer>
        <Typography variant='subtitle1' fontWeight={400}>
          Contacts
        </Typography>
        <IconButton size='small' onClick={handleSearchButtonClick}>
          <Icon icon='magnifying-glass' size='sm' />
        </IconButton>
      </StyledHeadingContainer>
      {isSearchOpen && (
        <Box>
          <OutlinedInput
            size='small'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            fullWidth
            placeholder='Search'
            sx={{
              backgroundColor: theme.palette.background.paper,
              mb: theme.spacing(1),
            }}
          />
        </Box>
      )}
      <List sx={{ pt: theme.spacing(0) }}>
        {friends
          .filter((friend) => {
            const friendUserName = (
              friend.basicInfo.firstName + friend.basicInfo.lastName
            ).toLowerCase();
            const searchValueLowerCase = searchValue.toLowerCase();
            return friendUserName.includes(searchValueLowerCase);
          })
          .slice(0, 20)
          .map((friend) => {
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
