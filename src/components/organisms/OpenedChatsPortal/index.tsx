import { RootState } from '@/redux/store';
import { Portal, PortalProps, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import ChatWindow from './ChatWindow';
import { ChatsContainer } from './styles';
import useSetMaxChatsMediaQuery from './useSetMaxChatsMediaQuery';

export default function OpenedChatsPortal({ ...rootProps }: PortalProps) {
  useSetMaxChatsMediaQuery();
  const openedChats = useSelector((state: RootState) => state.openedChats);
  return (
    <Portal {...rootProps}>
      <ChatsContainer>
        <Stack direction='row' spacing={1} justifyContent='flex-end'>
          {openedChats.chatIds.map((chatId) => {
            return <ChatWindow key={chatId} chatId={chatId} />;
          })}
        </Stack>
      </ChatsContainer>
    </Portal>
  );
}
