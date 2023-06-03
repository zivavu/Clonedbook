import { db } from '@/config/firebase.config';
import { TElementTypes } from '@/types/misc';
import { TLocalUserReaction } from '@/types/reaction';
import { deleteField, doc, updateDoc } from 'firebase/firestore';

export interface IUpdateElementReaction {
  elementId: string;
  elementType: TElementTypes;
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
  if (elementType === 'post') {
    userPostReact({ elementId, loggedUserId, reaction });
  }
  if (elementType === 'accountPicture') {
    userAccountPictureReact({ elementId, loggedUserId, elementOwnerId, reaction });
  }
  if (elementType === 'backgroundPicture') {
    userBackroundPictureReact({ elementId, loggedUserId, elementOwnerId, reaction });
  }
}

async function userBackroundPictureReact({
  elementId,
  elementOwnerId,
  loggedUserId,
  reaction,
}: Omit<IUpdateElementReaction, 'elementType'>) {
  try {
    const docRef = doc(db, `users/${elementOwnerId}/pictures/pictures`);
    const reactionPath = `background.${elementId}.reactions.${loggedUserId}`;
    if (reaction) {
      await updateDoc(docRef, reactionPath, reaction);
    } else {
      await updateDoc(docRef, reactionPath, deleteField());
    }
  } catch (err) {
    console.log(err);
  }
}

async function userAccountPictureReact({
  elementId,
  elementOwnerId,
  loggedUserId,
  reaction,
}: Omit<IUpdateElementReaction, 'elementType'>) {
  try {
    const docRef = doc(db, `users/${elementOwnerId}/pictures/pictures`);
    const reactionPath = `account.${elementId}.reactions.${loggedUserId}`;
    if (reaction) {
      await updateDoc(docRef, reactionPath, reaction);
    } else {
      await updateDoc(docRef, reactionPath, deleteField());
    }
  } catch (err) {
    console.log(err);
  }
}

async function userPostReact({
  elementId,
  loggedUserId,
  reaction,
}: Omit<IUpdateElementReaction, 'elementType' | 'elementOwnerId'>) {
  try {
    const postsDocRef = doc(db, 'posts', elementId);
    const reactionPath = `reactions.${loggedUserId}`;
    if (reaction) {
      await updateDoc(postsDocRef, reactionPath, reaction);
    } else {
      await updateDoc(postsDocRef, reactionPath, deleteField());
    }
  } catch (err) {
    console.log(err);
  }
}
