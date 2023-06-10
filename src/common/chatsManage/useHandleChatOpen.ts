import { useGetLoggedUserQuery } from '@/redux/services/loggedUserAPI';
import { useDispatch } from 'react-redux';

export default function useHandleChatOpen(userId: string) {
  const dispatch = useDispatch();
  const { data: loggedUser } = useGetLoggedUserQuery({});
  const chatId = [loggedUser?.id, userId].sort().join('-');
  const openChat = () => dispatch({ type: 'openedChats/openChat', payload: chatId });
  return openChat;
}
