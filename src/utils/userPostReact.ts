import { db } from '@/config/firebase.config';
import { TReactionType } from '@/types/reaction';
import { deleteField, doc, updateDoc } from 'firebase/firestore';

export async function userPostReact(
  postId: string,
  userId: string,
  reaction: TReactionType | null,
) {
  try {
    const postsDocRef = doc(db, 'posts', postId);
    console.log(postId, userId, reaction);
    if (reaction) {
      await updateDoc(postsDocRef, `reactions.${userId}`, reaction);
    } else {
      await updateDoc(postsDocRef, `reactions.${userId}`, deleteField());
    }
  } catch (err) {
    console.log(err);
  }
}
