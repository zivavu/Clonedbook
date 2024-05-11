import { IconButton, List, Typography, useTheme } from '@mui/material';

import getChatNewestMessage from '@/common/chatsManage/getChatLastMessage';
import Icon from '@/components/atoms/Icon/Icon';
import ScrollableStack from '@/components/atoms/scrollables/ScrollableStack';
import { useGetUserChatsQuery } from '@/redux/services/loggedUserAPI';
import { useEffect } from 'react';
import ListUserButton from './ListUserButton';
import { StyledContentWrapper, StyledHeaderContainer } from './styles';
import { ChatsListPopperProps } from './types';

export default function ChatsListPopper({
  sx,
  handleClose,
  open,
  anchorEl,
  ...rootProps
}: ChatsListPopperProps) {
  const theme = useTheme();
  const { data: loggedUserChats, refetch } = useGetUserChatsQuery({});

  useEffect(() => {
    if (open) refetch();
  }, [open, refetch]);

  const sortedChats =
    loggedUserChats &&
    [...loggedUserChats].sort(
      (a, b) =>
        getChatNewestMessage(b).createdAt?.seconds - getChatNewestMessage(a).createdAt?.seconds,
    );

  if (!open) return null;

  return (
    <StyledContentWrapper>
      <ScrollableStack p={1} pt={0}>
        <StyledHeaderContainer>
          <Typography variant='h3' fontWeight={700}>
            Chats
          </Typography>
          <IconButton onClick={handleClose} sx={{ marginRight: 1, width: '30px', height: '30px' }}>
            <Icon icon='xmark' fontSize={22} />
          </IconButton>
        </StyledHeaderContainer>
        <List>
          {sortedChats?.map((chat) => (
            <ListUserButton key={chat.id} chat={chat} handlePopperClose={handleClose} />
          ))}
        </List>
      </ScrollableStack>
    </StyledContentWrapper>
  );
}
