import { db } from '@/config/firebase.config';
import { ITimestamp } from '@/types/timestamp';
import { doc, updateDoc } from 'firebase/firestore';

interface IUpdateUserAboutField {
  userId: string;
  value: ITimestamp;
}

export default async function updateUserBirthdate({ userId, value }: IUpdateUserAboutField) {
  const docRef = doc(db, `users`, userId);
  try {
    await updateDoc(docRef, `about.birthDate`, value);
  } catch (err) {
    console.log(err);
  }
}
