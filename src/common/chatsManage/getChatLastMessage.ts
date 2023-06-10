import { IChat } from '@/types/chat';

export default function getChatNewestMessage(chat: IChat) {
  const sortedMessages = [...chat.messages].sort(
    (a, b) => b.createdAt.seconds - a.createdAt.seconds,
  );
  return sortedMessages[0];
}
