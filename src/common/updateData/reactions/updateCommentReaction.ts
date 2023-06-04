import { db } from '@/config/firebase.config';
import { deleteField, doc, updateDoc } from 'firebase/firestore';
import { IUpdateElementReaction } from './updateElementReaction';

interface IUpdateCommentReaction extends IUpdateElementReaction {
  commentId: string;
}

export async function updateCommentReaction({
  elementId,
  elementType,
  commentId,
  elementOwnerId,
  loggedUserId,
  reaction,
}: IUpdateCommentReaction) {
  try {
    if (elementType === 'post') {
      postCommentReact({ elementId, commentId, loggedUserId, reaction });
    }
    if (elementType === 'accountPicture') {
      accountPictureCommentReact({ elementId, elementOwnerId, commentId, loggedUserId, reaction });
    }
    if (elementType === 'backgroundPicture') {
      backgroundPictureCommentReact({
        elementId,
        elementOwnerId,
        commentId,
        loggedUserId,
        reaction,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

async function postCommentReact({
  elementId,
  commentId,
  loggedUserId,
  reaction,
}: Omit<IUpdateCommentReaction, 'elementType' | 'elementOwnerId'>) {
  const postsDocRef = doc(db, 'posts', elementId);
  const commentReactionPath = `comments.${commentId}.reactions.${loggedUserId}`;
  if (reaction) {
    await updateDoc(postsDocRef, commentReactionPath, reaction);
  } else {
    await updateDoc(postsDocRef, commentReactionPath, deleteField());
  }
}

async function accountPictureCommentReact({
  elementId,
  elementOwnerId,
  commentId,
  loggedUserId,
  reaction,
}: Omit<IUpdateCommentReaction, 'elementType'>) {
  const docRef = doc(db, `users/${elementOwnerId}/pictures/pictures`);
  const commentReactionPath = `account.${elementId}.comments.${commentId}.reactions.${loggedUserId}`;
  if (reaction) {
    await updateDoc(docRef, commentReactionPath, reaction);
  } else {
    await updateDoc(docRef, commentReactionPath, deleteField());
  }
}

async function backgroundPictureCommentReact({
  elementId,
  elementOwnerId,
  commentId,
  loggedUserId,
  reaction,
}: Omit<IUpdateCommentReaction, 'elementType'>) {
  const docRef = doc(db, `users/${elementOwnerId}/pictures/pictures`);
  const commentReactionPath = `background.${elementId}.comments.${commentId}.reactions.${loggedUserId}`;
  if (reaction) {
    await updateDoc(docRef, commentReactionPath, reaction);
  } else {
    await updateDoc(docRef, commentReactionPath, deleteField());
  }
}
