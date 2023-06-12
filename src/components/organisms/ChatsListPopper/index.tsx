import { Box, List, Typography } from '@mui/material';

import getChatNewestMessage from '@/common/chatsManage/getChatLastMessage';
import ScrollableStack from '@/components/atoms/scrollables/ScrollableStack';
import { useGetUserChatsQuery } from '@/redux/services/loggedUserAPI';
import { useEffect } from 'react';
import ListUserButton from './ListUserButton';
import { StyledContentWrapper, StyledRoot } from './styles';
import { ChatsListPopperProps } from './types';

export default function ChatsListPopper({
  sx,
  handleClose,
  open,
  anchorEl,
  ...rootProps
}: ChatsListPopperProps) {
  const { data: loggedUserChats, refetch } = useGetUserChatsQuery({});

  useEffect(() => {
    if (open) refetch();
  }, [open, refetch]);

  const sortedChats =
    loggedUserChats &&
    [...loggedUserChats].sort(
      (a, b) =>
        getChatNewestMessage(b).createdAt.seconds - getChatNewestMessage(a).createdAt.seconds,
    );

  return (
    <StyledRoot sx={sx} {...rootProps} open={open} anchorEl={anchorEl}>
      <StyledContentWrapper>
        <ScrollableStack padding={1}>
          <Box p={0.5}>
            <Typography variant='h3' fontWeight={700}>
              Chats
            </Typography>
          </Box>
          <List>
            {sortedChats?.map((chat) => (
              <ListUserButton key={chat.id} chat={chat} handlePopperClose={handleClose} />
            ))}
          </List>
        </ScrollableStack>
      </StyledContentWrapper>
    </StyledRoot>
  );
}
