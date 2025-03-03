import { db } from '@/config/firebase.config';
import { doc, updateDoc } from 'firebase/firestore';

interface UpdateChatSettingsProps {
  chatId: string;
  chatEmoji?: string;
  chatColor?: string;
}

/**
 * Updates chat settings like emoji and color theme
 */
export default async function updateChatSettings({
  chatId,
  chatEmoji,
  chatColor,
}: UpdateChatSettingsProps) {
  const chatDocRef = doc(db, 'chats', chatId);
  try {
    if (chatEmoji !== undefined) {
      await updateDoc(chatDocRef, { chatEmoji });
    }

    if (chatColor !== undefined) {
      await updateDoc(chatDocRef, { chatColor });
    }

    return { success: true };
  } catch (err) {
    console.error('Error updating chat settings:', err);
    return { success: false, error: err };
  }
}
