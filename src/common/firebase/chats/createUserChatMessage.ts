import { db } from '@/config/firebase.config';
import { IMessage } from '@/types/message';
import { uuidv4 } from '@firebase/util';
import { Timestamp, arrayUnion, doc, updateDoc } from 'firebase/firestore';

interface ICreateUserChatMessage extends Omit<IMessage, 'id' | 'createdAt'> {
  chatId: string;
}

export default async function createUserChatMessage({
  chatId,
  senderId,
  text,
  pictures,
}: ICreateUserChatMessage) {
  const messageId = uuidv4();
  const createdAt = Timestamp.fromDate(new Date());
  const message: IMessage = {
    id: messageId,
    createdAt,
    text,
    senderId,
  };
  const chatDocRef = doc(db, 'chats', chatId);
  try {
    await updateDoc(chatDocRef, { messages: arrayUnion(message) });
  } catch (err) {
    console.log(err);
  }
}
