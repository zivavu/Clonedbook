import { RootState } from '@/redux/store';
import { Portal, PortalProps, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import ChatWindow from './ChatWindow';
import { PortalContent } from './styles';

export default function OpenedChatsPortal({ ...rootProps }: PortalProps) {
  const openedChats = useSelector((state: RootState) => state.openedChats);
  return (
    <Portal {...rootProps}>
      <PortalContent>
        <Stack direction='row' spacing={2}>
          {openedChats.map((chatId) => {
            return <ChatWindow key={chatId} chatId={chatId} />;
          })}
        </Stack>
      </PortalContent>
    </Portal>
  );
}
