import { IconButton, Stack, Typography, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import useContinousChatFetching from '@/common/firebase/readData/useContinousChatFetching';
import useGetUserPublicData from '@/common/misc/userDataManagment/useGetUsersPublicData';
import Icon from '@/components/atoms/Icon/Icon';
import UserAvatar from '@/components/atoms/UserAvatar';
import { StyledScrollableStack } from '@/components/atoms/scrollables/styles';
import { closeChat } from '@/redux/features/openedChatsSlice';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { useEffect, useRef, useState } from 'react';
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
  const otherChatUser = useGetUserPublicData(otherUserId);

  const [initialLoaded, setInitialLoaded] = useState(false);
  const scrollableStackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollableStackRef.current?.scrollTo(0, scrollableStackRef.current.scrollHeight);
    setInitialLoaded(true);
  }, [chatData]);

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
          {otherChatUser?.firstName} {otherChatUser?.lastName}
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
      <StyledScrollableStack
        //Hack to prevent chat flashing on initial load (before scroll to bottom)
        visibility={initialLoaded ? 'visible' : 'hidden'}
        position='relative'
        px={1}
        py={2}
        spacing={0.5}
        ref={scrollableStackRef}>
        {chatData?.messages.map((message) => {
          return <ChatMessage key={message.id} message={message} />;
        })}
      </StyledScrollableStack>
      <MessageInputArea chatId={chatId} />
    </StyledRoot>
  );
}
