import { db } from '@/config/firebase.config';
import { IPost } from '@/types/post';
import { TReactionType } from '@/types/reaction';
import { IUser, IUserBasicInfo } from '@/types/user';
import { doc, updateDoc } from 'firebase/firestore';

export async function userPostReact(
  post: IPost,
  user: IUser | IUserBasicInfo,
  reaction: TReactionType | null,
) {
  const postsDocRef = doc(db, 'posts', post.id);
  const usersDocRef = doc(db, 'users', post.owner.profileId);

  try {
    await updateDoc(postsDocRef, `reactions.${user.profileId}`, reaction);
    await updateDoc(usersDocRef, `posts.${post.id}.reactions.${user.profileId}`, reaction);
  } catch (err) {
    console.log(err);
  }
}
