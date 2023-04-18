//! This is a script that generates random users and adds them to the database. Use it only for testing purposes, it's not a part of the project, just a helper.

import { firestore } from '@/config/firebase.config';
import { Comment } from '@/types/comment';
import { Post } from '@/types/post';
import { Reaction } from '@/types/reaction';
import { User } from '@/types/user';
const { faker } = require('@faker-js/faker');

import * as from from '@faker-js/faker';
import { doc, setDoc } from 'firebase/firestore';

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
  if (usersCount > 100) {
    usersCount = 100;
  }
  if (usersCount < 10) {
    usersCount = 10;
  }
  const usersUIDS = [] as string[];
  for (let i = 0; i < usersCount; i++) {
    usersUIDS.push(fakerTyped.datatype.uuid());
  }

  function getRandomPhotoUrl() {
    return randomPicutresSources[Math.floor(Math.random() * randomPicutresSources.length)]();
  }

  function getRandomComents(amount: number, reactionsCount: number) {
    const comments: Array<Comment> = [];
    const discutants = usersUIDS.slice(
      0,
      Math.max(Math.floor((Math.random() * usersUIDS.length) / 8), 5),
    );
    for (let i = 0; i < Math.ceil(Math.random() * amount) + 2; i++) {
      comments.push({
        userId: discutants[Math.floor(Math.random() * discutants.length) || 0],
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
      reactions.push({
        reaction: fakerTyped.helpers.arrayElement(possibleReactions),
        userId: usersUIDS[Math.floor(Math.random() * usersUIDS.length)],
      });
    }
    return reactions;
  }

  function getRandomPhotos(amount: number) {
    const photos = [] as any;
    for (let i = 0; i < Math.ceil(Math.random() * amount) + 4; i++) {
      const photo = {
        url: getRandomPhotoUrl(),
        reactions: getRandomReactions(160),
        comments: getRandomComents(10, 7),
      };
      photos.push(photo);
    }
    return photos;
  }
  function getRandomPosts(amount: number, userId: string) {
    const posts: Array<Post> = [];
    for (let i = 0; i < Math.ceil(Math.random() * amount) + 4; i++) {
      const postPictures = [] as any;
      const hasPictures = Math.random() > 0.4;
      for (let i = 0; i < Math.ceil(Math.random() * 5); i++) {
        postPictures.push(getRandomPhotoUrl());
      }
      const post = {
        id: fakerTyped.datatype.uuid(),
        ownerId: userId,
        postText: fakerTyped.lorem.sentences(Math.floor(Math.random() * 3) + 1, '\n'),
        postPictures: hasPictures ? postPictures : [],
        comments: getRandomComents(14, 8),
        reactions: getRandomReactions(140),
      };
      posts.push(post);
    }
    return posts;
  }

  function getRandomUsers() {
    const users: Array<User> = [];
    for (let i = 0; i < usersCount; i++) {
      const uuid = fakerTyped.datatype.uuid();
      const user: User = {
        id: usersUIDS[i],
        firstName: fakerTyped.name.firstName(),
        middleName: Math.random() > 0.9 ? fakerTyped.name.middleName() : '',
        lastName: fakerTyped.name.lastName(),
        profilePicture: fakerTyped.image.avatar(),
        backgroundPicture: fakerTyped.image.nature(),
        email: fakerTyped.internet.email(),
        phoneNumber: fakerTyped.phone.number(),
        biography: fakerTyped.lorem.paragraph(),
        pictures: getRandomPhotos(15),
        posts: getRandomPosts(10, uuid),
        chats: [],
        friends: [],
        groups: [],
        intrests: [],
        liked: [],
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

export async function generateUsersAndPostToDb(amount: number) {
  const users = generateUsers(amount);
  users.forEach((user) => {
    console.log(user, 'user');
    setDoc(doc(firestore, 'users', user.id), user);
  });
}
