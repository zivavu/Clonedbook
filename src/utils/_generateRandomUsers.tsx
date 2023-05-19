/* eslint-disable no-console*/

//! This is a script that generates random users and adds them to the database. Use it only for testing purposes, it's not a part of the project, just a helper. Also it's far beyond the worst spaghetti code, don't try to understand it.
//! It uploads a significant amount of data batch after batch and takes sleeps in between to not overload firebase so will take time to execute

import { db } from '@/config/firebase.config';
import { ICommentMap } from '@/types/comment';
import { ICreatedAt } from '@/types/createdAt';
import { IFriend, IFriendsMap, IPublicFriendsMap } from '@/types/firend';
import { IAccountPicture, IPicturesMap } from '@/types/picture';
import { IPost, IPostsMap } from '@/types/post';
import { IReactionsMap, TReactionType } from '@/types/reaction';
import { IUser, IUserBasicInfo, TRealationshipStatus } from '@/types/user';
import { IUserServerData } from '@/types/userServerData';
import { faker } from '@faker-js/faker';
import { uuidv4 } from '@firebase/util';
import { Button } from '@mui/material';

import { Timestamp, WriteBatch, collection, doc, writeBatch } from 'firebase/firestore';
import { separateUserBasicInfo } from './separateUserBasicInfo';

const randomPostPictures = [
  faker.image.people,
  faker.image.nature,
  faker.image.transport,
  faker.image.abstract,
  faker.image.animals,
  faker.image.business,
];

const randomProfilePictures = [faker.image.people];

function getPastDate() {
  return Timestamp.fromDate(faker.date.past({ refDate: new Date(), years: 0.5 }));
}
function getDateAfterTimestamp(pastDate: ICreatedAt) {
  const date = new Date(pastDate.seconds * 1000);
  return Timestamp.fromDate(faker.date.between({ from: date, to: new Date() }));
}

const maxUsers = 80,
  maxFriends = 60;
export function generateUsers(usersAmount: number = maxUsers, friendsAmount: number = maxFriends) {
  if (maxFriends > maxUsers) friendsAmount = maxUsers - 1;
  if (usersAmount > maxUsers) {
    usersAmount = maxUsers;
  }
  if (usersAmount < 15) {
    usersAmount = 15;
  }
  const usersUIDS: string[] = [];

  for (let i = 0; i < usersAmount; i++) {
    usersUIDS.push(getRandomUIDv4());
  }
  const allPosts: IPost[] = [];

  function getRandomPicture() {
    return randomPostPictures[Math.floor(Math.random() * randomPostPictures.length)](
      800,
      800,
      true,
    );
  }
  function getRandomProfilePicture() {
    return randomProfilePictures[Math.floor(Math.random() * randomProfilePictures.length)](
      800,
      800,
      true,
    );
  }
  function getRandomBacgroundPicture() {
    return randomPostPictures[Math.floor(Math.random() * randomPostPictures.length)](
      1200,
      800,
      true,
    );
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
        (user) => user.id === ownerId,
      ) as IUserBasicInfo;
      const longCommnet = Math.random() > 0.5;
      const commentId = getRandomUIDv4();
      comments[commentId] = {
        id: commentId,
        ownerId: ownerBasicUserInfo.id,
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
    const basicUserInfo: IUserBasicInfo = {
      id: userUUID,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      picture: getRandomProfilePicture(),
    };
    usersBasicInfo.push(basicUserInfo);
  }

  function getRandomProfilePhotos(amount: number, basicUserInfo: IUserBasicInfo) {
    const photos: IPicturesMap = {};
    const photosAmount = Math.ceil(Math.random() * amount) + 2;
    for (let i = 0; i < photosAmount; i++) {
      const createdAt = getPastDate();
      const photoId = getRandomUIDv4();
      const photo: IAccountPicture = {
        id: photoId,
        ownerId: basicUserInfo.id,
        wallOwnerId: basicUserInfo.id,
        text: faker.lorem.words(Math.floor(Math.random() * 5) + 3),
        createdAt,
        url: getRandomPicture(),
        reactions: getRandomReactions(40),
        comments: getRandomComments(4, 7, createdAt),
        shareCount: Math.floor(Math.random() * 50),
      };
      photos[photoId] = photo;
    }
    return photos;
  }
  function getRandomPosts(amount: number, basicUserInfo: IUserBasicInfo) {
    const posts: IPostsMap = {};
    const postAmount = Math.ceil(Math.random() * amount);
    for (let i = 0; i < postAmount; i++) {
      const postPictures: string[] = [];
      const hasPictures = Math.random() > 0.3;
      const picturesAmount = Math.floor(Math.random() * 12);
      for (let i = 0; i < picturesAmount; i++) {
        postPictures.push(getRandomPicture());
      }
      const postId = getRandomUIDv4();

      const postReactions = getRandomReactions(Math.random() > 0.9 ? 70 : 40);
      const createdAt = getPastDate();
      const post: IPost = {
        id: postId,
        ownerId: basicUserInfo.id,
        wallOwnerId: basicUserInfo.id,
        text: faker.lorem.sentences(Math.floor(Math.random() * 3) + 1, '\n'),
        pictures: hasPictures ? postPictures : [],
        comments: getRandomComments(18, 8, createdAt),
        reactions: postReactions,
        shareCount: Math.floor(Math.random() * 30),
        createdAt,
      };
      posts[postId] = post;
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
    for (let i = 0; i < usersAmount; i++) {
      allUsersFreinds[i] = [];
    }
    users.forEach((userToAddFriends, i) => {
      const usersFriends: IFriend[] = [];
      const friendsCount = Math.max(Math.floor(Math.random() * friendsAmount), 2);
      for (let j = 0; j < friendsCount; j++) {
        let userToBefriendId: string | undefined = undefined;
        while (
          !userToBefriendId ||
          userToBefriendId === userToAddFriends.id ||
          usersFriends.some((friend) => friend.friendId === userToBefriendId)
        ) {
          userToBefriendId = users[Math.floor(Math.random() * users.length)].id;
        }

        const userBasicInfo: IUserBasicInfo = separateUserBasicInfo(userToAddFriends);

        const chatReferenceInfo = {
          id: getRandomUIDv4(),
          users: [userToBefriendId, userToAddFriends.id],
        };
        const status =
          Math.random() < 0.8 ? 'accepted' : Math.random() > 0.1 ? 'pending' : 'blocked';

        const friend: IFriend = {
          friendId: userToBefriendId,
          status: status,
          acceptedAt: getPastDate(),
          chatReference: chatReferenceInfo,
        };
        usersFriends.push(friend);
        allUsersFreinds[i].push(friend);

        const befriendedUserIndex = users.findIndex((user) => user.id === userToBefriendId);
        const flippedFriend: IFriend = {
          status: friend.status,
          friendId: userBasicInfo.id,
          acceptedAt: friend.acceptedAt,
          chatReference: chatReferenceInfo,
        };
        allUsersFreinds[befriendedUserIndex].push(flippedFriend);
      }
    });

    return { allUsersFreinds };
  }

  function getRandomUsers() {
    const users: IUser[] = [];
    const basicInfoOfUsers: IUserBasicInfo[] = [];
    const postsOfUsers: IPostsMap[] = [];
    const picturesOfUsers: IPicturesMap[] = [];
    const hasJob = Math.random() > 0.4;
    const relationships: TRealationshipStatus[] = [
      '',
      'single',
      'in a relationship',
      'in an open relationship',
      'engaged',
      'married',
      "it's complicated",
      'widowed',
      'separated',
      'divorced',
    ];
    const randomRelationship = relationships[Math.floor(Math.random() * relationships.length)];
    for (let i = 0; i < usersAmount; i++) {
      const userBasicInfo = usersBasicInfo[i];
      const userPosts = getRandomPosts(2, userBasicInfo);
      const userPictures = getRandomProfilePhotos(4, userBasicInfo);
      const user: IUser = {
        ...userBasicInfo,
        backgroundPicture: getRandomBacgroundPicture(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        biography: faker.person.bio(),
        chatReferences: [],
        groups: [],
        intrests: [],
        friends: {
          pending: {},
          accepted: {},
          blocked: {},
          rejected: {},
        },
        about: {
          country: faker.location.country(),
          city: faker.location.city(),
          address: faker.location.streetAddress(),
          hometown: faker.location.city(),
          sex: faker.person.sexType(),
          workplace: hasJob ? faker.company.name() : '',
          jobTitle: hasJob ? faker.person.jobTitle() : '',
          highSchool: faker.lorem.words(3),
          college: faker.lorem.words(3),
          relationship: randomRelationship,
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
  const { allUsersFreinds } = getRandomFriends(friendsAmount);
  return {
    users,
    postsOfUsers,
    picturesOfUsers,
    basicInfoOfUsers,
    allUsersFreinds,
    allPosts,
  };
}

export async function generateUsersAndPostToDb(usersAmount: number, friendsAmount: number) {
  const {
    users,
    postsOfUsers,
    picturesOfUsers,
    allUsersFreinds: allUsersFriends,
    basicInfoOfUsers,
    allPosts,
  } = generateUsers(usersAmount, friendsAmount);
  const userDataBatches: WriteBatch[] = [];

  const usersDataToCommit: IUserServerData[][] = [[], [], []];
  const usersPublicDataToCommit: IUserBasicInfo[] = [];
  const postsToCommit: IPost[] = [];

  for (let i = 0; i < users.length; i++) {
    usersPublicDataToCommit.push(basicInfoOfUsers[i]);

    const friendsMap: IFriendsMap = {
      pending: {},
      accepted: {},
      blocked: {},
      rejected: {},
    };
    const publicFriends: IPublicFriendsMap = {};

    for (const friend of allUsersFriends[i]) {
      friendsMap[friend.status][friend.friendId] = friend;
      if (friend.status === 'accepted') {
        publicFriends[friend.friendId] = friend.acceptedAt;
      }
    }

    const mainDocData = {
      ...users[i],
      friends: friendsMap,
    };

    const allUserData: IUserServerData = {
      data: mainDocData,
      publicFriends: publicFriends,
      pictures: picturesOfUsers[i],
    };

    const userDocRef = doc(db, 'users', mainDocData.id);
    const usersPublicFriendsCollectionRef = doc(
      collection(db, 'users', mainDocData.id, 'publicFriends'),
      'publicFriends',
    );
    const usersPicturesCollectionRef = doc(
      collection(db, 'users', mainDocData.id, 'pictures'),
      'pictures',
    );

    const batchIndex = i % Math.ceil(users.length / 20);
    if (!userDataBatches[batchIndex]) {
      userDataBatches[batchIndex] = writeBatch(db);
      usersDataToCommit[batchIndex] = [];
    }
    usersDataToCommit[batchIndex].push(allUserData);

    userDataBatches[batchIndex].set(userDocRef, {
      ...allUserData.data,
    });

    userDataBatches[batchIndex].set(usersPublicFriendsCollectionRef, publicFriends);
    userDataBatches[batchIndex].set(usersPicturesCollectionRef, picturesOfUsers[i]);
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

  const usersPublicDataBatch = writeBatch(db);
  const usersPublicDataDocId = uuidv4();
  const usersPublicDataAsObjects = usersPublicDataToCommit.map((publicData) => {
    const key = publicData.id;
    const { firstName, lastName, picture } = publicData;
    const publicDataWithoutProfileId = { firstName, lastName, picture };
    return { [key]: publicDataWithoutProfileId };
  });

  const docRef = doc(db, 'usersPublicData', usersPublicDataDocId);
  usersPublicDataBatch.set(docRef, {});
  usersPublicDataAsObjects.forEach((userPublicData) => {
    usersPublicDataBatch.update(docRef, userPublicData);
  });

  const baseSleepTime = 2000;
  //Don't care enought to make it good, that scripts drives me crazy, it just has to work
  console.log(`you going to commit:\n`);
  console.log(`posts`, postsToCommit);
  console.log(`usersData`, usersDataToCommit);
  // console.log(`friendsConnections`, friendsConnectionsToCommit);
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
  return <Button onClick={() => generateUsersAndPostToDb(60, 30)}>AddEm</Button>;
}
