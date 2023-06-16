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
    switch (elementType) {
      case 'post':
        await postCommentCreate({ elementId, comment });
        break;
      case 'accountPicture':
        await accountPictureCommentCreate({ elementId, comment, elementOwnerId });
        break;
      case 'backgroundPicture':
        await backgroundPictureCommentCreate({ elementId, comment, elementOwnerId });
        break;
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
