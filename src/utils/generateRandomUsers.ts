//! This is a script that generates random users and adds them to the database. Use it only for testing purposes, it's not a part of the project, just a helper. Also it's spaghetti code, don't try to understand it.
//! Don't exeed 60 users, firebase won't handle it
import { db } from '@/config/firebase.config';
import { Comment } from '@/types/comment';
import { Friend } from '@/types/firend';
import { ProfilePicture } from '@/types/picture';
import { Post } from '@/types/post';
import { Reaction } from '@/types/reaction';
import { BasicUserInfo, User } from '@/types/user';
import { UserServerData } from '@/types/userServerData';
const { faker } = require('@faker-js/faker');

import * as from from '@faker-js/faker';
import { doc, writeBatch } from 'firebase/firestore';

//Don't even ask why, just a hack to make faker work with typescript
const fakerTyped = faker as from.Faker;

const randomPicutresSources = [
  fakerTyped.image.animals,
  fakerTyped.image.business,
  fakerTyped.image.cats,
  fakerTyped.image.food,
  fakerTyped.image.nightlife,
  fakerTyped.image.people,
  fakerTyped.image.nature,
  fakerTyped.image.technics,
];

export function getPastDate() {
  return fakerTyped.date.past(0.4, new Date());
}

export function generateUsers(usersCount: number, friendsAmount: number) {
  if (usersCount > 60) {
    usersCount = 60;
  }
  if (usersCount < 10) {
    usersCount = 10;
  }
  const usersUIDS: string[] = [];

  for (let i = 0; i < usersCount; i++) {
    usersUIDS.push(fakerTyped.datatype.uuid());
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
        userId: ownerId,
        commentText: fakerTyped.lorem.sentences(Math.floor(Math.random() * 5) + 1, '\n'),
        commentResponses: [],
        reactions: getRandomReactions(reactionsCount),
      });
    }
    return comments;
  }

  function getRandomReactions(amount: number) {
    const reactions: Array<Reaction> = [];
    const possibleReactions: Array<Reaction['reaction']> = [
      'angry',
      'like',
      'love',
      'sad',
      'wow',
      'haha',
    ];
    for (let i = 0; i < Math.ceil(Math.random() * amount) + 2; i++) {
      const reactingUserUID = getRandomUserUID();
      if (reactions.some((reaction) => reaction.userId === reactingUserUID)) {
        continue;
      }
      const reaction = {
        reaction: fakerTyped.helpers.arrayElement(possibleReactions),
        userId: reactingUserUID,
      };
      reactions.push(reaction);
    }

    return reactions;
  }

  function getRandomProfilePhotos(amount: number, basicUserInfo: BasicUserInfo) {
    const photos: ProfilePicture[] = [];
    for (let i = 0; i < Math.ceil(Math.random() * amount) + 4; i++) {
      const photoId = fakerTyped.datatype.uuid();
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
      const postId = fakerTyped.datatype.uuid();
      const post: Post = {
        id: postId,
        owner: basicUserInfo,
        postText: fakerTyped.lorem.sentences(Math.floor(Math.random() * 3) + 1, '\n'),
        postPictures: hasPictures ? postPictures : [],
        comments: getRandomComents(14, 8),
        reactions: getRandomReactions(140),
        createdAt: getPastDate(),
      };
      posts.push(post);
    }
    return posts;
  }

  function getRandomFriends(friendsAmount: number) {
    if (friendsAmount > 60) {
      friendsAmount = 60;
    }
    if (friendsAmount < 5) {
      friendsAmount = 5;
    }
    const allUsersFreinds: Friend[][] = [];
    users.forEach((userToAddFriends, i) => {
      const usersFriends: Friend[] = [];
      const friendsCount = Math.max(Math.floor(Math.random() * friendsAmount), 10);
      for (let i = 0; i < friendsCount; i++) {
        const userToBefriend = users[Math.floor(Math.random() * users.length)];
        if (userToBefriend.profileId === userToAddFriends.profileId) {
          continue;
        }
        if (usersFriends.some((friend) => friend.info.profileId === userToBefriend.profileId)) {
          continue;
        }
        const friend: Friend = {
          connectionId: fakerTyped.datatype.uuid(),
          status: Math.random() < 0.8 ? 'accepted' : Math.random() > 0.1 ? 'pending' : 'blocked',
          createdAt: getPastDate(),
          ownerId: userToAddFriends.profileId,
          chatReference: {
            id: fakerTyped.datatype.uuid(),
            receiverID: userToBefriend.profileId,
            senderID: userToAddFriends.profileId,
          },
          info: {
            profileId: userToBefriend.profileId,
            firstName: userToBefriend.firstName,
            middleName: userToBefriend.middleName,
            lastName: userToBefriend.lastName,
            profilePicture: userToBefriend.profilePicture,
          },
        };
        usersFriends.push(friend);
      }
      allUsersFreinds.push(usersFriends);
    });
    return allUsersFreinds;
  }

  function getRandomUsers() {
    const users: User[] = [];
    const postsOfUsers: Post[][] = [];
    const picturesOfUsers: ProfilePicture[][] = [];
    for (let i = 0; i < usersCount; i++) {
      const userUUID = usersUIDS[i];
      const basicUserInfo = {
        profileId: userUUID,
        firstName: fakerTyped.name.firstName(),
        middleName: Math.random() > 0.9 ? fakerTyped.name.middleName() : '',
        lastName: fakerTyped.name.lastName(),
        profilePicture: fakerTyped.image.avatar(),
      };

      const userPosts = getRandomPosts(10, basicUserInfo);
      const userPictures = getRandomProfilePhotos(15, basicUserInfo);
      const user: User = {
        ...basicUserInfo,
        backgroundPicture: fakerTyped.image.nature(),
        email: fakerTyped.internet.email(),
        phoneNumber: fakerTyped.phone.number(),
        biography: fakerTyped.lorem.paragraph(),
        picutresReferences: userPictures.map((picture) => {
          return {
            id: picture.id,
            ownerId: basicUserInfo.profileId,
            createdAt: getPastDate(),
          };
        }),
        chatReferences: [],
        postReferences: userPosts.map((post) => {
          return {
            id: post.id,
            owner: basicUserInfo,
            createdAt: getPastDate(),
          };
        }),
        friends: [],
        groups: [],
        intrests: [],
        about: {
          country: fakerTyped.address.country(),
          city: fakerTyped.address.city(),
          address: fakerTyped.address.streetAddress(),
          hometown: fakerTyped.address.city(),
          workplace: fakerTyped.company.name(),
          highSchool: fakerTyped.lorem.sentence(),
          college: fakerTyped.lorem.sentence(),
          relationship: '',
        },
        isDummy: true,
      };
      users.push(user);
      postsOfUsers.push(userPosts);
      picturesOfUsers.push(userPictures);
    }
    return { users, postsOfUsers, picturesOfUsers };
  }
  const { users, postsOfUsers, picturesOfUsers } = getRandomUsers();
  const friendsOfUsers = getRandomFriends(friendsAmount);
  return { users, postsOfUsers, picturesOfUsers, friendsOfUsers };
}

export async function generateUsersAndPostToDb(usersAmount: number, friendsAmount: number) {
  const { users, postsOfUsers, picturesOfUsers, friendsOfUsers } = generateUsers(
    usersAmount,
    friendsAmount,
  );
  const batch = writeBatch(db);
  users.forEach((data) => {
    const docRef = doc(db, 'users', data.profileId);
    const allUserData: UserServerData = {
      user: data,
      posts: postsOfUsers[users.indexOf(data)],
      pictures: picturesOfUsers[users.indexOf(data)],
      friends: friendsOfUsers[users.indexOf(data)],
    };
    batch.set(docRef, {
      ...allUserData,
    });
  });
  //eslint-disable-next-line no-console
  console.log('commiting batch');
  try {
    await batch.commit();
  } catch (e) {
    //eslint-disable-next-line no-console
    console.log(e);
  }
  //eslint-disable-next-line no-console
  console.log('commited batch');
}
