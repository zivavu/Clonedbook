import { db } from '@/config/firebase.config';
import { IPost } from '@/types/post';
import { IReactionReference, TReactionType } from '@/types/reaction';
import { IBasicUserInfo, IUser } from '@/types/user';
import { doc, updateDoc } from 'firebase/firestore';

export async function userPostReact(
  post: IPost,
  user: IUser | IBasicUserInfo,
  reaction: TReactionType,
) {
  const { id: postId, reactions: postReactions } = post;
  const { profileId: userId } = user;
  const newReactions: IReactionReference[] = [...postReactions, { userId, type: reaction }];
  try {
    const docRef = doc(db, 'posts', postId);
    await updateDoc(docRef, { reactions: newReactions });
  } catch (err) {
    console.log(err);
  }
}
