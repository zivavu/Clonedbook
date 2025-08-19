import { db } from '@/config/firebase.config';
import { IChat } from '@/types/chat';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function useContinousChatFetching(chatId: string) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [chatData, setChatData] = useState<IChat>();
  console.log('chatId', chatId);
  async function fetchChatData() {
    setIsLoading(true);
    try {
      const chatRef = doc(db, 'chats', chatId);
      onSnapshot(chatRef, (doc) => {
        setChatData(doc.data() as IChat);
      });
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchChatData();
  }, [chatId]);

  return { isError, isLoading, chatData };
}
