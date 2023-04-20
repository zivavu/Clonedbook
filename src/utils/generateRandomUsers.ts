//! This is a script that generates random users and adds them to the database. Use it only for testing purposes, it's not a part of the project, just a helper. Also it's spaghetti code, don't try to understand it.
//! Don't exeed hardcoded limits of users added on one function call, firebase won't handle it cause of ~11MB of data per batch limit
import { db } from '@/config/firebase.config';
import { Comment } from '@/types/comment';
import { Friend, PublicFriendship } from '@/types/firend';
import { ProfilePicture } from '@/types/picture';
import { Post } from '@/types/post';
import { UserReaction } from '@/types/reaction';
import { BasicUserInfo, User } from '@/types/user';
import { UserServerData } from '@/types/userServerData';
import { faker } from '@faker-js/faker';

import { Timestamp, doc, writeBatch } from 'firebase/firestore';

//Don't even ask why, just a hack to make faker work with typescript

const randomPicutresSources = [
  faker.image.animals,
  faker.image.business,
  faker.image.cats,
  faker.image.food,
  faker.image.nightlife,
  faker.image.people,
  faker.image.nature,
  faker.image.technics,
  faker.image.transport,
];

export function getPastDate() {
  const date = Timestamp.fromDate(faker.date.past(0.4, new Date()));
  return date;
}

export function generateUsers(usersCount: number, friendsAmount: number) {
  if (usersCount > 30) {
    usersCount = 30;
  }
  if (usersCount < 10) {
    usersCount = 10;
  }
  const usersUIDS: string[] = [];

  for (let i = 0; i < usersCount; i++) {
    usersUIDS.push(faker.datatype.uuid());
  }

  const usersBasicInfo: BasicUserInfo[] = [];
  for (let i = 0; i < usersCount; i++) {
    const userUUID = usersUIDS[i];
    const basicUserInfo = {
      profileId: userUUID,
      firstName: faker.name.firstName(),
      middleName: Math.random() > 0.9 ? faker.name.middleName() : '',
      lastName: faker.name.lastName(),
      profilePicture: faker.image.avatar(),
    };
    usersBasicInfo.push(basicUserInfo);
  }

  function getRandomPhotoUrl() {
    return randomPicutresSources[Math.floor(Math.random() * randomPicutresSources.length)]();
  }

  function getRandomUserUID() {
    return usersUIDS[Math.floor(Math.random() * usersUIDS.length)];
  }
  function getRandomComents(amount: number, reactionsCount: number) {
    const comments: Array<Comment> = [];
    const discutants = usersUIDS.slice(
      0,
      Math.max(Math.floor((Math.random() * usersUIDS.length) / 8), 5),
    );
    for (let i = 0; i < Math.ceil(Math.random() * amount) + 2; i++) {
      const ownerId = discutants[Math.floor(Math.random() * discutants.length) || 0];
      comments.push({
        id: faker.datatype.uuid(),
        ownerId: ownerId,
        commentText: faker.lorem.sentences(Math.floor(Math.random() * 5) + 1, '\n'),
        commentResponses: [],
        reactions: getRandomReactions(reactionsCount),
      });
    }
    return comments;
  }

  function getRandomReactions(amount: number) {
    const reactions: Array<UserReaction> = [];
    const possibleReactions: Array<UserReaction['type']> = [
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

  function getRandomProfilePhotos(amount: number, basicUserInfo: BasicUserInfo) {
    const photos: ProfilePicture[] = [];
    for (let i = 0; i < Math.ceil(Math.random() * amount) + 4; i++) {
      const photoId = faker.datatype.uuid();
      const photo: ProfilePicture = {
        ownerInfo: basicUserInfo,
        id: photoId,
        pictureURL: getRandomPhotoUrl(),
        reactions: getRandomReactions(160),
        comments: getRandomComents(10, 7),
      };
      photos.push(photo);
    }
    return photos;
  }
  function getRandomPosts(amount: number, basicUserInfo: BasicUserInfo) {
    const posts: Array<Post> = [];
    for (let i = 0; i < Math.ceil(Math.random() * amount) + 4; i++) {
      const postPictures = [] as any;
      const hasPictures = Math.random() > 0.4;
      for (let i = 0; i < Math.ceil(Math.random() * 5); i++) {
        postPictures.push(getRandomPhotoUrl());
      }
      const postId = faker.datatype.uuid();

      const postReactions = getRandomReactions(140);
      const exampleReactions = postReactions.slice(0, 5);
      const exampleReactors = exampleReactions.map((reaction) => {
        const reactorsBasicInfo = usersBasicInfo.find((user) => user.profileId === reaction.userId);
        return reactorsBasicInfo as BasicUserInfo;
      });

      const post: Post = {
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
    }
    return posts;
  }

  function getRandomFriends(friendsAmount: number) {
    if (friendsAmount > 40) {
      friendsAmount = 40;
    }
    if (friendsAmount < 5) {
      friendsAmount = 5;
    }
    const allUsersFreinds: Friend[][] = new Array(usersCount);
    const allUsersPublicFriendships: PublicFriendship[][] = new Array(usersCount);
    for (let i = 0; i < usersCount; i++) {
      allUsersFreinds[i] = [];
      allUsersPublicFriendships[i] = [];
    }
    users.forEach((userToAddFriends) => {
      const usersFriends: Friend[] = [];
      const usersPublicFriendships: PublicFriendship[] = [];
      const friendsCount = Math.max(Math.floor(Math.random() * friendsAmount), 10);
      for (let i = 0; i < friendsCount; i++) {
        const userToBefriendInfo = users[Math.floor(Math.random() * users.length)];
        if (userToBefriendInfo.profileId === userToAddFriends.profileId) {
          continue;
        }
        if (usersFriends.some((friend) => friend.info.profileId === userToBefriendInfo.profileId)) {
          continue;
        }
        const connectionUUID = faker.datatype.uuid();
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
          id: faker.datatype.uuid(),
          users: [userToBefriendInfo.profileId, userToAddFriends.profileId],
        };
        const friend: Friend = {
          connectionId: connectionUUID,
          status: Math.random() < 0.8 ? 'accepted' : Math.random() > 0.1 ? 'pending' : 'blocked',
          createdAt: getPastDate(),
          ownerId: userToAddFriends.profileId,
          chatReference: chatReferenceInfo,
          info: friendsBasicInfo,
        };
        const publicFriendship: PublicFriendship = {
          connectionId: connectionUUID,
          users: [usersBasicInfo, userToBefriendInfo],
        };
        usersPublicFriendships.push(publicFriendship);
        usersFriends.push(friend);
        const befriendedUserIndex = users.findIndex(
          (user) => user.profileId === userToBefriendInfo.profileId,
        );

        allUsersPublicFriendships[befriendedUserIndex].push(publicFriendship);

        const flippedFriend: Friend = {
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
    const users: User[] = [];
    const basicInfoOfUsers: BasicUserInfo[] = [];
    const postsOfUsers: Post[][] = [];
    const picturesOfUsers: ProfilePicture[][] = [];
    for (let i = 0; i < usersCount; i++) {
      const userBasicInfo = usersBasicInfo[i];
      const userPosts = getRandomPosts(10, userBasicInfo);
      const userPictures = getRandomProfilePhotos(15, userBasicInfo);
      const user: User = {
        ...userBasicInfo,
        backgroundPicture: faker.image.nature(),
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
    allUsersFreinds,
    allUsersPublicFriendships,
    basicInfoOfUsers,
  };
}

export async function generateUsersAndPostToDb(usersAmount: number, friendsAmount: number) {
  const {
    users,
    postsOfUsers,
    picturesOfUsers,
    allUsersFreinds,
    allUsersPublicFriendships,
    basicInfoOfUsers,
  } = generateUsers(usersAmount, friendsAmount);
  const batch = writeBatch(db);
  users.forEach((data, i) => {
    const docRef = doc(db, 'users', data.profileId);

    const allUserData: UserServerData = {
      data,
      public: basicInfoOfUsers[i],
      posts: postsOfUsers[i],
      pictures: picturesOfUsers[i],
      friends: allUsersFreinds[i],
      friendConnections: allUsersPublicFriendships[i],
    };
    batch.set(docRef, {
      ...allUserData,
    });
  });

  // eslint-disable-next-line no-console
  console.log('commiting batch');
  try {
    await batch.commit();
    //eslint-disable-next-line no-console
    console.log('commited batch');
  } catch (e) {
    //eslint-disable-next-line no-console
    console.log(e);
  } finally {
    //eslint-disable-next-line no-console
    console.log('done');
  }
}
