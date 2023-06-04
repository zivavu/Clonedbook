import { db } from '@/config/firebase.config';
import { IComment } from '@/types/comment';
import { TElementType } from '@/types/misc';
import { uuidv4 } from '@firebase/util';
import { Timestamp, doc, updateDoc } from 'firebase/firestore';

export interface ICreateCommentParams {
  commentText: string;
  elementId: string;
  elementType: TElementType;
  elementOwnerId: string;
  loggedUserId: string;
}

export interface ICreateCommentCreate {
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
    createdAt: Timestamp.fromDate(new Date()),
    reactions: {},
    id: uuidv4(),
    responses: {},
  };

  try {
    if (elementType === 'post') {
      postCommentCreate({ elementId, comment });
    }
    if (elementType === 'accountPicture') {
    }
    if (elementType === 'backgroundPicture') {
    }
  } catch (err) {
    console.log(err);
  }
}

async function postCommentCreate({
  elementId,
  comment,
}: Omit<ICreateCommentCreate, 'elementOwnerId'>) {
  const postsDocRef = doc(db, 'posts', elementId);
  const commentPath = `comments.${comment.id}`;
  await updateDoc(postsDocRef, commentPath, comment);
}
