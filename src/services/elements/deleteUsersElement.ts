import getPicturesSortedByDate from '@/common/misc/photoManagment/getPicturesSortedByDate';
import { db } from '@/config/firebase.config';
import { TElementType } from '@/types/misc';
import { IPicturesMap } from '@/types/picture';
import { IUser } from '@/types/user';
import { deleteDoc, deleteField, doc, getDoc, updateDoc } from 'firebase/firestore';
import updateUserSetPictures from '../user/updateUserSetPictures';

interface IDeleteElementParams {
  elementType: TElementType;
  elementId: string;
  loggedUser: IUser;
}

export async function deleteUsersElement({
  elementType,
  elementId,
  loggedUser,
}: IDeleteElementParams) {
  try {
    switch (elementType) {
      case 'post':
        await postDelete({ elementId });
        break;
      case 'accountPicture':
        await accountPictureDelete({ elementId, loggedUser });
        break;
      case 'backgroundPicture':
        await backgroundPictureDelete({ elementId, loggedUser });
        break;
    }
  } catch (err) {
    console.log(err);
  }
}

async function postDelete({ elementId }: Omit<IDeleteElementParams, 'loggedUser' | 'elementType'>) {
  const docRef = doc(db, 'posts', elementId);
  await deleteDoc(docRef);
}

async function accountPictureDelete({
  elementId,
  loggedUser,
}: Omit<IDeleteElementParams, 'elementType'>) {
  if (elementId === loggedUser.profilePictureId) {
    console.log('1');
    const picturesMap = await getUsersPictures(loggedUser.id);
    const accountPictures = getPicturesSortedByDate({ picturesMap, type: 'account' });
    const firstPicture = accountPictures.find((picture) => picture.id !== elementId);
    if (!firstPicture) {
      throw new Error('You can not delete your last profile picture');
    }
    await updateUserSetPictures({ loggedUser, newPictureId: firstPicture.id, type: 'account' });
    console.log('2');
  }

  const docRef = doc(db, `users/${loggedUser.id}/pictures/pictures`);
  const elementPath = `account.${elementId}`;
  await updateDoc(docRef, elementPath, deleteField());
  console.log('3');
}

async function backgroundPictureDelete({
  elementId,
  loggedUser,
}: Omit<IDeleteElementParams, 'elementType'>) {
  if (elementId === loggedUser.backgroundPictureId) {
    const picturesMap = await getUsersPictures(loggedUser.id);
    const backroundPictures = getPicturesSortedByDate({ picturesMap, type: 'background' });
    const firstPicture = backroundPictures.find((picture) => picture.id !== elementId);
    if (!firstPicture) {
      throw new Error('You can not delete your last background picture');
    }
    await updateUserSetPictures({ loggedUser, newPictureId: firstPicture.id, type: 'background' });
  }
  const docRef = doc(db, `users/${loggedUser.id}/pictures/pictures`);
  const elementPath = `background.${elementId}`;
  await updateDoc(docRef, elementPath, deleteField());
}

async function getUsersPictures(userId: string) {
  const picturesRef = doc(db, `users/${userId}/pictures/pictures`);
  const picturesSnapshot = await getDoc(picturesRef);
  const picturesData = picturesSnapshot.data() as IPicturesMap;
  return picturesData;
}
