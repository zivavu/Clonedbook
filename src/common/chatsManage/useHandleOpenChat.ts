import { openChat } from '@/redux/features/openedChatsSlice';
import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { useDispatch } from 'react-redux';

export default function useHandleOpenChat(userId: string) {
  const dispatch = useDispatch();

  const { data: loggedUser } = useGetLoggedUserQuery({});
  const chatId = [loggedUser?.id, userId].sort().join('-');
  const handleChatOpen = () => dispatch(openChat(chatId));
  return handleChatOpen;
}
