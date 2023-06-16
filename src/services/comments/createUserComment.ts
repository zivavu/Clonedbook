import { db } from '@/config/firebase.config';
import { IComment } from '@/types/comment';
import { TElementType } from '@/types/misc';
import { uuidv4 } from '@firebase/util';
import { Timestamp, doc, updateDoc } from 'firebase/firestore';

interface ICreateCommentParams {
  commentText: string;
  elementId: string;
  elementType: TElementType;
  elementOwnerId: string;
  loggedUserId: string;
}

interface ICommentCreateByElementType {
  comment: IComment;
  elementId: string;
  elementOwnerId: string;
}

export async function createUserComment({
  elementId,
  elementType,
  commentText,
  elementOwnerId,
  loggedUserId,
}: ICreateCommentParams) {
  const comment: IComment = {
    commentText,
    ownerId: loggedUserId,
    createdAt: Timestamp.now(),
    reactions: {},
    id: uuidv4(),
    responses: {},
  };

  try {
    if (elementType === 'post') {
      postCommentCreate({ elementId, comment });
    }
    if (elementType === 'accountPicture') {
      accountPictureCommentCreate({ elementId, comment, elementOwnerId });
    }
    if (elementType === 'backgroundPicture') {
      backgroundPictureCommentCreate({ elementId, comment, elementOwnerId });
    }
  } catch (err) {
    console.log(err);
  }
}

async function postCommentCreate({
  elementId,
  comment,
}: Omit<ICommentCreateByElementType, 'elementOwnerId'>) {
  const postsDocRef = doc(db, 'posts', elementId);
  const commentPath = `comments.${comment.id}`;
  await updateDoc(postsDocRef, commentPath, comment);
}

async function accountPictureCommentCreate({
  elementId,
  comment,
  elementOwnerId,
}: ICommentCreateByElementType) {
  const accPictureDocRef = doc(db, `users/${elementOwnerId}/pictures/pictures`);
  const commentPath = `account.${elementId}.comments.${comment.id}`;
  await updateDoc(accPictureDocRef, commentPath, comment);
}

async function backgroundPictureCommentCreate({
  elementId,
  comment,
  elementOwnerId,
}: ICommentCreateByElementType) {
  const bgPictureDocRef = doc(db, `users/${elementOwnerId}/pictures/pictures`);
  const commentPath = `background.${elementId}.comments.${comment.id}`;
  await updateDoc(bgPictureDocRef, commentPath, comment);
}
