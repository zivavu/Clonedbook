import * as fs from 'fs';
import path from 'path';
import { generateDummyData } from './dataGenerator';

// Configure data generation options
const options = {
  userCount: 100,
  maxFriendsPerUser: 70,
  postsPerUser: 10,
  maxCommentsPerPost: 5,
  maxRepliesPerComment: 3,
  maxReactionsPerPost: 15,
  maxReactionsPerComment: 5,
  maxMessagesPerChat: 20,
};

// Generate the data
console.log('Starting data generation with options:', options);
const dummyData = generateDummyData(options);

// Log summary
console.log('Data generation complete', {
  userCount: dummyData.users.length,
  chatCount: dummyData.chats.length,
  messageCount: dummyData.messages.length,
  postCount: dummyData.posts.length,
  commentCount: dummyData.comments.length,
  reactionCount: dummyData.reactions.length,
});

// Create output directory if it doesn't exist
const outputDir = path.join(process.cwd(), 'src/data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write Firebase data to file
fs.writeFileSync(
  path.join(outputDir, 'firebase-data.json'),
  JSON.stringify(dummyData.firebase, null, 2),
);

// Write Algolia data to file
fs.writeFileSync(
  path.join(outputDir, 'algolia-data.json'),
  JSON.stringify(dummyData.algoliaSearchObjects, null, 2),
);

console.log('Data files written to:');
console.log('- Firebase data:', path.join(outputDir, 'firebase-data.json'));
console.log('- Algolia data:', path.join(outputDir, 'algolia-data.json'));
