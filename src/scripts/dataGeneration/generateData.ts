import * as fs from 'fs';
import * as path from 'path';
import { generateDummyData } from './dataGenerator';

const options = {
  userCount: 100,
  maxFriendsPerUser: 70,
  maxPostsPerUser: 10,
  maxCommentsPerPost: 5,
  maxReactionsPerPost: 15,
  maxChatsPerUser: 70,
  maxMessagesPerChat: 20,
};

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function uploadWithRetry(uploadFn: () => Promise<any>, retries = MAX_RETRIES): Promise<any> {
  try {
    return await uploadFn();
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... (${retries} attempts remaining)`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return uploadWithRetry(uploadFn, retries - 1);
    }
    throw error;
  }
}

async function main() {
  try {
    console.log('Starting data generation...');

    // Clean out existing data files
    console.log('Cleaning out existing data files...');
    const dataDir = path.join(process.cwd(), 'src/data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Generate new data
    console.log('Starting data generation with options:', options);
    const dummyData = await generateDummyData(options);

    // Write data to JSON files
    console.log('Writing data files...');
    await uploadWithRetry(async () => {
      fs.writeFileSync(
        path.join(dataDir, 'firebase-users.json'),
        JSON.stringify(dummyData.firebase.users, null, 2),
      );
      fs.writeFileSync(
        path.join(dataDir, 'firebase-chats.json'),
        JSON.stringify(dummyData.firebase.chats, null, 2),
      );
      fs.writeFileSync(
        path.join(dataDir, 'firebase-posts.json'),
        JSON.stringify(dummyData.firebase.posts, null, 2),
      );
      fs.writeFileSync(
        path.join(dataDir, 'firebase-usersPublicData.json'),
        JSON.stringify(dummyData.firebase.usersPublicData, null, 2),
      );
    });

    console.log('Data files written successfully');

    console.log('Data generation complete', {
      userCount: Object.keys(dummyData.firebase.users).length,
      chatCount: Object.keys(dummyData.firebase.chats).length,
      postCount: Object.keys(dummyData.firebase.posts).length,
    });

    console.log('\n--------------------------------------------');
    console.log('✅ Data generation complete!');
    console.log('🔥 To populate the emulators with this data:');
    console.log('1. Ensure emulators are running with: bun run emulators');
    console.log('2. Run: bun run populate');
    console.log('--------------------------------------------\n');
  } catch (error) {
    console.error('Error generating data:', error);
    process.exit(1);
  }
}

main();
