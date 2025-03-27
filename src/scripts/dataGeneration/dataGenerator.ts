import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

// Import existing interfaces from the codebase
import { IChat } from '@/types/chat';
import { IComment, ICommentMap } from '@/types/comment';
import { IFriendsMap, IPublicFriendsMap, TFriendStatus } from '@/types/firend';
import { IMessage } from '@/types/message';
import { IPictureWithPlaceholders } from '@/types/picture';
import { IPost } from '@/types/post';
import { IReactionsMap, TReactionType } from '@/types/reaction';
import { ITimestamp } from '@/types/timestamp';
import {
  IContactInfo,
  IUser,
  IUserBasicInfo,
  IUserCustomAbout,
  IUserStringAbout,
  TKinship,
  TRealationshipStatus,
  TUserSex,
} from '@/types/user';
import { generateImages } from './imageGenerator';

export interface IAlgoliaSearchObject {
  objectID: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  pictureUrl?: string;
}

export interface IUserMetadata {
  popularityTier: 'low' | 'medium' | 'high';
  activityLevel: 'inactive' | 'low' | 'medium' | 'high';
}

export interface IGenerationOptions {
  userCount: number;
  maxFriendsPerUser: number;
  maxPostsPerUser: number;
  maxCommentsPerPost: number;
  maxReactionsPerPost: number;
  maxChatsPerUser: number;
  maxMessagesPerChat: number;
}

export interface IGeneratedUser extends IUser {
  popularityTier: 'low' | 'medium' | 'high';
  activityLevel: 'inactive' | 'low' | 'medium' | 'high';
}

export interface IGeneratedChat extends IChat {}

export interface IGeneratedMessage extends IMessage {
  chatId: string;
  reactions: IReactionsMap;
}

export interface IGeneratedPost extends IPost {
  privacy?: 'public' | 'friends' | 'private';
}

export interface IGeneratedComment extends IComment {}

export interface IGeneratedData {
  users: IGeneratedUser[];
  chats: IGeneratedChat[];
  posts: IGeneratedPost[];
  algoliaSearchObjects: IAlgoliaSearchObject[];
  firebase: {
    users: Record<string, IGeneratedUser>;
    chats: Record<string, IGeneratedChat>;
    posts: Record<string, IGeneratedPost>;
    usersPublicData: {
      usersBasicInfo: Record<string, IUserBasicInfo>;
      usersPublicFriends: Record<string, IPublicFriendsMap>;
    };
  };
}

// Helper function to convert milliseconds to ITimestamp
function msToTimestamp(ms: number): ITimestamp {
  return {
    seconds: Math.floor(ms / 1000),
    nanoseconds: (ms % 1000) * 1000000,
  };
}

// Helper function to convert from Date to ITimestamp
function dateToTimestamp(date: Date): ITimestamp {
  return msToTimestamp(date.getTime());
}

// Helper functions
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomSubset<T>(array: T[], maxCount: number): T[] {
  if (maxCount <= 0) return [];
  const count = Math.floor(Math.random() * maxCount) + 1;
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, array.length));
}

function shouldFill(probability: number): boolean {
  return Math.random() < probability;
}

function getChatId(userId1: string, userId2: string): string {
  return [userId1, userId2].sort().join('_');
}

function getRandomEmoji(): string {
  const emojis = ['😀', '😊', '🥰', '😎', '🔥', '💯', '👍', '❤️', '💙', '💚', '💜', '🧡', '💛'];
  return getRandomElement(emojis);
}

function getRandomColor(): string {
  const colors = [
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#FF33A8',
    '#33A8FF',
    '#A833FF',
    '#FF8333',
    '#33FFC4',
  ];
  return getRandomElement(colors);
}

// User metadata generation functions
function assignUserPopularityTier(): 'low' | 'medium' | 'high' {
  const random = Math.random();
  if (random < 0.6) return 'low';
  if (random < 0.9) return 'medium';
  return 'high';
}

function assignUserActivityLevel(): 'inactive' | 'low' | 'medium' | 'high' {
  const random = Math.random();
  if (random < 0.2) return 'inactive';
  if (random < 0.5) return 'low';
  if (random < 0.8) return 'medium';
  return 'high';
}

// Update user generation code
async function generateUser(userId: string, gender: 'male' | 'female'): Promise<IGeneratedUser> {
  const firstName = faker.person.firstName(gender as any);
  const lastName = faker.person.lastName();
  const middleName = shouldFill(0.3) ? faker.person.middleName() : undefined;

  // Generate profile picture
  const [profilePicture] = await generateImages({
    type: 'profile',
    gender,
    count: 1,
  });

  // Generate background picture (optional)
  const backgroundPicture = shouldFill(0.5)
    ? (await generateImages({ type: 'background', count: 1 }))[0]
    : undefined;

  const backgroundPictureId = backgroundPicture ? uuidv4() : undefined;
  const profilePictureId = uuidv4();
  const isDummy = false;
  const groups = {};
  const friends: IFriendsMap = {};
  const contact: IContactInfo = {
    email: faker.internet.email({ firstName, lastName }),
    phoneNumber: faker.phone.number(),
  };

  const birthDate = shouldFill(0.7)
    ? dateToTimestamp(faker.date.birthdate({ min: 18, max: 65, mode: 'age' }))
    : undefined;

  const about: IUserStringAbout & IUserCustomAbout = {
    bio: shouldFill(0.7) ? faker.lorem.paragraph() : undefined,
    hometown: shouldFill(0.5) ? faker.location.city() : undefined,
    city: shouldFill(0.5) ? faker.location.city() : undefined,
    workplace: shouldFill(0.5) ? faker.company.name() : undefined,
    jobTitle: shouldFill(0.3) ? faker.person.jobTitle() : undefined,
    sex: gender as TUserSex,
    intrests: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => faker.word.sample()),
    relationship: shouldFill(0.5)
      ? {
          status: getRandomElement([
            'single',
            "it's complicated",
            'engaged',
            'married',
            'in relation',
          ] as TRealationshipStatus[]),
          partnerId: undefined, // Will be set later if needed
        }
      : undefined,
    birthDate,
    relatives: {},
  };

  return {
    id: userId,
    firstName,
    lastName,
    middleName,
    pictureUrl: profilePicture.url,
    backgroundPicture: backgroundPicture?.url,
    backgroundPictureId,
    profilePictureId,
    isDummy,
    groups,
    friends,
    contact,
    about,
    popularityTier: assignUserPopularityTier(),
    activityLevel: assignUserActivityLevel(),
  };
}

// Handle user relationships
function handleUserRelationships(users: IGeneratedUser[]): void {
  for (const user of users) {
    // Partnership (based on popularity)
    if (shouldFill(0.5)) {
      const partnerStatusOptions: TRealationshipStatus[] = [
        'single',
        "it's complicated",
        'engaged',
        'married',
        'in relation',
      ];
      const status = getRandomElement(partnerStatusOptions);

      user.about.relationship = { status };

      // Assign partner if not single
      if (status !== 'single') {
        const potentialPartners = users.filter(
          (p) =>
            p.id !== user.id && (!p.about.relationship || p.about.relationship.status === 'single'),
        );

        if (potentialPartners.length > 0) {
          const partner = getRandomElement(potentialPartners);
          if (user.about.relationship) {
            user.about.relationship.partnerId = partner.id;
          }

          // Update partner's status too
          partner.about.relationship = {
            status: user.about.relationship?.status || 'single',
            partnerId: user.id,
          };
        }
      }
    }

    // Add relatives
    if (shouldFill(0.3)) {
      const potentialRelatives = users.filter((p) => p.id !== user.id);
      const relativeCount = Math.floor(Math.random() * 3) + 1;
      const relatives = getRandomSubset(potentialRelatives, relativeCount);

      const relationTypes: TKinship[] = ['parent', 'child', 'sibling', 'cousin'];

      for (const relative of relatives) {
        const relation = getRandomElement(relationTypes);
        user.about.relatives[relative.id] = relation;

        // Add reciprocal relationship
        let reciprocalRelation: TKinship;

        if (relation === 'parent') {
          reciprocalRelation = 'child';
        } else if (relation === 'child') {
          reciprocalRelation = 'parent';
        } else {
          // sibling and cousin remain the same
          reciprocalRelation = relation;
        }

        relative.about.relatives[user.id] = reciprocalRelation;
      }
    }
  }
}

// Handle friendships
function handleFriendships(users: IGeneratedUser[], maxFriendsPerUser: number): void {
  for (const user of users) {
    const { popularityTier, activityLevel } = user;

    // Determine friend count based on popularity and activity
    let maxFriends = maxFriendsPerUser;
    if (popularityTier === 'high') {
      maxFriends =
        Math.floor(maxFriendsPerUser * 0.8) + Math.floor(Math.random() * (maxFriendsPerUser * 0.2));
    } else if (popularityTier === 'medium') {
      maxFriends =
        Math.floor(maxFriendsPerUser * 0.4) + Math.floor(Math.random() * (maxFriendsPerUser * 0.4));
    } else {
      maxFriends = Math.floor(Math.random() * (maxFriendsPerUser * 0.4));
    }

    // Further adjust based on activity level
    if (activityLevel === 'inactive') maxFriends = Math.floor(maxFriends * 0.3);
    else if (activityLevel === 'low') maxFriends = Math.floor(maxFriends * 0.6);
    else if (activityLevel === 'medium') maxFriends = Math.floor(maxFriends * 0.8);

    // Find potential friends
    const potentialFriends = users.filter((p) => p.id !== user.id && !(p.id in user.friends));

    if (!potentialFriends.length) continue;

    // Create random number of friends up to maxFriends
    const friendCount = Math.floor(Math.random() * maxFriends) + 1;
    const selectedFriends = getRandomSubset(potentialFriends, friendCount);

    for (const friend of selectedFriends) {
      // Skip if already friends
      if (friend.id in user.friends) continue;

      // Determine friendship status
      let status: TFriendStatus;
      const acceptanceRate =
        popularityTier === 'high' ? 0.9 : popularityTier === 'medium' ? 0.7 : 0.5;

      if (Math.random() < acceptanceRate) {
        status = 'accepted';
      } else {
        status = Math.random() > 0.5 ? 'req_sent' : 'req_received';
      }

      // Create chat ID for accepted friends
      let chatId = '';
      let acceptedAt: ITimestamp | undefined;

      if (status === 'accepted') {
        chatId = getChatId(user.id, friend.id);
        // Create timestamp from 1-12 months ago
        const monthsAgo = Math.floor(Math.random() * 12) + 1;
        const acceptedAtDate = new Date();
        acceptedAtDate.setMonth(acceptedAtDate.getMonth() - monthsAgo);
        acceptedAt = dateToTimestamp(acceptedAtDate);
      }

      // Add friendship to user
      user.friends[friend.id] = {
        id: friend.id,
        chatId,
        status,
        acceptedAt: acceptedAt || msToTimestamp(0), // Default to epoch if not accepted
      };

      // Add reciprocal friendship to friend if not already friends
      if (!(user.id in friend.friends)) {
        let reciprocalStatus: TFriendStatus;

        if (status === 'accepted') {
          reciprocalStatus = 'accepted';
        } else if (status === 'req_sent') {
          reciprocalStatus = 'req_received';
        } else {
          reciprocalStatus = 'req_sent';
        }

        friend.friends[user.id] = {
          id: user.id,
          chatId,
          status: reciprocalStatus,
          acceptedAt: acceptedAt || msToTimestamp(0),
        };
      }
    }
  }
}

export async function generateDummyData(options: IGenerationOptions): Promise<IGeneratedData> {
  const {
    userCount,
    maxFriendsPerUser,
    maxPostsPerUser,
    maxCommentsPerPost,
    maxReactionsPerPost,
    maxChatsPerUser,
    maxMessagesPerChat,
  } = options;

  // Data containers
  const users: IGeneratedUser[] = [];
  const chats: IGeneratedChat[] = [];
  const posts: IGeneratedPost[] = [];
  const algoliaSearchObjects: IAlgoliaSearchObject[] = [];

  // 1. Generate users with metadata
  console.log('Generating users...');
  for (let i = 0; i < userCount; i++) {
    const userId = uuidv4();
    const gender = Math.random() > 0.5 ? 'male' : 'female';
    const generatedUser = await generateUser(userId, gender);
    users.push(generatedUser);

    // Create Algolia search object
    algoliaSearchObjects.push({
      objectID: userId,
      firstName: generatedUser.firstName,
      lastName: generatedUser.lastName,
      middleName: generatedUser.middleName,
      ...(generatedUser.pictureUrl ? { pictureUrl: generatedUser.pictureUrl } : {}),
    });
  }

  // Handle user relationships
  handleUserRelationships(users);

  // Handle friendships
  handleFriendships(users, maxFriendsPerUser);

  // 2. Generate chats
  console.log('Generating chats...');
  const chatIds = new Set<string>();

  // Find all unique chat IDs from friendships
  for (const user of users) {
    for (const friendId in user.friends) {
      const friend = user.friends[friendId];
      if (friend.status === 'accepted' && friend.chatId) {
        chatIds.add(friend.chatId);
      }
    }
  }

  // Create chat objects - convert Set to Array for iteration
  for (const chatId of Array.from(chatIds)) {
    const [userId1, userId2] = chatId.split('_');

    // Create chat
    const chat: IGeneratedChat = {
      id: chatId,
      users: [userId1, userId2],
      messages: [],
      chatEmoji: Math.random() > 0.7 ? getRandomEmoji() : undefined,
      chatColor: Math.random() > 0.7 ? getRandomColor() : undefined,
    };

    // Generate messages
    const messageCount = Math.floor(Math.random() * maxMessagesPerChat) + 1;
    const chatCreatedAt = new Date();
    chatCreatedAt.setMonth(chatCreatedAt.getMonth() - Math.floor(Math.random() * 12));

    for (let i = 0; i < messageCount; i++) {
      const messageDate = new Date(chatCreatedAt);
      messageDate.setMinutes(messageDate.getMinutes() + i * Math.floor(Math.random() * 60));

      const message: IMessage = {
        id: uuidv4(),
        senderId: Math.random() > 0.5 ? userId1 : userId2,
        text: faker.lorem.sentences(Math.floor(Math.random() * 3) + 1),
        createdAt: dateToTimestamp(messageDate),
        pictures: Math.random() > 0.8 ? [] : undefined, // Usually no pictures
      };

      chat.messages.push(message);
    }

    chats.push(chat);
  }

  // 4. Generate posts
  console.log('Generating posts...');
  for (const user of users) {
    const { popularityTier, activityLevel } = user;

    // Adjust post count based on activity level
    let userPostCount = 0;

    if (activityLevel === 'inactive') {
      userPostCount = Math.floor(Math.random() * 2); // 0-1 posts
    } else if (activityLevel === 'low') {
      userPostCount = Math.floor(Math.random() * 3) + 1; // 1-3 posts
    } else if (activityLevel === 'medium') {
      userPostCount = Math.floor(Math.random() * 5) + 3; // 3-7 posts
    } else {
      // high
      userPostCount = Math.floor(Math.random() * 8) + 5; // 5-12 posts
    }

    // Create posts
    for (let i = 0; i < userPostCount; i++) {
      // Create a post date sometime in the last year
      const creationDate = new Date();
      creationDate.setDate(creationDate.getDate() - Math.floor(Math.random() * 365));
      const creationTimestamp = dateToTimestamp(creationDate);

      // Sometimes posts are updated
      const updateDate = new Date(creationDate);
      if (Math.random() > 0.8) {
        updateDate.setDate(updateDate.getDate() + Math.floor(Math.random() * 7)); // Update within a week
      }
      const updateTimestamp = dateToTimestamp(updateDate);

      const hasPictures = Math.random() > 0.5;
      const hasText = Math.random() > 0.2 || !hasPictures;

      // Determine post privacy based on user popularity
      let privacy: 'public' | 'friends' | 'private';
      if (popularityTier === 'high') {
        privacy = Math.random() > 0.7 ? 'public' : 'friends';
      } else if (popularityTier === 'medium') {
        privacy = Math.random() > 0.5 ? 'public' : Math.random() > 0.7 ? 'private' : 'friends';
      } else {
        privacy = Math.random() > 0.3 ? 'friends' : Math.random() > 0.5 ? 'private' : 'public';
      }

      // Generate share count based on popularity
      let shareCount = 0;
      if (privacy === 'public') {
        if (popularityTier === 'high') {
          shareCount = Math.floor(Math.random() * 50);
        } else if (popularityTier === 'medium') {
          shareCount = Math.floor(Math.random() * 10);
        } else {
          shareCount = Math.floor(Math.random() * 3);
        }
      }

      // Generate pictures with placeholders if needed
      const pictures: IPictureWithPlaceholders[] = hasPictures
        ? await generateImages({
            type: 'post',
            count: Math.floor(Math.random() * 3) + 1,
          }).then((images) =>
            images.map((img) => ({
              url: img.url,
              blurDataUrl: img.blurDataUrl,
              dominantHex: img.dominantHex,
            })),
          )
        : [];

      const post: IGeneratedPost = {
        id: uuidv4(),
        ownerId: user.id,
        wallOwnerId: user.id,
        text: hasText ? faker.lorem.paragraphs(Math.floor(Math.random() * 3) + 1) : undefined,
        pictures: hasPictures ? pictures : undefined,
        createdAt: creationTimestamp,
        shareCount,
        elementType: 'post',
        comments: {},
        reactions: {},
        privacy,
      };

      posts.push(post);

      // Generate comments
      const commentCount = Math.floor(Math.random() * maxCommentsPerPost) + 1;
      const commenters = getRandomSubset(
        users.filter((u) => u.id !== user.id),
        commentCount,
      );

      // Comments map for this post
      const comments: ICommentMap = {};

      for (let j = 0; j < commenters.length; j++) {
        const commenter = commenters[j];

        // Comment creation date between post creation and now
        const commentDate = new Date(creationDate);
        commentDate.setHours(commentDate.getHours() + Math.floor(Math.random() * 72)); // Within 3 days
        const commentTimestamp = dateToTimestamp(commentDate);

        const commentId = uuidv4();
        const comment: IComment = {
          id: commentId,
          ownerId: commenter.id,
          commentText: faker.lorem.sentences(Math.floor(Math.random() * 2) + 1),
          createdAt: commentTimestamp,
          responses: {},
          reactions: {},
        };

        comments[commentId] = comment;

        // Generate reactions for comments
        if (Math.random() > 0.6) {
          const reactionsCount = Math.floor(Math.random() * 5) + 1;
          const reactors = getRandomSubset(
            users.filter((u) => u.id !== commenter.id),
            reactionsCount,
          );

          const reactions: IReactionsMap = {};
          for (const reactor of reactors) {
            const reactionType = getRandomElement([
              'like',
              'love',
              'care',
              'haha',
              'wow',
              'sad',
              'angry',
            ] as TReactionType[]);

            reactions[reactor.id] = reactionType;
          }

          comment.reactions = reactions;
        }
      }

      post.comments = comments;

      // Generate reactions to post
      if (Math.random() > 0.4) {
        // 60% chance for a post to have reactions
        const reactionsCount = Math.min(
          Math.floor(Math.random() * maxReactionsPerPost) +
            (post.shareCount > 0 ? post.shareCount / 2 : 0) +
            (popularityTier === 'high' ? 10 : popularityTier === 'medium' ? 5 : 2),
          users.length - 1,
        );

        const reactors = getRandomSubset(
          users.filter((u) => u.id !== user.id),
          reactionsCount,
        );

        const reactions: IReactionsMap = {};

        for (const reactor of reactors) {
          // Determine reaction type based on post content and popularity
          let reactionType: TReactionType;

          // Base probabilities
          const typeProbabilities = {
            like: 0.6,
            love: 0.2,
            care: 0.05,
            haha: 0.05,
            wow: 0.05,
            sad: 0.03,
            angry: 0.02,
          };

          // Adjust based on post content
          if (post.text && post.text.toLowerCase().includes('love')) {
            typeProbabilities.love += 0.2;
            typeProbabilities.like -= 0.1;
            typeProbabilities.care += 0.1;
          } else if (
            post.text &&
            (post.text.toLowerCase().includes('haha') ||
              post.text.toLowerCase().includes('funny') ||
              post.text.toLowerCase().includes('lol'))
          ) {
            typeProbabilities.haha += 0.3;
            typeProbabilities.like -= 0.1;
            typeProbabilities.wow += 0.1;
          } else if (
            post.text &&
            (post.text.toLowerCase().includes('sad') || post.text.toLowerCase().includes('sorry'))
          ) {
            typeProbabilities.sad += 0.3;
            typeProbabilities.care += 0.2;
            typeProbabilities.like -= 0.2;
          }

          // Choose reaction type based on adjusted probabilities
          const rand = Math.random();
          let sum = 0;
          reactionType = 'like'; // default

          for (const [type, probability] of Object.entries(typeProbabilities)) {
            sum += probability;
            if (rand < sum) {
              reactionType = type as TReactionType;
              break;
            }
          }

          reactions[reactor.id] = reactionType;
        }

        post.reactions = reactions;
      }
    }
  }

  // 6. Create Firebase data structure
  console.log('Creating Firebase data structure...');
  const firebase: {
    users: Record<string, IGeneratedUser>;
    chats: Record<string, IGeneratedChat>;
    posts: Record<string, IGeneratedPost>;
    usersPublicData: {
      usersBasicInfo: Record<string, IUserBasicInfo>;
      usersPublicFriends: Record<string, IPublicFriendsMap>;
    };
  } = {
    users: {},
    chats: {},
    posts: {},
    usersPublicData: {
      usersBasicInfo: {},
      usersPublicFriends: {},
    },
  };

  // Populate Firebase collections
  for (const user of users) {
    firebase.users[user.id] = user;

    // Add user basic info to usersPublicData collection
    firebase.usersPublicData.usersBasicInfo[user.id] = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      pictureUrl: user.pictureUrl,
    };

    // Add public friends to usersPublicData collection
    firebase.usersPublicData.usersPublicFriends[user.id] = {};

    // Add accepted friends to public friends map
    for (const friendId in user.friends) {
      const friend = user.friends[friendId];
      if (friend.status === 'accepted' && friend.acceptedAt) {
        firebase.usersPublicData.usersPublicFriends[user.id][friendId] = friend.acceptedAt;
      }
    }
  }

  // Add chats
  for (const chat of chats) {
    firebase.chats[chat.id] = chat;
  }

  // Add posts
  for (const post of posts) {
    firebase.posts[post.id] = post;
  }

  return {
    users,
    chats,
    posts,
    algoliaSearchObjects,
    firebase,
  };
}
