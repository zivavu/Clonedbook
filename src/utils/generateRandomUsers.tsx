/* eslint-disable no-console*/

//! This is a script that generates random users and adds them to the database. Use it only for testing purposes, it's not a part of the project, just a helper. Also it's far beyond the worst spaghetti code, don't try to understand it.
//! It uploads a lot(dozens of MB) of data batch after batch so will take time to execute
import { db } from '@/config/firebase.config';
import { IComment } from '@/types/comment';
import { IFriend, IPublicFriendship } from '@/types/firend';
import { IInProfilePicture } from '@/types/picture';
import { IPost } from '@/types/post';
import { IUserReaction } from '@/types/reaction';
import { IBasicUserInfo, IUser } from '@/types/user';
import { IUserServerData } from '@/types/userServerData';
import { faker } from '@faker-js/faker';
import { uuidv4 } from '@firebase/util';
import { Button } from '@mui/material';

import { Timestamp, WriteBatch, doc, writeBatch } from 'firebase/firestore';

const randomPostPictures = [
  faker.image.people,
  faker.image.nature,
  faker.image.technics,
  faker.image.transport,
  faker.image.abstract,
  faker.image.animals,
  faker.image.business,
  `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/700/700`,
  `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/1000/700`,
  `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/1300/800`,
];
const randomProfilePictures = [faker.image.people, faker.internet.avatar];
const randomBackgroundPictures = [faker.image.nature, faker.image.animals];

export function getPastDate() {
  const date = Timestamp.fromDate(faker.date.past(0.4, new Date()));
  return date;
}

const maxUsers = 40,
  maxFriends = 40;
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
    const discutants = usersUIDS.slice(
      0,
      Math.max(Math.floor((Math.random() * usersUIDS.length) / 8), 5),
    );
    for (let i = 0; i < Math.floor(Math.random() * amount); i++) {
      const ownerId = discutants[Math.floor(Math.random() * discutants.length) || 0];
      const ownerBasicUserInfo = usersBasicInfo.find(
        (user) => user.profileId === ownerId,
      ) as IBasicUserInfo;
      comments.push({
        id: getRandomUIDv4(),
        owner: ownerBasicUserInfo,
        commentText: faker.lorem.sentences(Math.floor(Math.random() * 5) + 1, '\n'),
        commentResponses: [],
        reactions: getRandomReactions(reactionsCount),
      });
    }
    return comments;
  }

  function getRandomReactions(amount: number) {
    const reactions: Array<IUserReaction> = [];
    const possibleReactions: Array<IUserReaction['type']> = [
      'angry',
      'like',
      'love',
      'sad',
      'wow',
      'haha',
    ];
    for (let i = 0; i < Math.ceil(Math.random() * amount) + 5; i++) {
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
    for (let i = 0; i < Math.ceil(Math.random() * amount) + 4; i++) {
      const photoId = getRandomUIDv4();
      const photo: IInProfilePicture = {
        ownerInfo: basicUserInfo,
        id: photoId,
        pictureURL: getRandomPhotoUrl(),
        reactions: getRandomReactions(50),
        comments: getRandomComents(8, 7),
      };
      photos.push(photo);
    }
    return photos;
  }
  function getRandomPosts(amount: number, basicUserInfo: IBasicUserInfo) {
    const posts: Array<IPost> = [];
    for (let i = 0; i < Math.ceil(Math.random() * amount) + 2; i++) {
      const postPictures: string[] = [];
      const hasPictures = Math.random() > 0.2;
      for (let i = 0; i < Math.ceil(Math.random() * 14); i++) {
        postPictures.push(getRandomPhotoUrl());
      }
      const postId = getRandomUIDv4();

      const postReactions = getRandomReactions(80);
      const exampleReactions = postReactions.slice(0, 5);
      const exampleReactors = exampleReactions.map((reaction) => {
        const reactorsBasicInfo = usersBasicInfo.find((user) => user.profileId === reaction.userId);
        return reactorsBasicInfo as IBasicUserInfo;
      });

      const post: IPost = {
        id: postId,
        owner: basicUserInfo,
        postText: faker.lorem.sentences(Math.floor(Math.random() * 3) + 1, '\n'),
        postPictures: hasPictures ? postPictures : [],
        comments: getRandomComents(14, 8),
        reactions: postReactions,
        exampleReactors: exampleReactors,
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
    const allUsersPublicFriendships: IPublicFriendship[][] = new Array(usersAmount);
    for (let i = 0; i < usersAmount; i++) {
      allUsersFreinds[i] = [];
      allUsersPublicFriendships[i] = [];
    }
    users.forEach((userToAddFriends) => {
      const usersFriends: IFriend[] = [];
      const usersPublicFriendships: IPublicFriendship[] = [];
      const friendsCount = Math.max(Math.floor(Math.random() * friendsAmount), 10);
      for (let i = 0; i < friendsCount; i++) {
        const userToBefriendInfo = users[Math.floor(Math.random() * users.length)];
        if (userToBefriendInfo.profileId === userToAddFriends.profileId) {
          continue;
        }
        if (usersFriends.some((friend) => friend.info.profileId === userToBefriendInfo.profileId)) {
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
        const friend: IFriend = {
          connectionId: connectionUUID,
          status: Math.random() < 0.8 ? 'accepted' : Math.random() > 0.1 ? 'pending' : 'blocked',
          createdAt: getPastDate(),
          ownerId: userToAddFriends.profileId,
          chatReference: chatReferenceInfo,
          info: friendsBasicInfo,
        };
        const publicFriendship: IPublicFriendship = {
          connectionId: connectionUUID,
          users: [usersBasicInfo, userToBefriendInfo],
        };
        usersPublicFriendships.push(publicFriendship);
        usersFriends.push(friend);
        const befriendedUserIndex = users.findIndex(
          (user) => user.profileId === userToBefriendInfo.profileId,
        );

        allUsersPublicFriendships[befriendedUserIndex].push(publicFriendship);

        const flippedFriend: IFriend = {
          connectionId: connectionUUID,
          status: friend.status,
          createdAt: friend.createdAt,
          ownerId: friend.info.profileId,
          info: usersBasicInfo,
          chatReference: chatReferenceInfo,
        };

        allUsersFreinds[befriendedUserIndex].push(flippedFriend);
      }
      allUsersPublicFriendships.push(usersPublicFriendships);
      allUsersFreinds.push(usersFriends);
    });

    return { allUsersFreinds, allUsersPublicFriendships };
  }

  function getRandomUsers() {
    const users: IUser[] = [];
    const basicInfoOfUsers: IBasicUserInfo[] = [];
    const postsOfUsers: IPost[][] = [];
    const picturesOfUsers: IInProfilePicture[][] = [];
    for (let i = 0; i < usersAmount; i++) {
      const userBasicInfo = usersBasicInfo[i];
      const userPosts = getRandomPosts(7, userBasicInfo);
      const userPictures = getRandomProfilePhotos(10, userBasicInfo);
      const user: IUser = {
        ...userBasicInfo,
        backgroundPicture: getRandomBacgroundPicture(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        biography: faker.lorem.paragraph(),
        picutresReferences: userPictures.map((picture) => {
          return {
            id: picture.id,
            ownerId: userBasicInfo.profileId,
            createdAt: getPastDate(),
          };
        }),
        chatReferences: [],
        postReferences: userPosts.map((post) => {
          return {
            id: post.id,
            owner: userBasicInfo,
            createdAt: getPastDate(),
          };
        }),
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
  const { allUsersFreinds, allUsersPublicFriendships } = getRandomFriends(friendsAmount);
  return {
    users,
    postsOfUsers,
    picturesOfUsers,
    basicInfoOfUsers,
    allUsersFreinds,
    allUsersPublicFriendships,
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
    allUsersPublicFriendships,
    basicInfoOfUsers,
    allPosts,
  } = generateUsers(usersAmount, friendsAmount);
  console.log('generating users and other data... done');
  const batches: WriteBatch[] = [writeBatch(db), writeBatch(db), writeBatch(db)];
  const dataThatWillBeCommited: IUserServerData[][] = [[], [], []];
  const postsThatWillBeCommited: IPost[] = [];
  for (let i = 0; i < users.length; i++) {
    const data = users[i];
    const docRef = doc(db, 'users', data.profileId);
    const allUserData: IUserServerData = {
      data,
      public: basicInfoOfUsers[i],
      posts: postsOfUsers[i],
      pictures: picturesOfUsers[i],
      friends: allUsersFreinds[i],
      friendConnections: allUsersPublicFriendships[i],
    };
    if (i % 3 === 0) {
      batches[0].set(docRef, {
        ...allUserData,
      });
      dataThatWillBeCommited[0].push(allUserData);
    }
    if (i % 3 === 1) {
      batches[1].set(docRef, {
        ...allUserData,
      });
      dataThatWillBeCommited[1].push(allUserData);
    }
    if (i % 3 === 2) {
      batches[2].set(docRef, {
        ...allUserData,
      });
      dataThatWillBeCommited[2].push(allUserData);
    }
  }
  const postBatch = writeBatch(db);
  allPosts.forEach((post) => {
    const docRef = doc(db, 'posts', post.id);
    postBatch.set(docRef, post);
    postsThatWillBeCommited.push(post);
  });

  //Don't care enought to make it good, that scripts drives me crazy, it just has to work
  console.log(`you going to commit batch1`, dataThatWillBeCommited[0]);
  console.log(`batch2`, dataThatWillBeCommited[1]);
  console.log(`batch3`, dataThatWillBeCommited[2]);
  console.log(`posts`, postsThatWillBeCommited);
  console.log('commiting batches, hold tight');
  try {
    console.log(`commiting batch 1`);
    await batches[0].commit();
    console.log(`commiting batch 1 done`);
    //sleep increses the max amount of users cause promise is resolved before the batch is written
    console.log(`sleeping `);
    await sleep(15000);
    console.log(`commiting batch 2`);
    await batches[1].commit();
    console.log(`commiting batch 2 done`);
    console.log(`sleeping`);
    await sleep(15000);
    console.log(`commiting batch 3`);
    await batches[2].commit();
    console.log(`commiting batch 3 done`);
    console.log(`sleeping`);
    await sleep(15000);
    console.log(`commiting posts`);
    await postBatch.commit();
    console.log(`commiting posts done`);
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
  return <Button onClick={() => generateUsersAndPostToDb(50, 50)}>AddEm</Button>;
}
