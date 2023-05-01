import { db } from '@/config/firebase.config';
import { IPost } from '@/types/post';
import { IReactionReference, TReactionType } from '@/types/reaction';
import { IBasicUserInfo, IUser } from '@/types/user';
import { doc, updateDoc } from 'firebase/firestore';
import { separateUserBasicInfo } from './separateUserBasicInfo';

export async function userPostReact(
  post: IPost,
  user: IUser | IBasicUserInfo,
  reaction: TReactionType | null,
) {
  const { id: postId, reactions: postReactions, exampleReactors } = post;
  const { profileId: userId } = user;
  const userBasicInfo = separateUserBasicInfo(user);
  const newReactions: IReactionReference[] = reaction
    ? [
        ...postReactions.filter((reaction) => reaction.userId !== userId),
        { userId, type: reaction },
      ]
    : [...postReactions.filter((reaction) => reaction.userId !== userId)];
  const newExampleReactors: IBasicUserInfo[] = exampleReactors.slice(-4);
  newExampleReactors.filter((reactor) => reactor.profileId !== userId);
  newExampleReactors.push(userBasicInfo);

  try {
    const docRef = doc(db, 'posts', postId);
    await updateDoc(docRef, { reactions: newReactions, exampleReactors: newExampleReactors });
  } catch (err) {
    console.log(err);
  }
}
