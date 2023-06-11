import Icon from '@/components/atoms/Icon/Icon';

import { useAllUsersBasicInfoQuery } from '@/redux/services/allUsersPublicDataAPI';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { IFriendWithBasicInfo } from '@/types/firend';
import {
  Box,
  BoxProps,
  IconButton,
  List,
  OutlinedInput,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import FriendListItem from './FriendListItem';
import { StyledHeadingContainer, StyledRoot } from './styles';

export default function ContactsSidebar({ sx, ...rootProps }: BoxProps) {
  const theme = useTheme();

  const { data: loggedUser } = useGetLoggedUserQuery({});
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

  const friendsToRender = searchValue
    ? friends.filter((friend) => {
        const friendUserName = (
          friend.basicInfo.firstName + friend.basicInfo.lastName
        ).toLowerCase();
        const searchValueLowerCase = searchValue.toLowerCase();
        return friendUserName.includes(searchValueLowerCase);
      })
    : friends;
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
            placeholder='Search contacts'
            sx={{
              backgroundColor: theme.palette.background.paper,
              mb: theme.spacing(1),
            }}
          />
        </Box>
      )}
      <List sx={{ pt: theme.spacing(0) }}>
        {friendsToRender.slice(0, 20).map((friend) => (
          <FriendListItem key={friend.id} friend={friend} />
        ))}
      </List>
    </StyledRoot>
  );
}
