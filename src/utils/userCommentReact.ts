import { db } from '@/config/firebase.config';
import { IComment } from '@/types/comment';
import { IPost } from '@/types/post';
import { TLocalUserReaction } from '@/types/reaction';
import { IUser, IUserBasicInfo } from '@/types/user';
import { deleteField, doc, updateDoc } from 'firebase/firestore';

export async function userCommentReact(
  post: IPost,
  comment: IComment,
  user: IUser | IUserBasicInfo,
  reaction: TLocalUserReaction,
) {
  try {
    const postsDocRef = doc(db, 'posts', post.id);
    const postCommentPath = `comments.${comment.id}.reactions.${user.profileId}`;
    if (reaction) {
      await updateDoc(postsDocRef, postCommentPath, reaction);
    } else {
      await updateDoc(postsDocRef, postCommentPath, deleteField());
    }
  } catch (err) {
    console.log(err);
  }
}
