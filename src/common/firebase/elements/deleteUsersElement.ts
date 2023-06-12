import { db } from '@/config/firebase.config';
import { TElementType } from '@/types/misc';
import { IUser } from '@/types/user';
import { deleteDoc, deleteField, doc, updateDoc } from 'firebase/firestore';

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
        postDelete({ elementId });
        break;
      case 'accountPicture':
        accountPictureDelete({ elementId, loggedUser });
        break;
      case 'backgroundPicture':
        backgroundPictureDelete({ elementId, loggedUser });
        break;
      default:
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
  const docRef = doc(db, `users/${loggedUser.id}/pictures/pictures`);
  const elementPath = `account.${elementId}`;
  await updateDoc(docRef, elementPath, deleteField());
}

async function backgroundPictureDelete({
  elementId,
  loggedUser,
}: Omit<IDeleteElementParams, 'elementType'>) {
  const docRef = doc(db, `users/${loggedUser.id}/pictures/pictures`);
  const elementPath = `background.${elementId}`;
  await updateDoc(docRef, elementPath, deleteField());
}
