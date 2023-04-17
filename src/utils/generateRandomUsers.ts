// ! This is a script that generates random users and adds them to the database. Use it only for testing purposes, it's not a part of the project, just a helper script.

const { faker } = require('@faker-js/faker');
import { db } from '@/config/firebase.config';
import { Comment } from '@/types/comment';
import { Reaction } from '@/types/reaction';
import { User } from '@/types/user';
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
	const usersUIDS = [] as string[];
	for (let i = 0; i < usersCount; i++) {
		usersUIDS.push(faker.datatype.uuid());
	}

	function getRandomPicture() {
		return randomPicutresSources[Math.floor(Math.random() * randomPicutresSources.length)]();
	}

	async function getRandomComents(amount: number, reactionsCount: number) {
		const comments: Array<Comment> = [];
		const discutants = usersUIDS.slice(
			0,
			Math.min(Math.floor((Math.random() * usersUIDS.length) / 8), 3),
		);
		for (let i = 0; i < Math.ceil(Math.random() * amount) + 2; i++) {
			comments.push({
				userID: discutants[Math.floor(Math.random() * discutants.length) || 0],
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
				userID: usersUIDS[Math.floor(Math.random() * usersUIDS.length)],
			});
		}
		return reactions;
	}

	function getRandomPhotos(amount: number) {
		const photos = [] as any;
		for (let i = 0; i < Math.ceil(Math.random() * amount) + 4; i++) {
			const photo = {
				url: getRandomPicture(),
				reactions: getRandomReactions(160),
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
				reactions: getRandomReactions(140),
			};
			posts.push(post);
		}
		return posts;
	}

	function getRandomUsers() {
		const users: Array<User> = [];
		for (let i = 0; i < usersCount; i++) {
			const uuid = faker.datatype.uuid();
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
				messages: [],
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
				dummy: true,
			};
			users.push(user);
		}
		return users;
	}
	return getRandomUsers();
};

export async function addUsersToDB(amount: number) {
	const users = generateUsers(amount);
	users.forEach((user: any) => {
		setDoc(doc(db, 'users', user.id), user);
	});
}
