import { Box, CircularProgress, GlobalStyles, IconButton, Stack, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import Icon from '@/components/atoms/Icon/Icon';
import UserAvatar from '@/components/atoms/UserAvatar';
import UserLink from '@/components/atoms/UserLink';
import { StyledScrollableStack } from '@/components/atoms/scrollables/styles';
import { closeChat } from '@/redux/features/openedChatsSlice';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { useUserDataByIdQuery } from '@/redux/services/userDataAPI';
import useContinousChatFetching from '@/services/chats/useContinousChatFetching';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import ChatMessage from './ChatMessage';
import MessageInputArea from './MessageInputArea';
import UserInfoPlaceholder from './UserInfoPlaceholder';
import { ChatWindowProps } from './types';

export default function ChatWindow({ chatId, sx, ...rootProps }: ChatWindowProps) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { chatData, isLoading: isChatLoading } = useContinousChatFetching(chatId);
  const { data: loggedUser } = useGetLoggedUserQuery({});

  const otherUserId = chatData?.users.find((user) => user !== loggedUser?.id) as string;
  const {
    data: otherUserData,
    isLoading: isOtherUserLoading,
    isFetching,
  } = useUserDataByIdQuery(otherUserId);

  const [isLoading, setIsLoading] = useState(isOtherUserLoading || isChatLoading || isFetching);

  const scrollableStackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollableStackRef.current?.scrollTo(0, scrollableStackRef.current.scrollHeight);
    if (!isOtherUserLoading && !isChatLoading && !isFetching) setIsLoading(false);
  }, [isOtherUserLoading, isChatLoading, isFetching, chatData]);

  function handleChatClose() {
    dispatch(closeChat(chatId));
  }

  return (
    <>
      <StyledRoot sx={sx} {...rootProps}>
        <Stack
          direction='row'
          p={1}
          width='100%'
          alignItems='center'
          spacing={1}
          borderBottom={`1px solid ${theme.palette.divider}`}>
          <UserAvatar userId={otherUserId} size={36} />
          <UserLink userId={otherUserId} />
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
        {!otherUserData || isLoading ? (
          <Box position='relative' minHeight='100%'>
            <CircularProgress
              size={38}
              thickness={6}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </Box>
        ) : (
          <StyledScrollableStack position='relative' px={1} py={2} ref={scrollableStackRef}>
            <UserInfoPlaceholder userData={otherUserData} pb={7} />
            {chatData?.messages.map((message, i, arr) => {
              const isNextMessageFromSameUser = arr[i + 1]?.senderId === message.senderId;
              const messageSpacing = isNextMessageFromSameUser ? 0.5 : 1.2;
              return <ChatMessage key={message.id} message={message} mb={messageSpacing} />;
            })}
          </StyledScrollableStack>
        )}

        <MessageInputArea chatId={chatId} chatEmoji={chatData?.chatEmoji || '❤️'} />
      </StyledRoot>
      <GlobalStyles
        styles={{
          body: {
            [theme.breakpoints.down('xs')]: {
              overflowY: 'hidden !important',
            },
          },
        }}
      />
    </>
  );
}
