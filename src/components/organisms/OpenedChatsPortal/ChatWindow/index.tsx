import { IconButton, Stack, useTheme } from '@mui/material';

import { StyledRoot } from './styles';

import useContinousChatFetching from '@/common/firebase/readData/useContinousChatFetching';
import useGetUserBasicInfo from '@/common/misc/userDataManagment/useGetUsersPublicData';
import Icon from '@/components/atoms/Icon/Icon';
import UserAvatar from '@/components/atoms/UserAvatar';
import UserLink from '@/components/atoms/UserLink';
import { StyledScrollableStack } from '@/components/atoms/scrollables/styles';
import { closeChat } from '@/redux/features/openedChatsSlice';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import ChatMessage from './ChatMessage';
import MessageInputArea from './MessageInputArea';
import UserInfoPlaceholder from './UserInfoPlaceholder';
import { ChatWindowProps } from './types';

export default function ChatWindow({ chatId, sx, ...rootProps }: ChatWindowProps) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { chatData } = useContinousChatFetching(chatId);
  const { data: loggedUser } = useGetLoggedUserQuery({});

  const otherUserId = chatData?.users.find((user) => user !== loggedUser?.id) as string;
  const otherChatUser = useGetUserBasicInfo(otherUserId);

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
      <StyledScrollableStack
        //Hack to prevent chat flashing(caused by scrolling to bottom) on initial load
        visibility={initialLoaded ? 'visible' : 'hidden'}
        position='relative'
        px={1}
        py={2}
        spacing={0.5}
        ref={scrollableStackRef}>
        <UserInfoPlaceholder userId={otherUserId} pb={7} />
        {chatData?.messages.map((message) => {
          return <ChatMessage key={message.id} message={message} />;
        })}
      </StyledScrollableStack>
      <MessageInputArea chatId={chatId} />
    </StyledRoot>
  );
}
