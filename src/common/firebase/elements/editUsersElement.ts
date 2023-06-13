import { db } from '@/config/firebase.config';
import { TElementType } from '@/types/misc';
import { IUser } from '@/types/user';
import { doc, updateDoc } from 'firebase/firestore';

interface IEditUserElement {
  elementType: TElementType;
  elementId: string;
  newElementText: string;
  loggedUser: IUser;
}

export async function editUserElement({
  elementType,
  elementId,
  newElementText,
  loggedUser,
}: IEditUserElement) {
  try {
    switch (elementType) {
      case 'post':
        postTextEdit({ elementId, newElementText });
        break;
      case 'accountPicture':
        accountPictureTextEdit({ elementId, loggedUser, newElementText });
        break;
      case 'backgroundPicture':
        backgroundPictureTextEdit({ elementId, loggedUser, newElementText });
        break;
      default:
        break;
    }
  } catch (err) {
    console.log(err);
  }
}

async function postTextEdit({
  elementId,
  newElementText,
}: Omit<IEditUserElement, 'loggedUser' | 'elementType'>) {
  const docRef = doc(db, 'posts', elementId);
  await updateDoc(docRef, 'text', newElementText);
}

async function accountPictureTextEdit({
  elementId,
  loggedUser,
  newElementText,
}: Omit<IEditUserElement, 'elementType'>) {
  const docRef = doc(db, `users/${loggedUser.id}/pictures/pictures`);
  const textFieldPath = `account.${elementId}.text`;
  await updateDoc(docRef, textFieldPath, newElementText);
}

async function backgroundPictureTextEdit({
  elementId,
  loggedUser,
  newElementText,
}: Omit<IEditUserElement, 'elementType'>) {
  const docRef = doc(db, `users/${loggedUser.id}/pictures/pictures`);
  const textFieldPath = `background.${elementId}.text`;
  await updateDoc(docRef, textFieldPath, newElementText);
}
