import { describe, expect, test } from 'bun:test';
import {
  generateDummyData,
  IComment,
  IFriendship,
  IPost,
  IReaction,
  IUser,
} from '../scripts/dataGeneration/dataGenerator';

const mockOptions = {
  userCount: 20,
  maxFriendsPerUser: 10,
  postsPerUser: 5,
  maxCommentsPerPost: 3,
  maxRepliesPerComment: 2,
  maxReactionsPerPost: 8,
  maxReactionsPerComment: 3,
  maxMessagesPerChat: 10,
};

// Type definitions for enhanced objects with nested data
interface IEnhancedUser extends IUser {
  about?: {
    bio?: string;
    birthDate?: {
      seconds: number;
      nanoseconds: number;
    };
  };
}

interface IEnhancedComment extends IComment {
  reactions: Record<string, IReaction>;
}

interface IEnhancedPost extends IPost {
  comments: Record<string, IEnhancedComment>;
  reactions: Record<string, IReaction>;
}

interface IEnhancedChat {
  id: string;
  participantsIds: string[];
  lastMessageAt: number;
  lastMessage: string;
  emoji?: string;
  color?: string;
  createdAt: number;
  messages: Record<string, IReaction>;
}

// Generate data once to be used in all tests
const data = generateDummyData(mockOptions);

describe('Data Generation Tests', () => {
  test('Users - Basic Validation', () => {
    const users = Object.values(data.firebase.users) as IEnhancedUser[];

    // Check correct number of users
    expect(users.length).toBe(mockOptions.userCount);

    // Check user UUIDs
    for (const user of users) {
      expect(user.id).toBeDefined();
      expect(user.id.split('-').length).toBe(5);
    }

    // Check required fields
    for (const user of users) {
      expect(user.firstName).toBeDefined();
      expect(user.lastName).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.profilePicture).toBeDefined();
      expect(user.createdAt).toBeDefined();
      expect(user.updatedAt).toBeDefined();
    }
  });

  test('Users - Optional Fields', () => {
    const users = Object.values(data.firebase.users) as IEnhancedUser[];

    const usersWithBio = users.filter((user) => user.bio || (user.about && user.about.bio));
    const usersWithMiddleName = users.filter((user) => user.middleName);
    const usersWithBirthday = users.filter(
      (user) => user.birthday || (user.about && user.about.birthDate),
    );

    expect(usersWithBio.length).toBeGreaterThan(0);
    expect(usersWithMiddleName.length).toBeGreaterThan(0);
    expect(usersWithBirthday.length).toBeGreaterThan(0);
  });

  test('Users - Contact Information', () => {
    const users = Object.values(data.firebase.users);

    for (const user of users) {
      if (user.email) {
        expect(user.email).toContain('@');
        expect(user.email).toContain('.');
      }

      if (user.phone) {
        expect(typeof user.phone).toBe('string');
        expect(user.phone.length).toBeGreaterThan(0);
      }
    }
  });

  test('Friendship Relations - Bidirectional', () => {
    const users = Object.values(data.firebase.users);

    for (const user of users) {
      if (!user.friends) continue;

      const acceptedFriends = user.friends.filter((f: IFriendship) => f.status === 'accepted');
      for (const friendship of acceptedFriends) {
        const friend = users.find((u) => u.id === friendship.userId);
        expect(friend).toBeDefined();

        if (friend && friend.friends) {
          const reciprocalFriendship = friend.friends.find(
            (f: IFriendship) => f.userId === user.id && f.status === 'accepted',
          );
          expect(reciprocalFriendship).toBeDefined();
        }
      }
    }
  });

  test('Friendship Relations - Valid Status', () => {
    const users = Object.values(data.firebase.users);

    for (const user of users) {
      if (!user.friends) continue;

      for (const friendship of user.friends) {
        expect(['req_sent', 'req_received', 'accepted'].includes(friendship.status)).toBe(true);

        if (friendship.status === 'req_sent') {
          const friend = users.find((u) => u.id === friendship.userId);
          if (friend && friend.friends) {
            const reciprocalFriendship = friend.friends.find(
              (f: IFriendship) => f.userId === user.id,
            );
            if (reciprocalFriendship) {
              expect(reciprocalFriendship.status).toBe('req_received');
            }
          }
        }
      }
    }
  });

  test('Friendship Relations - Chat IDs', () => {
    const users = Object.values(data.firebase.users);
    const chats = Object.values(data.firebase.chats);

    for (const user of users) {
      if (!user.friends) continue;

      const acceptedFriends = user.friends.filter((f: IFriendship) => f.status === 'accepted');
      for (const friendship of acceptedFriends) {
        expect(friendship.chatId).toBeDefined();
        expect(friendship.chatId.length).toBeGreaterThan(0);

        const expectedChatId = [user.id, friendship.userId].sort().join('_');
        expect(friendship.chatId).toBe(expectedChatId);

        const chat = chats.find((c) => c.id === friendship.chatId);
        expect(chat).toBeDefined();
      }
    }
  });

  test('Chats - Basic Validation', () => {
    const users = Object.values(data.firebase.users);
    const chats = Object.values(data.firebase.chats);

    for (const chat of chats) {
      const [userId1, userId2] = chat.id.split('_');
      expect(chat.participantsIds.includes(userId1)).toBe(true);
      expect(chat.participantsIds.includes(userId2)).toBe(true);
      expect(chat.participantsIds.length).toBe(2);
    }

    const customizedChats = chats.filter((chat) => chat.emoji || chat.color);
    expect(customizedChats.length).toBeGreaterThan(0);

    for (const chat of chats) {
      for (const participantId of chat.participantsIds) {
        const user = users.find((u) => u.id === participantId);
        expect(user).toBeDefined();
      }
    }
  });

  test('Posts and Comments', () => {
    const users = Object.values(data.firebase.users);
    const posts = Object.values(data.firebase.posts) as IEnhancedPost[];

    // Posts
    for (const post of posts) {
      const author = users.find((u) => u.id === post.authorId);
      expect(author).toBeDefined();

      if (author) {
        expect(post.createdAt).toBeGreaterThanOrEqual(author.createdAt);
      }

      expect(post.content || post.pictureURLs).toBeDefined();
    }

    // Comments
    for (const post of posts) {
      if (!post.comments) continue;

      const comments = Object.values(post.comments) as IEnhancedComment[];
      for (const comment of comments) {
        const author = users.find((u) => u.id === comment.authorId);
        expect(author).toBeDefined();
      }

      // Replies
      const replies = comments.filter((comment) => comment.parentId);
      for (const reply of replies) {
        const parentComment = comments.find((c) => c.id === reply.parentId);
        expect(parentComment).toBeDefined();
        if (parentComment) {
          expect(parentComment.parentId).toBeUndefined();
        }
      }
    }
  });

  test('Reactions', () => {
    const users = Object.values(data.firebase.users);
    const posts = Object.values(data.firebase.posts) as IEnhancedPost[];

    // Check post reactions
    for (const post of posts) {
      if (!post.reactions) continue;

      const reactions = Object.values(post.reactions);
      for (const reaction of reactions) {
        const user = users.find((u) => u.id === reaction.userId);
        expect(user).toBeDefined();

        const validTypes = ['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry'];
        expect(validTypes.includes(reaction.type)).toBe(true);
      }
    }

    // Check comment reactions
    for (const post of posts) {
      if (!post.comments) continue;

      const comments = Object.values(post.comments) as IEnhancedComment[];
      for (const comment of comments) {
        if (!comment.reactions) continue;

        const reactions = Object.values(comment.reactions);
        for (const reaction of reactions) {
          const user = users.find((u) => u.id === reaction.userId);
          expect(user).toBeDefined();

          const validTypes = ['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry'];
          expect(validTypes.includes(reaction.type)).toBe(true);
        }
      }
    }
  });

  test('Special Collections', () => {
    const users = Object.values(data.firebase.users);
    const userBasicInfos = Object.values(data.firebase.usersPublicData.usersBasicInfo);

    // User basic info
    expect(userBasicInfos.length).toBe(users.length);
    for (const info of userBasicInfos) {
      const user = users.find((u) => u.id === info.id);
      expect(user).toBeDefined();
      if (user) {
        expect(info.firstName).toBe(user.firstName);
        expect(info.lastName).toBe(user.lastName);
        if (info.profilePicture && user.profilePicture) {
          expect(info.profilePicture).toBe(user.profilePicture);
        }
      }
    }

    // User public friends
    const userPublicFriends = data.firebase.usersPublicData.usersPublicFriends;
    for (const userId in userPublicFriends) {
      const user = users.find((u) => u.id === userId);
      expect(user).toBeDefined();

      if (user && user.friends) {
        for (const friendId in userPublicFriends[userId]) {
          const friendship = user.friends.find(
            (f: IFriendship) => f.userId === friendId && f.status === 'accepted',
          );
          expect(friendship).toBeDefined();
        }
      }
    }

    // Algolia search objects
    expect(data.algoliaSearchObjects.length).toBe(users.length);
    for (const searchObj of data.algoliaSearchObjects) {
      const user = users.find((u) => u.id === searchObj.objectID);
      expect(user).toBeDefined();
      if (user) {
        expect(searchObj.firstName).toBe(user.firstName);
        expect(searchObj.lastName).toBe(user.lastName);
      }
    }
  });

  test('Firebase Data Structure', () => {
    // Check that all users, chats, and posts are included in the Firebase structure
    expect(Object.keys(data.firebase.users).length).toBe(data.users.length);
    expect(Object.keys(data.firebase.chats).length).toBe(data.chats.length);
    expect(Object.keys(data.firebase.posts).length).toBe(data.posts.length);

    // Check nested messages in chats
    for (const chat of data.chats) {
      const firebaseChat = data.firebase.chats[chat.id] as any;
      expect(firebaseChat).toBeDefined();
      expect(firebaseChat.messages).toBeDefined();

      const chatMessages = data.messages.filter((m) => m.chatId === chat.id);
      expect(Object.keys(firebaseChat.messages).length).toBe(chatMessages.length);
    }

    // Check nested comments and reactions in posts
    for (const post of data.posts) {
      const firebasePost = data.firebase.posts[post.id] as any;
      expect(firebasePost).toBeDefined();
      expect(firebasePost.comments).toBeDefined();
      expect(firebasePost.reactions).toBeDefined();

      // Verify comments
      const postComments = data.comments.filter((c) => c.postId === post.id);
      expect(Object.keys(firebasePost.comments).length).toBe(postComments.length);

      // Verify post reactions
      const postReactions = data.reactions.filter(
        (r) => r.referenceId === post.id && r.referenceType === 'post',
      );
      expect(Object.keys(firebasePost.reactions).length).toBe(postReactions.length);

      // Verify comment reactions
      for (const comment of postComments) {
        const firebaseComment = firebasePost.comments[comment.id];
        expect(firebaseComment).toBeDefined();
        expect(firebaseComment.reactions).toBeDefined();

        const commentReactions = data.reactions.filter(
          (r) => r.referenceId === comment.id && r.referenceType === 'comment',
        );
        expect(Object.keys(firebaseComment.reactions).length).toBe(commentReactions.length);
      }
    }

    // Check usersPublicData structure
    expect(data.firebase.usersPublicData.usersBasicInfo).toBeDefined();
    expect(data.firebase.usersPublicData.usersPublicFriends).toBeDefined();
    expect(Object.keys(data.firebase.usersPublicData.usersBasicInfo).length).toBe(
      data.users.length,
    );
  });
});
