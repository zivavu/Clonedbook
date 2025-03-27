import fs from 'fs';
import path from 'path';

import { IGenerationOptions, generateDummyData } from './dataGenerator';

// Default data directory
const DATA_DIR = path.join(process.cwd(), 'src', 'data');

// Ensure the output directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Default data generation options
const DEFAULT_OPTIONS: IGenerationOptions = {
  userCount: 50,
  maxFriendsPerUser: 15,
  maxPostsPerUser: 10,
  maxCommentsPerPost: 15,
  maxReactionsPerPost: 30,
  maxChatsPerUser: 10,
  maxMessagesPerChat: 50,
};

/**
 * Saves data to JSON files
 */
async function saveDataToFiles(data: any, baseDir: string) {
  // Save data to JSON files
  console.log('Saving data to files...');

  const savePromises = [
    fs.promises.writeFile(
      path.join(baseDir, 'firebase-users.json'),
      JSON.stringify(data.firebase.users),
    ),
    fs.promises.writeFile(
      path.join(baseDir, 'firebase-chats.json'),
      JSON.stringify(data.firebase.chats),
    ),
    fs.promises.writeFile(
      path.join(baseDir, 'firebase-posts.json'),
      JSON.stringify(data.firebase.posts),
    ),
    fs.promises.writeFile(
      path.join(baseDir, 'firebase-usersPublicData.json'),
      JSON.stringify(data.firebase.usersPublicData),
    ),
    fs.promises.writeFile(
      path.join(baseDir, 'algolia.json'),
      JSON.stringify(data.algoliaSearchObjects),
    ),
  ];

  // Wait for all files to be saved
  await Promise.all(savePromises);
  console.log('All data files saved successfully');
}

/**
 * Main function to generate data
 */
async function main() {
  try {
    console.log('Starting data generation...');
    console.log(`Using output directory: ${DATA_DIR}`);
    console.log('Generating data with the following options:');
    console.log(DEFAULT_OPTIONS);

    // Generate dummy data
    const data = await generateDummyData(DEFAULT_OPTIONS, DATA_DIR);

    // Save data to files
    await saveDataToFiles(data, DATA_DIR);

    console.log('Data generation completed successfully!');
    console.log(`Output directory: ${DATA_DIR}`);
    console.log('Generated:');
    console.log(`- ${Object.keys(data.firebase.users).length} users`);
    console.log(`- ${Object.keys(data.firebase.chats).length} chats`);
    console.log(`- ${Object.keys(data.firebase.posts).length} posts`);
    console.log('You can now run "bun run populate" to upload the data to Firebase emulators');
  } catch (error) {
    console.error('Error generating data:', error);
    process.exit(1);
  }
}

// Run the main function
main();
