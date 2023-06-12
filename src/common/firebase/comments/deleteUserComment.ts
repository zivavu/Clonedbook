import { db } from '@/config/firebase.config';
import { TElementType } from '@/types/misc';
import { deleteField, doc, updateDoc } from 'firebase/firestore';

interface IDeleteCommentParams {
  elementId: string;
  elementType: TElementType;
  elementOwnerId: string;
  commentId: string;
}

export async function deleteUserComment({
  elementId,
  elementType,
  elementOwnerId,
  commentId,
}: IDeleteCommentParams) {
  try {
    if (elementType === 'post') {
      postCommentDelete({ elementId, commentId });
    }
    if (elementType === 'accountPicture') {
      accountPictureCommentCreate({ elementId, commentId, elementOwnerId });
    }
    if (elementType === 'backgroundPicture') {
      backgroundPictureCommentCreate({ elementId, commentId, elementOwnerId });
    }
  } catch (err) {
    console.log(err);
  }
}

async function postCommentDelete({
  elementId,
  commentId,
}: Omit<IDeleteCommentParams, 'elementType' | 'elementOwnerId'>) {
  const docRef = doc(db, 'posts', elementId);
  const commentPath = `comments.${commentId}`;
  await updateDoc(docRef, commentPath, deleteField());
}

async function accountPictureCommentCreate({
  elementId,
  commentId,
  elementOwnerId,
}: Omit<IDeleteCommentParams, 'elementType'>) {
  const docRef = doc(db, `users/${elementOwnerId}/pictures/pictures`);
  const commentPath = `account.${elementId}.comments.${commentId}`;
  await updateDoc(docRef, commentPath, deleteField());
}

async function backgroundPictureCommentCreate({
  elementId,
  commentId,
  elementOwnerId,
}: Omit<IDeleteCommentParams, 'elementType'>) {
  const docRef = doc(db, `users/${elementOwnerId}/pictures/pictures`);
  const commentPath = `background.${elementId}.comments.${commentId}`;
  await updateDoc(docRef, commentPath, deleteField());
}
