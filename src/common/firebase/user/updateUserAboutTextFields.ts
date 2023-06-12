import { db } from '@/config/firebase.config';
import { TUserAboutField, TUserContactField } from '@/types/user';
import { doc, updateDoc } from 'firebase/firestore';

interface IUpdateUserAboutField {
  userId: string;
  fieldName: TUserAboutField | TUserContactField;
  value: string;
}

export default async function updateUserAboutField({
  userId,
  fieldName,
  value,
}: IUpdateUserAboutField) {
  const rootPath = fieldName === 'phoneNumber' || fieldName === 'email' ? 'contact' : 'about';
  const docRef = doc(db, `users`, userId);
  try {
    await updateDoc(docRef, `${rootPath}.${fieldName}`, value);
  } catch (err) {
    console.log(err);
  }
}
