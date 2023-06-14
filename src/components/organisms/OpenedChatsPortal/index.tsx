import { RootState } from '@/redux/store';
import { Portal, PortalProps, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import ChatWindow from './ChatWindow';
import { StyledChatsContainer } from './styles';
import useSetMaxChatsMediaQuery from './useSetMaxChatsMediaQuery';

export default function OpenedChatsPortal({ ...rootProps }: PortalProps) {
  useSetMaxChatsMediaQuery();
  const openedChats = useSelector((state: RootState) => state.openedChats);
  if (openedChats.chatIds.length === 0) return null;
  return (
    <Portal {...rootProps}>
      <StyledChatsContainer>
        <Stack direction='row' spacing={1} justifyContent='flex-end'>
          {openedChats.chatIds.map((chatId) => {
            return <ChatWindow key={chatId} chatId={chatId} />;
          })}
        </Stack>
      </StyledChatsContainer>
    </Portal>
  );
}
