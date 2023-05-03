/* eslint-disable no-console*/

//! This is a script that generates random users and adds them to the database. Use it only for testing purposes, it's not a part of the project, just a helper. Also it's far beyond the worst spaghetti code, don't try to understand it.
//! It uploads a lots of data batch after batch so will take time to execute

import { db } from '@/config/firebase.config';
import { ICommentMap } from '@/types/comment';
import { ICreatedAt } from '@/types/createdAt';
import { IFriend, IFriendConnection } from '@/types/firend';
import { IInProfilePicture } from '@/types/picture';
import { IPost } from '@/types/post';
import { IReactionsMap, TReactionType } from '@/types/reaction';
import { IUser, IUserBasicInfo } from '@/types/user';
import { IUserServerData } from '@/types/userServerData';
import { faker } from '@faker-js/faker';
import { uuidv4 } from '@firebase/util';
import { Button } from '@mui/material';

import { Timestamp, WriteBatch, collection, doc, writeBatch } from 'firebase/firestore';

const randomPostPictures = [
  faker.image.people,
  faker.image.nature,
  faker.image.transport,
  faker.image.abstract,
  faker.image.animals,
  faker.image.business,
];

const randomProfilePictures = [faker.image.people, faker.internet.avatar];
const randomBackgroundPictures = [faker.image.nature, faker.image.animals];

function getPastDate() {
  return Timestamp.fromDate(faker.date.past(0.4, new Date()));
}
function getDateAfterTimestamp(pastDate: ICreatedAt) {
  const date = new Date(pastDate.seconds * 1000);
  return Timestamp.fromDate(faker.date.between(date, new Date()));
}

const maxUsers = 80,
  maxFriends = 60;
export function generateUsers(usersAmount: number = maxUsers, friendsAmount: number = maxFriends) {
  if (maxFriends > maxUsers) friendsAmount = maxUsers - 1;
  if (usersAmount > maxUsers) {
    usersAmount = maxUsers;
  }
  if (usersAmount < 13) {
    usersAmount = 13;
  }
  const usersUIDS: string[] = [];

  for (let i = 0; i < usersAmount; i++) {
    usersUIDS.push(getRandomUIDv4());
  }
  const allPosts: IPost[] = [];

  function getRandomPhotoUrl() {
    const randomPicture = randomPostPictures[Math.floor(Math.random() * randomPostPictures.length)];
    const pictureURL =
      typeof randomPicture === 'function'
        ? //random aspect ratios
          Math.random() > 0.5
          ? randomPicture(700, 700, true)
          : randomPicture(1000, 700, true)
        : randomPicture;
    return pictureURL;
  }

  function getRandomProfilePicture() {
    const randomPicture =
      randomProfilePictures[Math.floor(Math.random() * randomProfilePictures.length)];
    const pictureURL =
      typeof randomPicture === 'function' ? randomPicture(800, 800, true) : randomPicture;
    return pictureURL;
  }

  function getRandomBacgroundPicture() {
    const randomPicture =
      randomBackgroundPictures[Math.floor(Math.random() * randomBackgroundPictures.length)];
    const pictureURL =
      typeof randomPicture === 'function' ? randomPicture(1000, 550, true) : randomPicture;
    return pictureURL;
  }

  function getRandomUIDv4() {
    return uuidv4();
  }

  function getRandomUserUID() {
    return usersUIDS[Math.floor(Math.random() * usersUIDS.length)];
  }

  function getRandomReactions(amount: number) {
    const reactions: IReactionsMap = {};
    const possibleReactions: Array<TReactionType> = ['angry', 'like', 'love', 'sad', 'wow', 'haha'];
    const reactionsAmount = Math.floor(Math.random() * amount);
    for (let i = 0; i < reactionsAmount; i++) {
      const reactingUserUID = getRandomUserUID();
      if (reactions[reactingUserUID]) {
        continue;
      }
      reactions[reactingUserUID] = faker.helpers.arrayElement(possibleReactions);
    }

    return reactions;
  }

  function getRandomComments(amount: number, reactionsCount: number, parentCreateDate: ICreatedAt) {
    const comments: ICommentMap = {};
    const discutantsRange = Math.ceil(Math.random() * amount) + 5;
    let discutantsStartIndex = Math.floor(Math.random() * usersAmount);
    if (discutantsStartIndex + discutantsRange > usersAmount) {
      discutantsStartIndex = usersAmount - discutantsRange;
    }

    const discutants = usersUIDS.slice(
      discutantsStartIndex,
      discutantsStartIndex + Math.max(Math.floor(Math.random() * 6), 1),
    );

    const commentsAmount = Math.floor(Math.random() * amount);
    for (let i = 0; i < commentsAmount; i++) {
      const ownerId = discutants[Math.floor(Math.random() * discutants.length) || 0];
      const ownerBasicUserInfo = usersBasicInfo.find(
        (user) => user.profileId === ownerId,
      ) as IUserBasicInfo;
      const longCommnet = Math.random() > 0.5;
      const commentId = getRandomUIDv4();
      comments[commentId] = {
        id: commentId,
        ownerId: ownerBasicUserInfo.profileId,
        createdAt: getDateAfterTimestamp(parentCreateDate),
        commentText: longCommnet
          ? faker.lorem.sentences(Math.floor(Math.random() * 2) + 1, '\n')
          : faker.lorem.words(Math.floor(Math.random() * 5) + 3),
        responses: {},
        reactions: getRandomReactions(reactionsCount),
      };
    }
    return comments;
  }

  const usersBasicInfo: IUserBasicInfo[] = [];
  for (let i = 0; i < usersAmount; i++) {
    const userUUID = usersUIDS[i];
    const basicUserInfo = {
      profileId: userUUID,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      profilePicture: getRandomProfilePicture(),
    };
    usersBasicInfo.push(basicUserInfo);
  }

  function getRandomProfilePhotos(amount: number, basicUserInfo: IUserBasicInfo) {
    const photos: IInProfilePicture[] = [];
    const photosAmount = Math.ceil(Math.random() * amount) + 2;
    for (let i = 0; i < photosAmount; i++) {
      const createdAt = getPastDate();
      const photoId = getRandomUIDv4();
      const photo: IInProfilePicture = {
        id: photoId,
        ownerId: basicUserInfo.profileId,
        createdAt,
        pictureURL: getRandomPhotoUrl(),
        reactions: getRandomReactions(60),
        comments: getRandomComments(5, 7, createdAt),
        shareCount: Math.floor(Math.random() * 50),
      };
      photos.push(photo);
    }
    return photos;
  }
  function getRandomPosts(amount: number, basicUserInfo: IUserBasicInfo) {
    const posts: Array<IPost> = [];
    const postAmount = Math.ceil(Math.random() * amount);
    for (let i = 0; i < postAmount; i++) {
      const postPictures: string[] = [];
      const hasPictures = Math.random() > 0.3;
      const picturesAmount = Math.floor(Math.random() * 12);
      for (let i = 0; i < picturesAmount; i++) {
        postPictures.push(getRandomPhotoUrl());
      }
      const postId = getRandomUIDv4();

      const postReactions = getRandomReactions(Math.random() > 0.9 ? 70 : 40);
      const createdAt = getPastDate();
      const post: IPost = {
        id: postId,
        owner: basicUserInfo,
        postText: faker.lorem.sentences(Math.floor(Math.random() * 3) + 1, '\n'),
        postPictures: hasPictures ? postPictures : [],
        comments: getRandomComments(10, 8, createdAt),
        reactions: postReactions,
        shareCount: Math.floor(Math.random() * 30),
        createdAt,
      };
      posts.push(post);
      allPosts.push(post);
    }
    return posts;
  }

  function getRandomFriends(friendsAmount: number) {
    if (friendsAmount > maxFriends) {
      friendsAmount = maxFriends;
    }
    if (friendsAmount < 5) {
      friendsAmount = 5;
    }
    const allUsersFreinds: IFriend[][] = new Array(usersAmount);
    const allUsersFriendsConnections: IFriendConnection[][] = new Array(usersAmount);
    for (let i = 0; i < usersAmount; i++) {
      allUsersFreinds[i] = [];
      allUsersFriendsConnections[i] = [];
    }
    users.forEach((userToAddFriends) => {
      const usersFriends: IFriend[] = [];
      const usersPublicFriendships: IFriendConnection[] = [];
      const friendsCount = Math.max(Math.floor(Math.random() * friendsAmount), 10);
      for (let i = 0; i < friendsCount; i++) {
        const userToBefriendInfo = users[Math.floor(Math.random() * users.length)];
        if (userToBefriendInfo.profileId === userToAddFriends.profileId) {
          continue;
        }
        if (
          usersFriends.some((friend) => friend.basicInfo.profileId === userToBefriendInfo.profileId)
        ) {
          continue;
        }
        const connectionUUID = getRandomUIDv4();
        const usersBasicInfo = {
          profileId: userToAddFriends.profileId,
          firstName: userToAddFriends.firstName,
          lastName: userToAddFriends.lastName,
          profilePicture: userToAddFriends.profilePicture,
        };
        const friendsBasicInfo = {
          profileId: userToBefriendInfo.profileId,
          firstName: userToBefriendInfo.firstName,
          lastName: userToBefriendInfo.lastName,
          profilePicture: userToBefriendInfo.profilePicture,
        };
        const chatReferenceInfo = {
          id: getRandomUIDv4(),
          users: [userToBefriendInfo.profileId, userToAddFriends.profileId],
        };
        const status =
          Math.random() < 0.8 ? 'accepted' : Math.random() > 0.1 ? 'pending' : 'blocked';
        const friend: IFriend = {
          connectionId: connectionUUID,
          status: status,
          createdAt: getPastDate(),
          chatReference: chatReferenceInfo,
          basicInfo: friendsBasicInfo,
        };
        const publicFriendship: IFriendConnection = {
          id: connectionUUID,
          usersIds: [usersBasicInfo.profileId, userToBefriendInfo.profileId],
          status: status,
        };
        usersPublicFriendships.push(publicFriendship);
        usersFriends.push(friend);
        const befriendedUserIndex = users.findIndex(
          (user) => user.profileId === userToBefriendInfo.profileId,
        );

        allUsersFriendsConnections[befriendedUserIndex].push(publicFriendship);

        const flippedFriend: IFriend = {
          connectionId: connectionUUID,
          status: friend.status,
          createdAt: friend.createdAt,
          basicInfo: usersBasicInfo,
          chatReference: chatReferenceInfo,
        };

        allUsersFreinds[befriendedUserIndex].push(flippedFriend);
      }
      allUsersFriendsConnections.push(usersPublicFriendships);
      allUsersFreinds.push(usersFriends);
    });

    return { allUsersFreinds, allUsersFriendsConnections };
  }

  function getRandomUsers() {
    const users: IUser[] = [];
    const basicInfoOfUsers: IUserBasicInfo[] = [];
    const postsOfUsers: IPost[][] = [];
    const picturesOfUsers: IInProfilePicture[][] = [];
    for (let i = 0; i < usersAmount; i++) {
      const userBasicInfo = usersBasicInfo[i];
      const userPosts = getRandomPosts(2, userBasicInfo);
      const userPictures = getRandomProfilePhotos(1, userBasicInfo);
      const user: IUser = {
        ...userBasicInfo,
        backgroundPicture: getRandomBacgroundPicture(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        biography: faker.lorem.paragraph(),
        chatReferences: [],
        groups: [],
        intrests: [],
        friends: [],
        about: {
          country: faker.address.country(),
          city: faker.address.city(),
          address: faker.address.streetAddress(),
          hometown: faker.address.city(),
          workplace: faker.company.name(),
          highSchool: faker.lorem.words(3),
          college: faker.lorem.words(3),
          relationship: '',
        },
        isDummy: true,
      };
      users.push(user);
      postsOfUsers.push(userPosts);
      picturesOfUsers.push(userPictures);
      basicInfoOfUsers.push(userBasicInfo);
    }
    return { users, postsOfUsers, picturesOfUsers, basicInfoOfUsers };
  }
  const { users, postsOfUsers, picturesOfUsers, basicInfoOfUsers } = getRandomUsers();
  const { allUsersFreinds, allUsersFriendsConnections } = getRandomFriends(friendsAmount);
  return {
    users,
    postsOfUsers,
    picturesOfUsers,
    basicInfoOfUsers,
    allUsersFreinds,
    allUsersFriendsConnections,
    allPosts,
  };
}

export async function generateUsersAndPostToDb(usersAmount: number, friendsAmount: number) {
  console.log('generating users and other data...');
  const {
    users,
    postsOfUsers,
    picturesOfUsers,
    allUsersFreinds,
    allUsersFriendsConnections,
    basicInfoOfUsers,
    allPosts,
  } = generateUsers(usersAmount, friendsAmount);
  const userDataBatches: WriteBatch[] = [];

  const usersDataToCommit: IUserServerData[][] = [[], [], []];
  const friendsConnectionsToCommit: IFriendConnection[] = [];
  const usersPublicDataToCommit: IUserBasicInfo[] = [];
  const postsToCommit: IPost[] = [];

  for (let i = 0; i < users.length; i++) {
    const data = users[i];
    friendsConnectionsToCommit.push(...allUsersFriendsConnections[i]);
    usersPublicDataToCommit.push(basicInfoOfUsers[i]);
    const userDocRef = doc(db, 'users', data.profileId);
    const userPostsCollectionRef = doc(collection(db, 'users', data.profileId, 'posts'));
    const userPicturesCollectionRef = doc(collection(db, 'users', data.profileId, 'pictures'));

    const allUserData = {
      data,
      posts: postsOfUsers[i],
      pictures: picturesOfUsers[i],
      friends: allUsersFreinds[i],
    };

    const batchIndex = i % Math.ceil(users.length / 15);
    if (!userDataBatches[batchIndex]) {
      userDataBatches[batchIndex] = writeBatch(db);
      usersDataToCommit[batchIndex] = [];
    }
    usersDataToCommit[batchIndex].push(allUserData);

    userDataBatches[batchIndex].set(userDocRef, {
      ...allUserData.data,
      friends: allUserData.friends,
    });

    userDataBatches[batchIndex].set(userPostsCollectionRef, { ...postsOfUsers[i] });
    userDataBatches[batchIndex].set(userPicturesCollectionRef, { ...picturesOfUsers[i] });
  }

  const postBatches: WriteBatch[] = [];
  allPosts.forEach((post, i) => {
    const batchIndex = i % Math.ceil(postsToCommit.length / 40);
    const docRef = doc(db, 'posts', post.id);
    if (!postBatches[batchIndex]) {
      postBatches[batchIndex] = writeBatch(db);
    }
    postBatches[batchIndex].set(docRef, post);
    postsToCommit.push(post);
  });

  const friendsConnectionsBatches: WriteBatch[] = [];
  friendsConnectionsToCommit.forEach((friendConnection, i) => {
    const batchIndex = i % Math.ceil(friendsConnectionsToCommit.length / 500);
    const docRef = doc(db, 'friendsConnections', friendConnection.id);
    if (!friendsConnectionsBatches[batchIndex]) {
      friendsConnectionsBatches[batchIndex] = writeBatch(db);
    }
    friendsConnectionsBatches[batchIndex].set(docRef, friendConnection);
  });

  const usersPublicDataBatch = writeBatch(db);
  const usersPublicDataDocId = uuidv4();
  const usersPublicDataAsObjects = usersPublicDataToCommit.map((publicData) => {
    const key = publicData.profileId;
    const { firstName, lastName, profilePicture } = publicData;
    const publicDataWithoutProfileId = { firstName, lastName, profilePicture };
    return { [key]: publicDataWithoutProfileId };
  });
  const docRef = doc(db, 'usersPublicData', usersPublicDataDocId);
  usersPublicDataBatch.set(docRef, {});
  usersPublicDataAsObjects.forEach((userPublicData) => {
    usersPublicDataBatch.update(docRef, userPublicData);
  });

  const baseSleepTime = 7000;
  //Don't care enought to make it good, that scripts drives me crazy, it just has to work
  console.log(`you going to commit:\n`);
  userDataBatches.forEach((batch, i) => {
    console.log(`batch ${i + 1}`, usersDataToCommit[i]);
  });
  console.log(`posts`, postsToCommit);
  console.log(`friendsConnections`, friendsConnectionsToCommit);
  console.log(`usersPublicData`, usersPublicDataToCommit);
  console.log('commiting batches, hold tight');
  try {
    // sleep increses the max amount of users cause promise is resolved before the batch is written
    console.log(`\nCOMMITTING USERS DATA`);
    for (let i = 0; i < userDataBatches.length; i++) {
      const batch = userDataBatches[i];
      console.log(`commiting ${i + 1} users batch`);
      await batch.commit();
      console.log(`commiting ${i + 1} users batch done`);
      await sleep(baseSleepTime);
    }
    console.log(`COMMITTING USERS DATA DONE`);
    await sleep(baseSleepTime * 1.5);

    console.log(`\nCOMMITING USERS PUBLIC DATA`);
    await usersPublicDataBatch.commit();
    console.log(`COMMITING USERS PUBLIC DATA DONE`);
    await sleep(baseSleepTime * 1.5);

    // console.log(`\nCOMMITING FRIENDS CONNECTIONS`);
    // for (let i = 0; i < friendsConnectionsBatches.length; i++) {
    //   const batch = friendsConnectionsBatches[i];
    //   console.log(`commiting ${i + 1} friendsConnections batch`);
    //   await batch.commit();
    //   console.log(`commiting ${i + 1} friendsConnections batch done`);
    //   await sleep(baseSleepTime / 2);
    // }
    // console.log(`COMMITING FRIENDS CONNECTIONS DONE`);
    // await sleep(baseSleepTime);

    console.log(`\nCOMMITING POSTS`);
    for (let i = 0; i < postBatches.length; i++) {
      const batch = postBatches[i];
      console.log(`commiting ${i + 1} posts batch`);
      await batch.commit();
      console.log(`commiting ${i + 1} posts batch done`);
      await sleep(baseSleepTime);
    }
    console.log(`\nCOMMITING POSTS DONE`);
  } catch (e) {
    console.log(e);
  } finally {
    console.log('process ended');
  }
}

async function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export function AddUsersButton() {
  return <Button onClick={() => generateUsersAndPostToDb(30, 25)}>AddEm</Button>;
}
