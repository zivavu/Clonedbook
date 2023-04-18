//! This is a script that generates random users and adds them to the database. Use it only for testing purposes, it's not a part of the project, just a helper. Also it's spaghetti code, don't try to understand it.
//! Don't exeed 60 users, firebase won't handle it
import { db } from '@/config/firebase.config';
import { Comment } from '@/types/comment';
import { Friend } from '@/types/firend';
import { ProfilePicture } from '@/types/picture';
import { Post } from '@/types/post';
import { Reaction, UserReaction } from '@/types/reaction';
import { BasicUserInfo, User } from '@/types/user';
const { faker } = require('@faker-js/faker');

import * as from from '@faker-js/faker';
import { doc, setDoc, writeBatch } from 'firebase/firestore';

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

export const generateUsers = (usersCount: number) => {
  if (usersCount > 60) {
    usersCount = 60;
  }
  if (usersCount < 10) {
    usersCount = 10;
  }
  const usersUIDS: string[] = [];
  const usersReactions: UserReaction[][] = new Array(usersCount).fill([]);

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
        reactions: getRandomReactions(reactionsCount, ownerId),
      });
    }
    return comments;
  }

  function getRandomReactions(amount: number, itemId: string) {
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
      const reactingUserId = usersUIDS.indexOf(reactingUserUID);
      if (reactions.some((reaction) => reaction.userId === reactingUserUID)) {
        continue;
      }
      const reaction = {
        reaction: fakerTyped.helpers.arrayElement(possibleReactions),
        userId: reactingUserUID,
      };
      reactions.push(reaction);
      usersReactions[reactingUserId].push({ ...reaction, itemId: itemId });
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
        reactions: getRandomReactions(160, basicUserInfo.profileId),
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
        reactions: getRandomReactions(140, postId),
      };
      posts.push(post);
    }
    return posts;
  }

  function getRandomUsers() {
    const users: Array<User> = [];
    for (let i = 0; i < usersCount; i++) {
      const userUUID = usersUIDS[i];
      const basicUserInfo = {
        profileId: userUUID,
        firstName: fakerTyped.name.firstName(),
        middleName: Math.random() > 0.9 ? fakerTyped.name.middleName() : '',
        lastName: fakerTyped.name.lastName(),
        profilePicture: fakerTyped.image.avatar(),
      };
      const user: User = {
        ...basicUserInfo,
        backgroundPicture: fakerTyped.image.nature(),
        email: fakerTyped.internet.email(),
        phoneNumber: fakerTyped.phone.number(),
        biography: fakerTyped.lorem.paragraph(),
        pictures: getRandomProfilePhotos(15, basicUserInfo),
        posts: getRandomPosts(10, basicUserInfo),
        chats: [],
        friends: [],
        groups: [],
        intrests: [],
        reactedTo: [],
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
    }
    return users;
  }
  const users = getRandomUsers();
  return users;
};

function getRandomFriends(usersToAddFriends: User[], friendsToAdd: number) {
  if (friendsToAdd > 60) {
    friendsToAdd = 60;
  }
  usersToAddFriends.forEach((userToAddFriends) => {
    const friends: Friend[] = [];
    const friendsCount = Math.max(Math.floor(Math.random() * friendsToAdd), 10);
    for (let i = 0; i < friendsCount; i++) {
      const userToBefriend =
        usersToAddFriends[Math.floor(Math.random() * usersToAddFriends.length)];
      if (userToBefriend.profileId === userToAddFriends.profileId) {
        continue;
      }
      if (
        userToAddFriends.friends.some(
          (friend) => friend.friendInfo.profileId === friend.friendInfo.profileId,
        )
      ) {
        continue;
      }
      const friend: Friend = {
        connectionId: fakerTyped.datatype.uuid(),
        status: Math.random() < 0.8 ? 'accepted' : Math.random() > 0.1 ? 'pending' : 'blocked',
        createdAt: fakerTyped.date.past(),
        currentUserId: userToAddFriends.profileId,
        chat: {
          id: fakerTyped.datatype.uuid(),
          messages: [],
          receiver: userToBefriend.profileId,
          sender: userToAddFriends.profileId,
        },
        friendInfo: {
          profileId: userToBefriend.profileId,
          firstName: userToBefriend.firstName,
          middleName: userToBefriend.middleName,
          lastName: userToBefriend.lastName,
          profilePicture: userToBefriend.profilePicture,
        },
      };
      friends.push(friend);
    }
    userToAddFriends.friends = friends;
  });
  return usersToAddFriends;
}

export async function generateUsersAndPostToDb(usersAmount: number, friendsAmount: number) {
  const users = generateUsers(usersAmount);
  const usersWithFriends = getRandomFriends(users, friendsAmount);
  const batch = writeBatch(db);
  usersWithFriends.forEach((user) => {
    const docRef = doc(db, 'users', user.profileId);
    batch.set(docRef, user);
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
