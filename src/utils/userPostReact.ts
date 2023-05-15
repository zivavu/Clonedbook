import { db } from '@/config/firebase.config';
import { IPost } from '@/types/post';
import { TReactionType } from '@/types/reaction';
import { IUser, IUserBasicInfo } from '@/types/user';
import { deleteField, doc, updateDoc } from 'firebase/firestore';

export async function userPostReact(
  post: IPost,
  user: IUser | IUserBasicInfo,
  reaction: TReactionType | null,
) {
  try {
    const postsDocRef = doc(db, 'posts', post.id);
    if (reaction) {
      await updateDoc(postsDocRef, `reactions.${user.profileId}`, reaction);
    } else {
      await updateDoc(postsDocRef, `reactions.${user.profileId}`, deleteField());
    }
  } catch (err) {
    console.log(err);
  }
}
