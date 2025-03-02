import { db } from '@/config/firebase.config';
import { IRelationship } from '@/types/user';
import { doc, updateDoc } from 'firebase/firestore';

interface IUpdateUserRelationship {
  userId: string;
  relationship: IRelationship;
}

export default async function updateUserRelationship({
  userId,
  relationship,
}: IUpdateUserRelationship) {
  const docRef = doc(db, `users`, userId);
  try {
    await updateDoc(docRef, 'about.relationship', relationship);
  } catch (err) {
    console.log(err);
  }
}
