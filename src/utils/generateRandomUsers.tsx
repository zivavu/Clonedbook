const { faker } = require('@faker-js/faker');
import { db } from '@/config/firebase.config';
import * as from from '@faker-js/faker';
import { doc, setDoc } from 'firebase/firestore';
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

function getRandomPicture() {
	return randomPicutresSources[Math.floor(Math.random() * randomPicutresSources.length)]();
}

function getRandomComents(amount: number, reactions: number) {
	const comments = [] as any;
	for (let i = 0; i < Math.ceil(Math.random() * amount) + 2; i++) {
		comments.push({
			userID: Math.floor(Math.random() * 100),
			commentText: fakerTyped.lorem.sentences(Math.floor(Math.random() * 5) + 1, '\n'),
			commentResponses: [],
			reactions: getRandomReactions(reactions),
		});
	}
	return comments;
}

function getRandomReactions(amount: number) {
	const reactions = {
		likes: Math.ceil(Math.random() * amount),
		love: Math.ceil(Math.random() * amount),
		haha: Math.ceil(Math.random() * amount),
		wow: Math.ceil(Math.random() * amount),
		sad: Math.ceil(Math.random() * amount),
		angry: Math.ceil(Math.random() * amount),
	};
	return reactions;
}

function getRandomPhotos(amount: number) {
	const photos = [] as any;
	for (let i = 0; i < Math.ceil(Math.random() * amount) + 4; i++) {
		const photo = {
			url: getRandomPicture(),
			reactions: getRandomReactions(60),
			comments: getRandomComents(10, 7),
		};
		photos.push(photo);
	}
	return photos;
}
function getRandomPosts(amount: number, userID: number) {
	const posts = [] as any;
	for (let i = 0; i < Math.ceil(Math.random() * amount) + 4; i++) {
		const postPictures = [] as any;
		const hasPictures = Math.random() > 0.4;
		for (let i = 0; i < Math.ceil(Math.random() * 5); i++) {
			postPictures.push(getRandomPicture());
		}
		const post = {
			ownerId: userID,
			postText: fakerTyped.lorem.sentences(Math.floor(Math.random() * 3) + 1, '\n'),
			postPictures: hasPictures ? postPictures : [],
			comments: getRandomComents(14, 8),
			reactions: getRandomReactions(30),
		};
		posts.push(post);
	}
	return posts;
}

export const generateUsers = (usersCount: number) => {
	const users = [] as any;

	for (let i = 0; i < usersCount; i++) {
		const uuid = faker.datatype.uuid();
		const user = {
			id: uuid,
			name: fakerTyped.name.fullName(),
			profilePicture: fakerTyped.image.avatar(),
			backgroundPicture: fakerTyped.image.nature(),
			email: fakerTyped.internet.email(),
			phone: fakerTyped.phone.number(),
			biography: fakerTyped.lorem.paragraph(),
			photos: getRandomPhotos(15),
			posts: getRandomPosts(10, uuid),
			messages: [],
			friends: [],
			groups: [],
			intrests: [],
			liked: [],
			about: {
				city: fakerTyped.address.city(),
				address: fakerTyped.address.streetAddress(),
				hometown: fakerTyped.address.city(),
				workplace: fakerTyped.company.name(),
				highSchool: fakerTyped.lorem.sentence(),
				college: fakerTyped.lorem.sentence(),
				relationship: '',
			},
			dummy: true,
		};
		users.push(user);
	}
	return users;
};

export async function addUsersToDB(amount: number) {
	const users = generateUsers(amount) as any;
	users.forEach((user: any) => {
		setDoc(doc(db, 'users', user.id), user);
	});
}
