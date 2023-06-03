import { db } from '@/config/firebase.config';
import { TElementTypes } from '@/types/misc';
import { TLocalUserReaction } from '@/types/reaction';
import { deleteField, doc, updateDoc } from 'firebase/firestore';

export interface IUpdateCommentReaction {
  elementId: string;
  elementType: TElementTypes;
  commentId: string;
  loggedUserId: string;
  reaction: TLocalUserReaction;
}

export async function userCommentReact({
  elementId,
  elementType,
  commentId,
  loggedUserId,
  reaction,
}: IUpdateCommentReaction) {
  try {
    const postsDocRef = doc(db, 'posts', elementId);
    const postCommentPath = `comments.${commentId}.reactions.${loggedUserId}`;
    if (reaction) {
      await updateDoc(postsDocRef, postCommentPath, reaction);
    } else {
      await updateDoc(postsDocRef, postCommentPath, deleteField());
    }
  } catch (err) {
    console.log(err);
  }
}
