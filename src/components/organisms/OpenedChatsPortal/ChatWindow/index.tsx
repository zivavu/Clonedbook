import { IconButton, Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import useContinousChatFetching from '@/common/firebase/readData/useContinousChatFetching';
import useGetUserPublicData from '@/common/misc/userDataManagment/useGetUsersPublicData';
import Icon from '@/components/atoms/Icon/Icon';
import UserAvatar from '@/components/atoms/UserAvatar';
import ScrollableStack from '@/components/atoms/scrollables/ScrollableStack';
import { closeChat } from '@/redux/features/openedChatsSlice';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { useDispatch } from 'react-redux';
import ChatMessage from './ChatMessage';
import MessageInputArea from './MessageInputArea';
import { ChatWindowProps } from './types';

export default function ChatWindow({ chatId, sx, ...rootProps }: ChatWindowProps) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { chatData } = useContinousChatFetching(chatId);
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const otherUserId = chatData?.users.find((user) => user !== loggedUser?.id) as string;
  const chatUser = useGetUserPublicData(otherUserId);

  function handleChatClose() {
    dispatch(closeChat(chatId));
  }
  return (
    <StyledRoot sx={sx} {...rootProps}>
      <Stack
        direction='row'
        p={1}
        width='100%'
        alignItems='center'
        spacing={1}
        borderBottom={`1px solid ${theme.palette.divider}`}>
        <UserAvatar userId={otherUserId} size={36} />
        <Typography variant='body1' fontWeight={500}>
          {chatUser?.firstName} {chatUser?.lastName}
        </Typography>
        <IconButton
          onClick={handleChatClose}
          sx={{
            width: '30px',
            height: '30px',
            marginLeft: 'auto !important',
          }}>
          <Icon icon='xmark' fontSize={22} />
        </IconButton>
      </Stack>
      <ScrollableStack position='relative' px={1} py={2} spacing={0.5}>
        {chatData?.messages.map((message) => {
          return <ChatMessage key={message.id} message={message} />;
        })}
      </ScrollableStack>
      <MessageInputArea chatId={chatId} />
    </StyledRoot>
  );
}
