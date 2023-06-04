import { db } from '@/config/firebase.config';
import { TElementType } from '@/types/misc';
import { TLocalUserReaction } from '@/types/reaction';
import { deleteField, doc, updateDoc } from 'firebase/firestore';

export interface IUpdateElementReaction {
  elementId: string;
  elementType: TElementType;
  elementOwnerId: string;
  loggedUserId: string;
  reaction: TLocalUserReaction;
}

export default function updateElementReaction({
  elementType,
  loggedUserId,
  elementOwnerId,
  elementId,
  reaction,
}: IUpdateElementReaction) {
  try {
    if (elementType === 'post') {
      postReact({ elementId, loggedUserId, reaction });
    }
    if (elementType === 'accountPicture') {
      accountPictureReact({ elementId, loggedUserId, elementOwnerId, reaction });
    }
    if (elementType === 'backgroundPicture') {
      backroundPictureReact({ elementId, loggedUserId, elementOwnerId, reaction });
    }
  } catch (err) {
    console.log(err);
  }
}

async function backroundPictureReact({
  elementId,
  elementOwnerId,
  loggedUserId,
  reaction,
}: Omit<IUpdateElementReaction, 'elementType'>) {
  const docRef = doc(db, `users/${elementOwnerId}/pictures/pictures`);
  const reactionPath = `background.${elementId}.reactions.${loggedUserId}`;
  if (reaction) {
    await updateDoc(docRef, reactionPath, reaction);
  } else {
    await updateDoc(docRef, reactionPath, deleteField());
  }
}

async function accountPictureReact({
  elementId,
  elementOwnerId,
  loggedUserId,
  reaction,
}: Omit<IUpdateElementReaction, 'elementType'>) {
  const docRef = doc(db, `users/${elementOwnerId}/pictures/pictures`);
  const reactionPath = `account.${elementId}.reactions.${loggedUserId}`;
  if (reaction) {
    await updateDoc(docRef, reactionPath, reaction);
  } else {
    await updateDoc(docRef, reactionPath, deleteField());
  }
}

async function postReact({
  elementId,
  loggedUserId,
  reaction,
}: Omit<IUpdateElementReaction, 'elementType' | 'elementOwnerId'>) {
  const postsDocRef = doc(db, 'posts', elementId);
  const reactionPath = `reactions.${loggedUserId}`;
  if (reaction) {
    await updateDoc(postsDocRef, reactionPath, reaction);
  } else {
    await updateDoc(postsDocRef, reactionPath, deleteField());
  }
}
