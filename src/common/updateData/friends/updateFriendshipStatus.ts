import { db } from '@/config/firebase.config';
import { TFriendStatus } from '@/types/firend';
import { deleteField, doc, updateDoc } from 'firebase/firestore';

interface IUpdateFriendshipStatus {
  loggedUser: string;
  friend: string;
  newStatus: TFriendStatus | null;
}

export async function updateFriendshipStatus({
  loggedUser,
  friend,
  newStatus,
}: IUpdateFriendshipStatus) {
  try {
    const loggedUserDoc = doc(db, 'users', loggedUser);
    const friendDoc = doc(db, 'users', friend);
    const friendPath = `friends.${friend}.status`;
    const loggedUserPath = `friends.${loggedUser}.status`;
    if (newStatus === null) {
      await Promise.allSettled([
        updateDoc(loggedUserDoc, friendPath, deleteField()),
        updateDoc(friendDoc, loggedUserPath, deleteField()),
      ]);
    } else {
      const flippedStatus =
        newStatus === 'req_received'
          ? 'req_sent'
          : newStatus === 'req_sent'
          ? 'req_received'
          : newStatus;
      await Promise.allSettled([
        await updateDoc(loggedUserDoc, friendPath, newStatus),
        await updateDoc(friendDoc, loggedUserPath, flippedStatus),
      ]);
    }
  } catch (err) {
    console.log(err);
  }
}
