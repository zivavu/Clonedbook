import { db } from '@/config/firebase.config';
import { IChat } from '@/types/chat';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function useContinousChatFetching(chatId: string) {
  const [isError, setIsError] = useState(false);
  const [chatData, setChatData] = useState<IChat>();

  async function fetchChatData() {
    try {
      const chatRef = doc(db, 'chats', chatId);
      const unsubscribe = onSnapshot(chatRef, (doc) => {
        setChatData(doc.data() as IChat);
      });
    } catch (error) {
      setIsError(true);
    }
  }

  useEffect(() => {
    fetchChatData();
  }, [chatId]);

  return { isError, chatData };
}
