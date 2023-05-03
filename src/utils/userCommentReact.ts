import { db } from '@/config/firebase.config';
import { IComment } from '@/types/comment';
import { IPost } from '@/types/post';
import { TReactionType } from '@/types/reaction';
import { IUser, IUserBasicInfo } from '@/types/user';
import { doc, updateDoc } from 'firebase/firestore';

export async function userCommentReact(
  post: IPost,
  comment: IComment,
  user: IUser | IUserBasicInfo,
  reaction: TReactionType | null,
) {
  const postsDocRef = doc(db, 'posts', post.id);
  const usersDocRef = doc(db, 'users', post.owner.profileId);
  const postCommentPath = `comments.${comment.id}.reactions.${user.profileId}`;
  const usersCommentPath = `posts.${post.id}.comments.${comment.id}.reactions.${user.profileId}`;

  try {
    await updateDoc(postsDocRef, postCommentPath, reaction);
    await updateDoc(usersDocRef, usersCommentPath, reaction);
  } catch (err) {
    console.log(err);
  }
}
