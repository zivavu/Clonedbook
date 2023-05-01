import { db } from '@/config/firebase.config';
import { IComment } from '@/types/comment';
import { IPost } from '@/types/post';
import { IReactionReference, TReactionType } from '@/types/reaction';
import { IBasicUserInfo, IUser } from '@/types/user';
import { doc, updateDoc } from 'firebase/firestore';
import { separateUserBasicInfo } from './separateUserBasicInfo';

export async function userCommentReact(
  post: IPost,
  comment: IComment,
  user: IUser | IBasicUserInfo,
  reaction: TReactionType | null,
) {
  const { id: postId } = post;
  const { id: commentId, reactions } = comment;
  const { profileId: userId } = user;
  const commReactions = reactions || [];
  const newReactions: IReactionReference[] = reaction
    ? [...commReactions.filter((react) => react.userId !== userId), { userId, type: reaction }]
    : [...commReactions.filter((react) => react.userId !== userId)];

  const newComments = post.comments?.map((comm) => {
    if (comm.id === commentId) {
      return { ...comm, reactions: newReactions };
    }
    return comm;
  });

  try {
    const docRef = doc(db, 'posts', postId);
    await updateDoc(docRef, 'comments', newComments);
  } catch (err) {
    console.log(err);
  }
}
