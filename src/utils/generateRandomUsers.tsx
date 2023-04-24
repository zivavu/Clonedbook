/* eslint-disable no-console*/

//! This is a script that generates random users and adds them to the database. Use it only for testing purposes, it's not a part of the project, just a helper. Also it's far beyond the worst spaghetti code, don't try to understand it.
//! It uploads a lot(dozens of MB) of data batch after batch so will take time to execute
import { db } from '@/config/firebase.config';
import { IComment } from '@/types/comment';
import { IFriend, IFriendConnection } from '@/types/firend';
import { IInProfilePicture } from '@/types/picture';
import { IPost } from '@/types/post';
import { IReactionReference } from '@/types/reaction';
import { IBasicUserInfo, IUser } from '@/types/user';
import { IUserServerData } from '@/types/userServerData';
import { faker } from '@faker-js/faker';
import { uuidv4 } from '@firebase/util';
import { Button } from '@mui/material';

import { Timestamp, WriteBatch, doc, writeBatch } from 'firebase/firestore';

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

export function getPastDate() {
  const date = Timestamp.fromDate(faker.date.past(0.4, new Date()));
  return date;
}

const maxUsers = 80,
  maxFriends = 60;
export function generateUsers(usersAmount: number = maxUsers, friendsAmount: number = maxFriends) {
  if (maxFriends > maxUsers) friendsAmount = maxUsers - 1;
  if (usersAmount > maxUsers) {
    usersAmount = maxUsers;
  }
  if (usersAmount < 10) {
    usersAmount = 10;
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
  function getRandomComents(amount: number, reactionsCount: number) {
    const comments: Array<IComment> = [];
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
      ) as IBasicUserInfo;
      const longCommnet = Math.random() > 0.5;
      comments.push({
        id: getRandomUIDv4(),
        owner: ownerBasicUserInfo,
        commentText: longCommnet
          ? faker.lorem.sentences(Math.floor(Math.random() * 2) + 1, '\n')
          : faker.lorem.words(Math.floor(Math.random() * 5) + 3),
        commentResponses: [],
        reactions: getRandomReactions(reactionsCount),
      });
    }
    return comments;
  }

  function getRandomReactions(amount: number) {
    const reactions: Array<IReactionReference> = [];
    const possibleReactions: Array<IReactionReference['type']> = [
      'angry',
      'like',
      'love',
      'sad',
      'wow',
      'haha',
    ];
    for (let i = 0; i < amount; i++) {
      const reactingUserUID = getRandomUserUID();
      if (reactions.some((reaction) => reaction.userId === reactingUserUID)) {
        continue;
      }
      const reaction = {
        type: faker.helpers.arrayElement(possibleReactions),
        userId: reactingUserUID,
      };
      reactions.push(reaction);
    }

    return reactions;
  }

  const usersBasicInfo: IBasicUserInfo[] = [];
  for (let i = 0; i < usersAmount; i++) {
    const userUUID = usersUIDS[i];
    const basicUserInfo = {
      profileId: userUUID,
      firstName: faker.name.firstName(),
      middleName: Math.random() > 0.9 ? faker.name.middleName() : '',
      lastName: faker.name.lastName(),
      profilePicture: getRandomProfilePicture(),
    };
    usersBasicInfo.push(basicUserInfo);
  }

  function getRandomProfilePhotos(amount: number, basicUserInfo: IBasicUserInfo) {
    const photos: IInProfilePicture[] = [];
    const photosAmount = Math.ceil(Math.random() * amount) + 4;
    for (let i = 0; i < photosAmount; i++) {
      const photoId = getRandomUIDv4();
      const photo: IInProfilePicture = {
        ownerInfo: basicUserInfo,
        id: photoId,
        pictureURL: getRandomPhotoUrl(),
        reactions: getRandomReactions(50),
        comments: getRandomComents(8, 5),
        shareCount: Math.floor(Math.random() * 50),
      };
      photos.push(photo);
    }
    return photos;
  }
  function getRandomPosts(amount: number, basicUserInfo: IBasicUserInfo) {
    const posts: Array<IPost> = [];
    const postAmount = Math.ceil(Math.random() * amount) + 2;
    for (let i = 0; i < postAmount; i++) {
      const postPictures: string[] = [];
      const hasPictures = Math.random() > 0.3;
      const picturesAmount = Math.floor(Math.random() * 12);
      for (let i = 0; i < picturesAmount; i++) {
        postPictures.push(getRandomPhotoUrl());
      }
      const postId = getRandomUIDv4();

      const postReactions = getRandomReactions(Math.random() > 0.9 ? 70 : 40);
      const exampleReactions = postReactions.slice(0, 3);
      const exampleReactors = exampleReactions.map((reaction) => {
        const reactorsBasicInfo = usersBasicInfo.find((user) => user.profileId === reaction.userId);
        return reactorsBasicInfo as IBasicUserInfo;
      });
      const post: IPost = {
        id: postId,
        owner: basicUserInfo,
        postText: faker.lorem.sentences(Math.floor(Math.random() * 3) + 1, '\n'),
        postPictures: hasPictures ? postPictures : [],
        comments: getRandomComents(10, 6),
        reactions: postReactions,
        exampleReactors: exampleReactors,
        shareCount: Math.floor(Math.random() * 30),
        createdAt: getPastDate(),
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
          middleName: userToAddFriends.middleName,
          lastName: userToAddFriends.lastName,
          profilePicture: userToAddFriends.profilePicture,
        };
        const friendsBasicInfo = {
          profileId: userToBefriendInfo.profileId,
          firstName: userToBefriendInfo.firstName,
          middleName: userToBefriendInfo.middleName,
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
    const basicInfoOfUsers: IBasicUserInfo[] = [];
    const postsOfUsers: IPost[][] = [];
    const picturesOfUsers: IInProfilePicture[][] = [];
    for (let i = 0; i < usersAmount; i++) {
      const userBasicInfo = usersBasicInfo[i];
      const userPosts = getRandomPosts(Math.random() > 0.9 ? 20 : 4, userBasicInfo);
      const userPictures = getRandomProfilePhotos(6, userBasicInfo);
      const user: IUser = {
        ...userBasicInfo,
        backgroundPicture: getRandomBacgroundPicture(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        biography: faker.lorem.paragraph(),
        chatReferences: [],
        friends: [],
        groups: [],
        intrests: [],
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
  console.log('generating users and other data... done');
  const batches: WriteBatch[] = [writeBatch(db), writeBatch(db), writeBatch(db)];

  const usersDataToCommit: IUserServerData[][] = [[], [], []];
  const postsToCommit: IPost[] = [];
  const friendsConnectionsToCommit: IFriendConnection[] = [];
  const usersPublicDataToCommit: IBasicUserInfo[] = [];

  for (let i = 0; i < users.length; i++) {
    const data = users[i];
    friendsConnectionsToCommit.push(...allUsersFriendsConnections[i]);
    usersPublicDataToCommit.push(basicInfoOfUsers[i]);
    const userDocRef = doc(db, 'users', data.profileId);
    const allUserData: IUserServerData = {
      data,
      posts: postsOfUsers[i],
      pictures: picturesOfUsers[i],
      friends: allUsersFreinds[i],
    };
    if (i % 3 === 0) {
      batches[0].set(userDocRef, {
        ...allUserData,
      });
      usersDataToCommit[0].push(allUserData);
    }
    if (i % 3 === 1) {
      batches[1].set(userDocRef, {
        ...allUserData,
      });
      usersDataToCommit[1].push(allUserData);
    }
    if (i % 3 === 2) {
      batches[2].set(userDocRef, {
        ...allUserData,
      });
      usersDataToCommit[2].push(allUserData);
    }
  }

  const postBatch = writeBatch(db);
  allPosts.forEach((post) => {
    const docRef = doc(db, 'posts', post.id);
    postBatch.set(docRef, post);
    postsToCommit.push(post);
  });
  if (allPosts.length > 500) {
    console.log(`You want to post ${allPosts.length} posts, that's too much, you can't do that}`);
    return;
  }

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
  usersPublicDataToCommit.forEach((userPublicData) => {
    const docRef = doc(db, 'usersPublicData', userPublicData.profileId);
    usersPublicDataBatch.set(docRef, userPublicData);
  });
  if (usersPublicDataToCommit.length > 500) {
    console.log(
      `You want to post ${usersPublicDataToCommit.length} usersPublicData, that's too much, you can't do that}`,
    );
    return;
  }

  const baseSleepTime = 10000;
  //Don't care enought to make it good, that scripts drives me crazy, it just has to work
  console.log(`you going to commit batch1`, usersDataToCommit[0]);
  console.log(`batch2`, usersDataToCommit[1]);
  console.log(`batch3`, usersDataToCommit[2]);
  console.log(`posts`, postsToCommit);
  console.log(`friendsConnections`, friendsConnectionsToCommit);
  console.log(`usersPublicData`, usersPublicDataToCommit);
  console.log('commiting batches, hold tight');
  try {
    console.log(`commiting friendsConnections`);
    friendsConnectionsBatches.forEach(async (batch, i) => {
      console.log(`commiting ${i} friendsConnections batch`);
      await sleep((baseSleepTime / 2) * i);
      await batch.commit();
      console.log(`commiting ${i} friendsConnections batch done`);
      console.log(`sleeping for ${baseSleepTime / 2}ms`);
    });
    console.log(`commiting friendsConnections done`);

    await sleep(baseSleepTime);
    console.log(`commiting batch 1`);
    await batches[0].commit();
    console.log(`commiting batch 1 done`);
    //sleep increses the max amount of users cause promise is resolved before the batch is written
    console.log(`sleeping `);
    await sleep(baseSleepTime);
    console.log(`commiting batch 2`);
    await batches[1].commit();
    console.log(`commiting batch 2 done`);
    console.log(`sleeping`);
    await sleep(baseSleepTime);
    console.log(`commiting batch 3`);
    await batches[2].commit();
    console.log(`commiting batch 3 done`);
    console.log(`sleeping`);
    await sleep(baseSleepTime * 1.5);
    console.log(`commiting posts`);
    await postBatch.commit();
    console.log(`commiting posts done`);
    console.log(`sleeping`);
    await sleep(baseSleepTime);
    console.log(`commiting usersPublicData`);
    await usersPublicDataBatch.commit();
    console.log(`commiting usersPublicData done`);
    console.log('we are done');
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
  return <Button onClick={() => generateUsersAndPostToDb(30, 30)}>AddEm</Button>;
}
