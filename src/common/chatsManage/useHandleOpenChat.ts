import { db } from '@/config/firebase.config';
import { openChat } from '@/redux/features/openedChatsSlice';
import { useGetLoggedUserQuery, useGetUserChatsQuery } from '@/redux/services/loggedUserAPI';
import { IChat } from '@/types/chat';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';

export default function useHandleOpenChat(userId: string) {
  const dispatch = useDispatch();
  const { data: chats } = useGetUserChatsQuery({});
  const { data: loggedUser } = useGetLoggedUserQuery({});

  async function handleChatOpen() {
    if (!chats || !loggedUser) return;
    const chatId = [loggedUser?.id, userId].sort().join('-');
    if (!chats.find((chat) => chat.id === chatId)) {
      const newChat: IChat = {
        id: chatId,
        users: [loggedUser?.id, userId],
        messages: [],
      };
      const chatsDocRef = doc(db, 'chats', chatId);
      await setDoc(chatsDocRef, newChat);
    }

    dispatch(openChat(chatId));
  }
  return handleChatOpen;
}
