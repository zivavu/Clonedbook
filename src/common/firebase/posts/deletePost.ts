import { db } from '@/config/firebase.config';
import { deleteDoc, doc } from 'firebase/firestore';

export default async function deletePost(postId: string) {
  try {
    await deleteDoc(doc(db, 'posts', postId));
  } catch (err) {
    console.log(err);
  }
}
