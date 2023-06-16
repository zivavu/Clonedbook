import { db } from '@/config/firebase.config';
import { TFriendStatus } from '@/types/firend';
import { Timestamp, deleteField, doc, updateDoc } from 'firebase/firestore';

interface IUpdateFriendshipStatus {
  loggedUserId: string;
  friendId: string;
  newStatus: TFriendStatus | null;
}

export async function updateFriendshipStatus({
  loggedUserId,
  friendId,
  newStatus,
}: IUpdateFriendshipStatus) {
  try {
    const loggedUserDoc = doc(db, 'users', loggedUserId);
    const friendDoc = doc(db, 'users', friendId);
    const publicFriendsDoc = doc(db, 'usersPublicData', 'usersPublicFriends');

    const loggedUserPath = `friends.${loggedUserId}.status`;
    const friendPath = `friends.${friendId}.status`;

    const loggedPublicFriendsPath = `${loggedUserId}.${friendId}`;
    const friendPublicFriendsPath = `${friendId}.${loggedUserId}`;

    if (newStatus === null) {
      await Promise.allSettled([
        updateDoc(loggedUserDoc, friendPath, deleteField()),
        updateDoc(friendDoc, loggedUserPath, deleteField()),
        updateDoc(publicFriendsDoc, loggedPublicFriendsPath, deleteField()),
        updateDoc(publicFriendsDoc, friendPublicFriendsPath, deleteField()),
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
        await updateDoc(publicFriendsDoc, loggedPublicFriendsPath, Timestamp.now()),
        await updateDoc(publicFriendsDoc, friendPublicFriendsPath, Timestamp.now()),
      ]);
    }
  } catch (err) {
    console.log(err);
  }
}
