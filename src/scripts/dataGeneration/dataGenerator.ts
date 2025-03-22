import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  profilePicture: string;
  backgroundPicture?: string;
  bio?: string;
  birthday?: string;
  gender?: 'male' | 'female' | 'other';
  hometown?: string;
  currentCity?: string;
  workplace?: string;
  school?: string;
  interests?: string[];
  phone?: string;
  relationship?: {
    status: 'single' | 'in_relationship' | 'engaged' | 'married' | 'divorced' | 'widowed';
    partnerId?: string;
  };
  relatives?: Array<{
    userId: string;
    relation: 'parent' | 'child' | 'sibling' | 'cousin' | 'uncle_aunt' | 'niece_nephew';
  }>;
  friends?: IFriendship[];
  website?: string;
  createdAt: number;
  updatedAt: number;
}

export interface IFriendship {
  status: 'req_sent' | 'req_received' | 'accepted';
  userId: string;
  chatId: string;
}

export interface IChat {
  id: string;
  participantsIds: string[];
  lastMessageAt: number;
  lastMessage: string;
  emoji?: string;
  color?: string;
  createdAt: number;
}

export interface IMessage {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  createdAt: number;
}

export interface IPost {
  id: string;
  authorId: string;
  content?: string;
  pictureURLs?: string[];
  privacy: 'public' | 'friends' | 'private';
  createdAt: number;
  updatedAt: number;
  shareCount: number;
}

export interface IComment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  parentId?: string;
  createdAt: number;
  updatedAt: number;
}

export interface IReaction {
  id: string;
  type: 'like' | 'love' | 'care' | 'haha' | 'wow' | 'sad' | 'angry';
  userId: string;
  referenceId: string;
  referenceType: 'post' | 'comment';
  createdAt: number;
}

export interface IUserBasicInfo {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  profilePicture: string;
}

export interface IUserPublicFriend {
  userId: string;
  friendId: string;
}

export interface IAlgoliaSearchObject {
  objectID: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  profilePicture: string;
}

export interface IUserMetadata {
  popularityTier: 'low' | 'medium' | 'high';
  activityLevel: 'inactive' | 'low' | 'medium' | 'high';
}

export interface IGenerationOptions {
  userCount: number;
  maxFriendsPerUser: number;
  postsPerUser: number;
  maxCommentsPerPost: number;
  maxRepliesPerComment: number;
  maxReactionsPerPost: number;
  maxReactionsPerComment: number;
  maxMessagesPerChat: number;
}

export interface IGeneratedData {
  users: IUser[];
  chats: IChat[];
  messages: IMessage[];
  posts: IPost[];
  comments: IComment[];
  reactions: IReaction[];
  userBasicInfo: IUserBasicInfo[];
  userPublicFriends: IUserPublicFriend[];
  algoliaSearchObjects: IAlgoliaSearchObject[];
  firebase: {
    users: Record<string, IUser>;
    chats: Record<string, IChat>;
    messages: Record<string, Record<string, IMessage>>;
    posts: Record<string, IPost>;
    comments: Record<string, Record<string, IComment>>;
    reactions: Record<string, Record<string, IReaction>>;
    userBasicInfo: Record<string, IUserBasicInfo>;
    userPublicFriends: Record<string, Record<string, boolean>>;
  };
}

// Helper functions
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomSubset<T>(array: T[], maxCount: number): T[] {
  if (maxCount <= 0) return [];
  const count = Math.floor(Math.random() * maxCount) + 1;
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
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

export function generateDummyData(options: IGenerationOptions): IGeneratedData {
  const {
    userCount,
    maxFriendsPerUser,
    postsPerUser,
    maxCommentsPerPost,
    maxRepliesPerComment,
    maxReactionsPerPost,
    maxReactionsPerComment,
    maxMessagesPerChat,
  } = options;

  // Data containers
  const users: IUser[] = [];
  const userMetadata: Record<string, IUserMetadata> = {};
  const chats: IChat[] = [];
  const messages: IMessage[] = [];
  const posts: IPost[] = [];
  const comments: IComment[] = [];
  const reactions: IReaction[] = [];
  const userBasicInfo: IUserBasicInfo[] = [];
  const userPublicFriends: IUserPublicFriend[] = [];
  const algoliaSearchObjects: IAlgoliaSearchObject[] = [];

  // 1. Generate users with metadata
  console.log('Generating users...');
  for (let i = 0; i < userCount; i++) {
    const userId = uuidv4();
    const gender = Math.random() > 0.5 ? 'male' : 'female';
    const firstName = faker.person.firstName(gender as any);
    const lastName = faker.person.lastName();

    // Assign popularity and activity level
    const popularityTier = assignUserPopularityTier();
    const activityLevel = assignUserActivityLevel();
    userMetadata[userId] = { popularityTier, activityLevel };

    // Generate user with varying profile completeness based on popularity
    const user: IUser = {
      id: userId,
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }),
      profilePicture: faker.image.avatar(),
      createdAt: faker.date.past({ years: 3 }).getTime(),
      updatedAt: faker.date.recent().getTime(),
    };

    // Add optional fields based on user popularity
    if (popularityTier === 'high' || (popularityTier === 'medium' && shouldFill(0.7))) {
      user.middleName = shouldFill(0.3) ? faker.person.middleName() : undefined;
      user.backgroundPicture = shouldFill(0.8) ? faker.image.url() : undefined;
      user.bio = faker.lorem.paragraph();
      user.birthday = faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString();
      user.gender = gender as 'male' | 'female' | 'other';
      user.hometown = faker.location.city();
      user.currentCity = faker.location.city();
      user.workplace = faker.company.name();
      user.school = faker.company.name() + ' University';
      user.interests = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () =>
        faker.word.sample(),
      );
      user.phone = faker.phone.number();
      user.website = shouldFill(0.3) ? faker.internet.url() : undefined;
    } else if (popularityTier === 'medium' || (popularityTier === 'low' && shouldFill(0.5))) {
      user.bio = shouldFill(0.6) ? faker.lorem.sentences(2) : undefined;
      user.birthday = shouldFill(0.7)
        ? faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString()
        : undefined;
      user.gender = shouldFill(0.8) ? (gender as 'male' | 'female' | 'other') : undefined;
      user.currentCity = shouldFill(0.6) ? faker.location.city() : undefined;
      user.workplace = shouldFill(0.5) ? faker.company.name() : undefined;
      user.school = shouldFill(0.6) ? faker.company.name() + ' University' : undefined;
    }

    users.push(user);

    // Create user basic info and Algolia search object
    const basicInfo: IUserBasicInfo = {
      id: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      profilePicture: user.profilePicture,
    };

    userBasicInfo.push(basicInfo);

    algoliaSearchObjects.push({
      objectID: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      profilePicture: user.profilePicture,
    });
  }

  // 2. Generate relationships (partners, relatives)
  console.log('Generating relationships...');
  for (const user of users) {
    const { popularityTier } = userMetadata[user.id];

    // Partnership (based on popularity)
    if (
      (popularityTier === 'high' && shouldFill(0.7)) ||
      (popularityTier === 'medium' && shouldFill(0.5)) ||
      (popularityTier === 'low' && shouldFill(0.3))
    ) {
      const partnerStatusOptions = [
        'single',
        'in_relationship',
        'engaged',
        'married',
        'divorced',
        'widowed',
      ];
      const partnerStatusWeights =
        popularityTier === 'high'
          ? [0.1, 0.2, 0.2, 0.3, 0.1, 0.1]
          : [0.3, 0.3, 0.1, 0.2, 0.05, 0.05];

      let statusIndex = 0;
      const rand = Math.random();
      let sum = 0;

      for (let i = 0; i < partnerStatusWeights.length; i++) {
        sum += partnerStatusWeights[i];
        if (rand < sum) {
          statusIndex = i;
          break;
        }
      }

      const status = partnerStatusOptions[statusIndex] as
        | 'single'
        | 'in_relationship'
        | 'engaged'
        | 'married'
        | 'divorced'
        | 'widowed';

      user.relationship = { status };

      // Assign partner if not single/divorced/widowed
      if (['in_relationship', 'engaged', 'married'].includes(status)) {
        const potentialPartners = users.filter(
          (p) =>
            p.id !== user.id &&
            (!p.relationship ||
              !['in_relationship', 'engaged', 'married'].includes(p.relationship.status)),
        );

        if (potentialPartners.length > 0) {
          const partner = getRandomElement(potentialPartners);
          user.relationship.partnerId = partner.id;

          // Update partner's status too
          partner.relationship = {
            status: user.relationship.status,
            partnerId: user.id,
          };
        }
      }
    }

    // Add relatives (based on popularity)
    if (
      (popularityTier === 'high' && shouldFill(0.6)) ||
      (popularityTier === 'medium' && shouldFill(0.3)) ||
      (popularityTier === 'low' && shouldFill(0.1))
    ) {
      const potentialRelatives = users.filter((p) => p.id !== user.id);
      const relativeCount = Math.floor(Math.random() * 3) + 1;
      const relatives = getRandomSubset(potentialRelatives, relativeCount);

      const relationTypes = ['parent', 'child', 'sibling', 'cousin', 'uncle_aunt', 'niece_nephew'];

      user.relatives = relatives.map((relative) => ({
        userId: relative.id,
        relation: getRandomElement(relationTypes) as
          | 'parent'
          | 'child'
          | 'sibling'
          | 'cousin'
          | 'uncle_aunt'
          | 'niece_nephew',
      }));

      // Add reciprocal relationships
      for (const relative of user.relatives || []) {
        const relativeUser = users.find((u) => u.id === relative.userId);
        if (!relativeUser) continue;

        let reciprocalRelation:
          | 'parent'
          | 'child'
          | 'sibling'
          | 'cousin'
          | 'uncle_aunt'
          | 'niece_nephew';
        switch (relative.relation) {
          case 'parent':
            reciprocalRelation = 'child';
            break;
          case 'child':
            reciprocalRelation = 'parent';
            break;
          case 'sibling':
            reciprocalRelation = 'sibling';
            break;
          case 'cousin':
            reciprocalRelation = 'cousin';
            break;
          case 'uncle_aunt':
            reciprocalRelation = 'niece_nephew';
            break;
          case 'niece_nephew':
            reciprocalRelation = 'uncle_aunt';
            break;
        }

        if (!relativeUser.relatives) {
          relativeUser.relatives = [];
        }

        // Only add if not already there
        const existingRelation = relativeUser.relatives.find((r) => r.userId === user.id);
        if (!existingRelation) {
          relativeUser.relatives.push({
            userId: user.id,
            relation: reciprocalRelation,
          });
        }
      }
    }
  }

  // 3. Generate friendships and chats
  console.log('Generating friendships and chats...');
  for (const user of users) {
    const { popularityTier, activityLevel } = userMetadata[user.id];

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
    const potentialFriends = users.filter(
      (p) => p.id !== user.id && !user.friends?.find((f) => f.userId === p.id),
    );

    if (!potentialFriends.length) continue;

    // Create random number of friends up to maxFriends
    const friendCount = Math.floor(Math.random() * maxFriends) + 1;
    const selectedFriends = getRandomSubset(potentialFriends, friendCount);

    if (!user.friends) {
      user.friends = [];
    }

    for (const friend of selectedFriends) {
      // Determine friendship status
      let status: 'req_sent' | 'req_received' | 'accepted';
      const acceptanceRate =
        popularityTier === 'high' ? 0.9 : popularityTier === 'medium' ? 0.7 : 0.5;

      if (Math.random() < acceptanceRate) {
        status = 'accepted';
      } else {
        status = Math.random() > 0.5 ? 'req_sent' : 'req_received';
      }

      // Create chat for accepted friends
      let chatId = '';
      if (status === 'accepted') {
        chatId = getChatId(user.id, friend.id);

        // Create chat if it doesn't exist
        if (!chats.find((c) => c.id === chatId)) {
          const chatCreationDate = faker.date.past({ years: 1 }).getTime();
          const lastMessageDate = faker.date
            .between({
              from: chatCreationDate,
              to: Date.now(),
            })
            .getTime();

          const chat: IChat = {
            id: chatId,
            participantsIds: [user.id, friend.id],
            lastMessageAt: lastMessageDate,
            lastMessage: faker.lorem.sentence(),
            emoji: shouldFill(0.3) ? getRandomEmoji() : undefined,
            color: shouldFill(0.3) ? getRandomColor() : undefined,
            createdAt: chatCreationDate,
          };

          chats.push(chat);

          // Generate chat messages
          const messageCount = Math.floor(Math.random() * maxMessagesPerChat) + 1;

          // Create timeline of messages
          for (let i = 0; i < messageCount; i++) {
            const messageDate = faker.date
              .between({
                from: chatCreationDate,
                to: lastMessageDate,
              })
              .getTime();

            const message: IMessage = {
              id: uuidv4(),
              chatId,
              senderId: Math.random() > 0.5 ? user.id : friend.id,
              content: faker.lorem.sentences(Math.floor(Math.random() * 3) + 1),
              createdAt: messageDate,
            };

            messages.push(message);
          }
        }

        // Add to public friends for accepted friendships
        userPublicFriends.push({
          userId: user.id,
          friendId: friend.id,
        });

        userPublicFriends.push({
          userId: friend.id,
          friendId: user.id,
        });
      }

      // Add friendship to user
      user.friends.push({
        status,
        userId: friend.id,
        chatId,
      });

      // Add reciprocal friendship to friend
      if (!friend.friends) {
        friend.friends = [];
      }

      // Skip if already friends
      if (friend.friends.find((f) => f.userId === user.id)) {
        continue;
      }

      let reciprocalStatus: 'req_sent' | 'req_received' | 'accepted';
      if (status === 'accepted') {
        reciprocalStatus = 'accepted';
      } else if (status === 'req_sent') {
        reciprocalStatus = 'req_received';
      } else {
        reciprocalStatus = 'req_sent';
      }

      friend.friends.push({
        status: reciprocalStatus,
        userId: user.id,
        chatId,
      });
    }
  }

  // 4. Generate posts
  console.log('Generating posts...');
  for (const user of users) {
    const { popularityTier, activityLevel } = userMetadata[user.id];

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
      const creationDate = faker.date
        .between({
          from: user.createdAt,
          to: Date.now(),
        })
        .getTime();

      const updateDate =
        Math.random() > 0.8
          ? faker.date.between({ from: creationDate, to: Date.now() }).getTime()
          : creationDate;

      const hasPictures = Math.random() > 0.5;
      const hasContent = Math.random() > 0.2 || !hasPictures;

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

      const post: IPost = {
        id: uuidv4(),
        authorId: user.id,
        content: hasContent ? faker.lorem.paragraphs(Math.floor(Math.random() * 3) + 1) : undefined,
        pictureURLs: hasPictures
          ? Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => faker.image.url())
          : undefined,
        privacy,
        createdAt: creationDate,
        updatedAt: updateDate,
        shareCount,
      };

      posts.push(post);

      // Generate comments
      const commentCount = Math.floor(Math.random() * maxCommentsPerPost) + 1;
      const commenters = getRandomSubset(
        users.filter((u) => u.id !== user.id),
        commentCount,
      );

      for (let j = 0; j < commenters.length; j++) {
        const commenter = commenters[j];
        const commentDate = faker.date
          .between({
            from: creationDate,
            to: Date.now(),
          })
          .getTime();

        const updateCommentDate =
          Math.random() > 0.9
            ? faker.date.between({ from: commentDate, to: Date.now() }).getTime()
            : commentDate;

        const comment: IComment = {
          id: uuidv4(),
          postId: post.id,
          authorId: commenter.id,
          content: faker.lorem.sentences(Math.floor(Math.random() * 2) + 1),
          createdAt: commentDate,
          updatedAt: updateCommentDate,
        };

        comments.push(comment);

        // Generate replies to comments
        if (Math.random() > 0.7) {
          const replyCount = Math.floor(Math.random() * maxRepliesPerComment) + 1;
          const repliers = getRandomSubset(
            users.filter((u) => u.id !== commenter.id),
            replyCount,
          );

          for (const replier of repliers) {
            const replyDate = faker.date
              .between({
                from: commentDate,
                to: Date.now(),
              })
              .getTime();

            const updateReplyDate =
              Math.random() > 0.9
                ? faker.date.between({ from: replyDate, to: Date.now() }).getTime()
                : replyDate;

            const reply: IComment = {
              id: uuidv4(),
              postId: post.id,
              authorId: replier.id,
              content: faker.lorem.sentences(Math.floor(Math.random() * 2) + 1),
              parentId: comment.id,
              createdAt: replyDate,
              updatedAt: updateReplyDate,
            };

            comments.push(reply);
          }
        }
      }

      // Generate reactions to posts
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

      for (const reactor of reactors) {
        const reactionDate = faker.date
          .between({
            from: creationDate,
            to: Date.now(),
          })
          .getTime();

        // Determine reaction type based on post content and popularity
        let reactionType: 'like' | 'love' | 'care' | 'haha' | 'wow' | 'sad' | 'angry';

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
        if (post.content && post.content.toLowerCase().includes('love')) {
          typeProbabilities.love += 0.2;
          typeProbabilities.like -= 0.1;
          typeProbabilities.care += 0.1;
        } else if (
          post.content &&
          (post.content.toLowerCase().includes('haha') ||
            post.content.toLowerCase().includes('funny') ||
            post.content.toLowerCase().includes('lol'))
        ) {
          typeProbabilities.haha += 0.3;
          typeProbabilities.like -= 0.1;
          typeProbabilities.wow += 0.1;
        } else if (
          post.content &&
          (post.content.toLowerCase().includes('sad') ||
            post.content.toLowerCase().includes('sorry'))
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
            reactionType = type as 'like' | 'love' | 'care' | 'haha' | 'wow' | 'sad' | 'angry';
            break;
          }
        }

        const reaction: IReaction = {
          id: uuidv4(),
          type: reactionType,
          userId: reactor.id,
          referenceId: post.id,
          referenceType: 'post',
          createdAt: reactionDate,
        };

        reactions.push(reaction);
      }
    }
  }

  // 5. Generate reactions to comments
  console.log('Generating comment reactions...');
  for (const comment of comments) {
    const commentAuthor = users.find((u) => u.id === comment.authorId);
    if (!commentAuthor) continue;

    const authorMetadata = userMetadata[commentAuthor.id];

    // Determine number of reactions based on author popularity
    const reactionsCount = Math.min(
      Math.floor(Math.random() * maxReactionsPerComment) +
        (authorMetadata.popularityTier === 'high'
          ? 5
          : authorMetadata.popularityTier === 'medium'
            ? 2
            : 0),
      users.length - 1,
    );

    if (reactionsCount <= 0) continue;

    const reactors = getRandomSubset(
      users.filter((u) => u.id !== commentAuthor.id),
      reactionsCount,
    );

    for (const reactor of reactors) {
      const reactionDate = faker.date
        .between({
          from: comment.createdAt,
          to: Date.now(),
        })
        .getTime();

      // Mostly likes for comments, with occasional other reactions
      const reactionType =
        Math.random() > 0.2
          ? 'like'
          : getRandomElement(['love', 'care', 'haha', 'wow', 'sad', 'angry']);

      const reaction: IReaction = {
        id: uuidv4(),
        type: reactionType as 'like' | 'love' | 'care' | 'haha' | 'wow' | 'sad' | 'angry',
        userId: reactor.id,
        referenceId: comment.id,
        referenceType: 'comment',
        createdAt: reactionDate,
      };

      reactions.push(reaction);
    }
  }

  // 6. Create Firebase data structure
  console.log('Creating Firebase data structure...');
  const firebase: {
    users: Record<string, IUser>;
    chats: Record<string, IChat>;
    messages: Record<string, Record<string, IMessage>>;
    posts: Record<string, IPost>;
    comments: Record<string, Record<string, IComment>>;
    reactions: Record<string, Record<string, IReaction>>;
    userBasicInfo: Record<string, IUserBasicInfo>;
    userPublicFriends: Record<string, Record<string, boolean>>;
  } = {
    users: {},
    chats: {},
    messages: {},
    posts: {},
    comments: {},
    reactions: {},
    userBasicInfo: {},
    userPublicFriends: {},
  };

  // Populate Firebase collections
  for (const user of users) {
    firebase.users[user.id] = user;
    firebase.userBasicInfo[user.id] = userBasicInfo.find((info) => info.id === user.id) || {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePicture: user.profilePicture,
    };

    firebase.userPublicFriends[user.id] = {};

    const userFriends = userPublicFriends.filter((f) => f.userId === user.id);
    for (const friend of userFriends) {
      firebase.userPublicFriends[user.id][friend.friendId] = true;
    }
  }

  for (const chat of chats) {
    firebase.chats[chat.id] = chat;
    firebase.messages[chat.id] = {};

    const chatMessages = messages.filter((m) => m.chatId === chat.id);
    for (const message of chatMessages) {
      firebase.messages[chat.id][message.id] = message;
    }
  }

  for (const post of posts) {
    firebase.posts[post.id] = post;
    firebase.comments[post.id] = {};

    const postComments = comments.filter((c) => c.postId === post.id);
    for (const comment of postComments) {
      firebase.comments[post.id][comment.id] = comment;
    }
  }

  for (const reaction of reactions) {
    const referenceId = reaction.referenceId;
    const referenceType = reaction.referenceType;

    if (!firebase.reactions[referenceId]) {
      firebase.reactions[referenceId] = {};
    }

    firebase.reactions[referenceId][reaction.id] = reaction;
  }

  return {
    users,
    chats,
    messages,
    posts,
    comments,
    reactions,
    userBasicInfo,
    userPublicFriends,
    algoliaSearchObjects,
    firebase,
  };
}

// Usage example
// const dummyData = generateDummyData({
//   userCount: 50,
//   maxFriendsPerUser: 20,
//   postsPerUser: 10,
//   maxCommentsPerPost: 5,
//   maxRepliesPerComment: 3,
//   maxReactionsPerPost: 15,
//   maxReactionsPerComment: 5,
//   maxMessagesPerChat: 20
// });

// console.log('Data generation complete', {
//   userCount: dummyData.users.length,
//   chatCount: dummyData.chats.length,
//   messageCount: dummyData.messages.length,
//   postCount: dummyData.posts.length,
//   commentCount: dummyData.comments.length,
//   reactionCount: dummyData.reactions.length
// });

// Write data to file if needed
// import * as fs from 'fs';
// fs.writeFileSync('dummy-data.json', JSON.stringify(dummyData.firebase, null, 2));
