import { db } from '@/config/firebase.config';
import { IAccountPicture } from '@/types/picture';
import { IUser } from '@/types/user';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

interface IUpdateUserSetPictures {
  loggedUser: IUser;
  newPictureId: string;
  type: 'account' | 'background';
}

/**
 * @description - Updates user profile or background picture
 */

export default async function updateUserSetPictures({
  loggedUser,
  type,
  newPictureId,
}: IUpdateUserSetPictures) {
  if (loggedUser.profilePictureId === newPictureId) return;
  if (loggedUser.backgroundPictureId === newPictureId) return;

  try {
    const docRef = doc(db, `users/${loggedUser.id}/pictures/pictures`);
    const res = await getDoc(docRef);
    const data = res.data();
    if (!data || !data[type] || !data[type][newPictureId]) return;
    const newPicture = data[type][newPictureId] as IAccountPicture;
    const newFields: Partial<IUser> =
      type === 'background'
        ? {
            backgroundPicture: newPicture.image.url,
            backgroundPictureId: newPictureId,
          }
        : {
            pictureUrl: newPicture.image.url,
            profilePictureId: newPictureId,
          };
    const userRef = doc(db, `users/${loggedUser.id}`);
    await updateDoc(userRef, newFields);
    if (type === 'account') {
      const userPublicRef = doc(db, `usersPublicData`, `usersBasicInfo`);
      await updateDoc(userPublicRef, `${loggedUser.id}.pictureUrl`, newPicture.image.url);
    }
  } catch (err) {
    console.log(err);
  }
}
