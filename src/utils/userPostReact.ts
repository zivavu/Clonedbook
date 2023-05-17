import { db } from '@/config/firebase.config';
import { TReactionType } from '@/types/reaction';
import { IUser, IUserBasicInfo } from '@/types/user';
import { deleteField, doc, updateDoc } from 'firebase/firestore';

export async function userPostReact(
  postId: string,
  user: IUser | IUserBasicInfo,
  reaction: TReactionType | null,
) {
  try {
    const postsDocRef = doc(db, 'posts', postId);
    if (reaction) {
      await updateDoc(postsDocRef, `reactions.${user.id}`, reaction);
    } else {
      await updateDoc(postsDocRef, `reactions.${user.id}`, deleteField());
    }
  } catch (err) {
    console.log(err);
  }
}
