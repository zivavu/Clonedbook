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
    const pictureRef = doc(db, 'users', ownerId);
    if (reaction) {
      await updateDoc(pictureRef, `reactions.${loggedUserId}`, reaction);
    } else {
      await updateDoc(pictureRef, `reactions.${loggedUserId}`, deleteField());
    }
  } catch (err) {
    console.log(err);
  }
}
