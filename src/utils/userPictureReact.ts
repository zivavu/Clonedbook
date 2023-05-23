import { db } from '@/config/firebase.config';
import { deleteField, doc, updateDoc } from 'firebase/firestore';
import { IUpdateElementReaction } from './updateElementReaction';

export async function userPictureReact({
  elementId,
  ownerId,
  loggedUserId,
  reaction,
}: IUpdateElementReaction) {
  try {
    const docRef = doc(db, `users/${ownerId}/pictures/pictures`);
    if (reaction) {
      await updateDoc(docRef, `account.${elementId}.reactions.${loggedUserId}`, reaction);
    } else {
      await updateDoc(docRef, `account.${elementId}.reactions.${loggedUserId}`, deleteField());
    }
  } catch (err) {
    console.log(err);
  }
}
