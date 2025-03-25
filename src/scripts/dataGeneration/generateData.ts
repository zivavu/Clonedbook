import * as fs from 'fs';
import path from 'path';
import { generateDummyData } from './dataGenerator';
import { populateEmulators } from './populateEmulators';

// Set up output directory path
const outputDir = path.join(process.cwd(), 'src/data');

// Clean out existing data files
console.log('Cleaning out existing data files...');
if (fs.existsSync(outputDir)) {
  const files = fs.readdirSync(outputDir);
  for (const file of files) {
    const filePath = path.join(outputDir, file);
    if (fs.statSync(filePath).isFile()) {
      fs.unlinkSync(filePath);
      console.log(`Deleted: ${filePath}`);
    }
  }
}

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`Created directory: ${outputDir}`);
}

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
  userCount: Object.keys(dummyData.firebase.users).length,
  chatCount: Object.keys(dummyData.firebase.chats).length,
  postCount: Object.keys(dummyData.firebase.posts).length,
  algoliaObjectsCount: dummyData.algoliaSearchObjects.length,
});

// Write separate files for each Firebase collection
fs.writeFileSync(
  path.join(outputDir, 'firebase-users.json'),
  JSON.stringify(dummyData.firebase.users, null, 2),
);

fs.writeFileSync(
  path.join(outputDir, 'firebase-chats.json'),
  JSON.stringify(dummyData.firebase.chats, null, 2),
);

fs.writeFileSync(
  path.join(outputDir, 'firebase-posts.json'),
  JSON.stringify(dummyData.firebase.posts, null, 2),
);

// Write usersPublicData as a single file (as it contains only 2 documents)
fs.writeFileSync(
  path.join(outputDir, 'firebase-usersPublicData.json'),
  JSON.stringify(dummyData.firebase.usersPublicData, null, 2),
);

// Write Algolia data to file
fs.writeFileSync(
  path.join(outputDir, 'algolia-data.json'),
  JSON.stringify(dummyData.algoliaSearchObjects, null, 2),
);

console.log('Data files written to:');
console.log('- Firebase users:', path.join(outputDir, 'firebase-users.json'));
console.log('- Firebase chats:', path.join(outputDir, 'firebase-chats.json'));
console.log('- Firebase posts:', path.join(outputDir, 'firebase-posts.json'));
console.log('- Firebase usersPublicData:', path.join(outputDir, 'firebase-usersPublicData.json'));
console.log('- Algolia data:', path.join(outputDir, 'algolia-data.json'));

// Update Firebase emulator with the new data
console.log('\nUpdating Firebase emulator with new data...');
(async () => {
  try {
    await populateEmulators();
    console.log('Successfully populated Firebase emulators with new data');
  } catch (error) {
    console.error('Failed to populate emulators:', error);
  }
})();
