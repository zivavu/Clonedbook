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
    const picturesDocRef = doc(db, `users/${ownerId}/pictures/pictures`);
    if (reaction) {
      await updateDoc(picturesDocRef, `${elementId}.reactions.${loggedUserId}`, reaction);
    } else {
      await updateDoc(picturesDocRef, `${elementId}.reactions.${loggedUserId}`, deleteField());
    }
  } catch (err) {
    console.log(err);
  }
}
