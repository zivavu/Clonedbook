import { generateDummyData, IFriendship } from '../scripts/dataGeneration/dataGenerator';

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

// Generate data once to be used in all tests
const data = generateDummyData(mockOptions);

fixture('Data Generation Tests').page('about:blank');

test('Data Generation - Users - Basic Validation', async (t) => {
  // Check correct number of users
  await t.expect(data.users.length).eql(mockOptions.userCount);

  // Check user UUIDs
  for (const user of data.users) {
    await t.expect(user.id).ok();
    await t.expect(user.id.split('-').length).eql(5);
  }

  // Check required fields
  for (const user of data.users) {
    await t.expect(user.firstName).ok();
    await t.expect(user.lastName).ok();
    await t.expect(user.email).ok();
    await t.expect(user.profilePicture).ok();
    await t.expect(user.createdAt).ok();
    await t.expect(user.updatedAt).ok();
  }
});

test('Data Generation - Users - Optional Fields', async (t) => {
  const usersWithBio = data.users.filter((user) => user.bio);
  const usersWithMiddleName = data.users.filter((user) => user.middleName);
  const usersWithBirthday = data.users.filter((user) => user.birthday);

  await t.expect(usersWithBio.length).gt(0);
  await t.expect(usersWithMiddleName.length).gt(0);
  await t.expect(usersWithBirthday.length).gt(0);
});

test('Data Generation - Users - Contact Information', async (t) => {
  for (const user of data.users) {
    if (user.email) {
      await t.expect(user.email.includes('@')).ok();
      await t.expect(user.email.includes('.')).ok();
    }

    if (user.phone) {
      await t.expect(typeof user.phone).eql('string');
      await t.expect(user.phone.length).gt(0);
    }
  }
});

test('Data Generation - Friendship Relations - Bidirectional', async (t) => {
  for (const user of data.users) {
    if (!user.friends) continue;

    const acceptedFriends = user.friends.filter((f: IFriendship) => f.status === 'accepted');
    for (const friendship of acceptedFriends) {
      const friend = data.users.find((u) => u.id === friendship.userId);
      await t.expect(friend).ok();

      if (friend && friend.friends) {
        const reciprocalFriendship = friend.friends.find(
          (f: IFriendship) => f.userId === user.id && f.status === 'accepted',
        );
        await t.expect(reciprocalFriendship).ok();
      }
    }
  }
});

test('Data Generation - Friendship Relations - Valid Status', async (t) => {
  for (const user of data.users) {
    if (!user.friends) continue;

    for (const friendship of user.friends) {
      await t.expect(['req_sent', 'req_received', 'accepted'].includes(friendship.status)).ok();

      if (friendship.status === 'req_sent') {
        const friend = data.users.find((u) => u.id === friendship.userId);
        if (friend && friend.friends) {
          const reciprocalFriendship = friend.friends.find(
            (f: IFriendship) => f.userId === user.id,
          );
          if (reciprocalFriendship) {
            await t.expect(reciprocalFriendship.status).eql('req_received');
          }
        }
      }
    }
  }
});

test('Data Generation - Friendship Relations - Chat IDs', async (t) => {
  for (const user of data.users) {
    if (!user.friends) continue;

    const acceptedFriends = user.friends.filter((f: IFriendship) => f.status === 'accepted');
    for (const friendship of acceptedFriends) {
      await t.expect(friendship.chatId).ok();
      await t.expect(friendship.chatId.length).gt(0);

      const expectedChatId = [user.id, friendship.userId].sort().join('_');
      await t.expect(friendship.chatId).eql(expectedChatId);

      const chat = data.chats.find((c) => c.id === friendship.chatId);
      await t.expect(chat).ok();
    }
  }
});

test('Data Generation - Chats - Basic Validation', async (t) => {
  for (const chat of data.chats) {
    const [userId1, userId2] = chat.id.split('_');
    await t.expect(chat.participantsIds.includes(userId1)).ok();
    await t.expect(chat.participantsIds.includes(userId2)).ok();
    await t.expect(chat.participantsIds.length).eql(2);
  }

  const customizedChats = data.chats.filter((chat) => chat.emoji || chat.color);
  await t.expect(customizedChats.length).gt(0);

  for (const chat of data.chats) {
    for (const participantId of chat.participantsIds) {
      const user = data.users.find((u) => u.id === participantId);
      await t.expect(user).ok();
    }
  }
});

test('Data Generation - Posts and Comments', async (t) => {
  // Posts
  for (const post of data.posts) {
    const author = data.users.find((u) => u.id === post.authorId);
    await t.expect(author).ok();

    if (author) {
      await t.expect(post.createdAt).gte(author.createdAt);
    }

    await t.expect(post.content || post.pictureURLs).ok();
  }

  // Comments
  for (const comment of data.comments) {
    const author = data.users.find((u) => u.id === comment.authorId);
    await t.expect(author).ok();
  }

  // Replies
  const replies = data.comments.filter((comment) => comment.parentId);
  for (const reply of replies) {
    const parentComment = data.comments.find((c) => c.id === reply.parentId);
    await t.expect(parentComment).ok();
    if (parentComment) {
      await t.expect(parentComment.parentId).notOk();
    }
  }
});

test('Data Generation - Reactions', async (t) => {
  for (const reaction of data.reactions) {
    const user = data.users.find((u) => u.id === reaction.userId);
    await t.expect(user).ok();

    const validTypes = ['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry'];
    await t.expect(validTypes.includes(reaction.type)).ok();
  }
});

test('Data Generation - Special Collections', async (t) => {
  // User basic info
  await t.expect(data.userBasicInfo.length).eql(data.users.length);
  for (const info of data.userBasicInfo) {
    const user = data.users.find((u) => u.id === info.id);
    await t.expect(user).ok();
    if (user) {
      await t.expect(info.firstName).eql(user.firstName);
      await t.expect(info.lastName).eql(user.lastName);
      await t.expect(info.profilePicture).eql(user.profilePicture);
    }
  }

  // User public friends
  for (const relation of data.userPublicFriends) {
    const user = data.users.find((u) => u.id === relation.userId);
    await t.expect(user).ok();

    if (user && user.friends) {
      const friendshipInUser = user.friends.find(
        (f: IFriendship) => f.userId === relation.friendId && f.status === 'accepted',
      );
      await t.expect(friendshipInUser).ok();
    }
  }

  // Algolia search objects
  await t.expect(data.algoliaSearchObjects.length).eql(data.users.length);
  for (const searchObj of data.algoliaSearchObjects) {
    const user = data.users.find((u) => u.id === searchObj.objectID);
    await t.expect(user).ok();
    if (user) {
      await t.expect(searchObj.firstName).eql(user.firstName);
      await t.expect(searchObj.lastName).eql(user.lastName);
    }
  }
});

test('Data Generation - Firebase Data Structure', async (t) => {
  // Users
  await t.expect(Object.keys(data.firebase.users).length).eql(data.users.length);
  for (const user of data.users) {
    await t.expect(data.firebase.users[user.id]).eql(user);
  }

  // Chats
  await t.expect(Object.keys(data.firebase.chats).length).eql(data.chats.length);
  for (const chat of data.chats) {
    await t.expect(data.firebase.chats[chat.id]).eql(chat);
  }

  // Messages
  for (const chat of data.chats) {
    await t.expect(data.firebase.messages[chat.id]).ok();
    const chatMessages = data.messages.filter((m) => m.chatId === chat.id);
    await t.expect(Object.keys(data.firebase.messages[chat.id]).length).eql(chatMessages.length);
  }

  // Comments
  for (const post of data.posts) {
    await t.expect(data.firebase.comments[post.id]).ok();
    const postComments = data.comments.filter((c) => c.postId === post.id);
    await t.expect(Object.keys(data.firebase.comments[post.id]).length).eql(postComments.length);
  }
});
