import fs from 'fs';
import path from 'path';
import readline from 'readline';

import { IGenerationOptions, generateDummyData } from './dataGenerator';

// Default data directory
const DATA_DIR = path.join(process.cwd(), 'src', 'data');

// Ensure the output directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Data size presets
const DATA_SIZES = {
  small: {
    name: 'Small',
    description: '50 users, good for quick testing',
    options: {
      userCount: 50,
      maxFriendsPerUser: 80,
      maxPostsPerUser: 12,
      maxCommentsPerPost: 20,
      maxReactionsPerPost: 50,
      maxChatsPerUser: 15,
      maxMessagesPerChat: 50,
      maxImagesPerPost: 4, // Most posts have 1-4 images
    },
  },
  medium: {
    name: 'Medium',
    description: '150 users, good for development',
    options: {
      userCount: 150,
      maxFriendsPerUser: 120,
      maxPostsPerUser: 15,
      maxCommentsPerPost: 35,
      maxReactionsPerPost: 90,
      maxChatsPerUser: 25,
      maxMessagesPerChat: 75,
      maxImagesPerPost: 6, // Some posts have up to 6 images
    },
  },
  large: {
    name: 'Large',
    description: '333 users, comprehensive dataset',
    options: {
      userCount: 333,
      maxFriendsPerUser: 200,
      maxPostsPerUser: 20,
      maxCommentsPerPost: 50,
      maxReactionsPerPost: 150,
      maxChatsPerUser: 40,
      maxMessagesPerChat: 100,
      maxImagesPerPost: 8, // Some posts have up to 8 images
    },
  },
  custom: {
    name: 'Custom',
    description: 'Define your own data size',
    options: {
      userCount: 50,
      maxFriendsPerUser: 80,
      maxPostsPerUser: 12,
      maxCommentsPerPost: 20,
      maxReactionsPerPost: 50,
      maxChatsPerUser: 15,
      maxMessagesPerChat: 50,
      maxImagesPerPost: 4,
    },
  },
};

/**
 * Clears the data directory, removing all files and subdirectories
 */
function clearDataDirectory(dirPath: string): void {
  console.log(`Clearing data directory: ${dirPath}`);

  if (!fs.existsSync(dirPath)) {
    console.log('Directory does not exist, will be created');
    return;
  }

  // Read all items in the directory
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      // Recursively clear subdirectory
      clearDataDirectory(itemPath);
      // Remove the now-empty directory
      fs.rmdirSync(itemPath);
    } else {
      // Remove files
      fs.unlinkSync(itemPath);
    }
  }

  console.log(`Data directory cleared: ${dirPath}`);
}

/**
 * Create necessary directory structure for data generation
 */
function createDirectoryStructure(baseDir: string): void {
  console.log('Creating directory structure for data generation');

  // Ensure the base directory exists
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  // Create directories for images
  const imageTypes = ['profiles', 'backgrounds', 'posts'];
  const imagesDir = path.join(baseDir, 'images');

  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  for (const type of imageTypes) {
    const typeDir = path.join(imagesDir, type);
    if (!fs.existsSync(typeDir)) {
      fs.mkdirSync(typeDir, { recursive: true });
    }
  }

  console.log('Directory structure created successfully');
}

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
 * Simple menu for selecting data size
 */
async function createSimpleMenu(): Promise<IGenerationOptions> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Create question promise
  const question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(query, (answer) => {
        resolve(answer);
      });
    });
  };

  console.log('\n🔧 CLONEDBOOK DATA GENERATOR 🔧');
  console.log('==================================');
  console.log('Select data size:');
  console.log('1. Small - 50 users, good for quick testing');
  console.log('2. Medium - 150 users, good for development');
  console.log('3. Large - 333 users, comprehensive dataset');
  console.log('4. Custom - Define your own data size');

  let choice = '';
  while (!['1', '2', '3', '4'].includes(choice)) {
    choice = await question('\nEnter your choice (1-4): ');
  }

  if (choice === '4') {
    // Custom options
    const userCount = parseInt(await question('Enter number of users: ')) || 50;
    const maxFriends = parseInt(await question('Enter max friends per user: ')) || 80;
    const maxPosts = parseInt(await question('Enter max posts per user: ')) || 12;
    const maxComments = parseInt(await question('Enter max comments per post: ')) || 20;
    const maxReactions = parseInt(await question('Enter max reactions per post: ')) || 50;
    const maxChats = parseInt(await question('Enter max chats per user: ')) || 15;
    const maxMessages = parseInt(await question('Enter max messages per chat: ')) || 50;
    const maxImages = Math.min(
      Math.max(parseInt(await question('Enter max images per post (1-8): ')) || 4, 1),
      8,
    );

    rl.close();

    const customOptions = {
      userCount,
      maxFriendsPerUser: maxFriends,
      maxPostsPerUser: maxPosts,
      maxCommentsPerPost: maxComments,
      maxReactionsPerPost: maxReactions,
      maxChatsPerUser: maxChats,
      maxMessagesPerChat: maxMessages,
      maxImagesPerPost: maxImages,
    };

    console.log('\nUsing custom options:');
    console.log(customOptions);

    return customOptions;
  } else {
    rl.close();

    // Select preset
    const presetKey = choice === '1' ? 'small' : choice === '2' ? 'medium' : 'large';
    const selectedOption = DATA_SIZES[presetKey].options;

    console.log(`\nSelected: ${DATA_SIZES[presetKey].name}`);
    console.log('Using options:');
    console.log(selectedOption);

    return selectedOption;
  }
}

/**
 * Main function to generate data
 */
async function main() {
  try {
    // Get generation options from interactive menu
    const options = await createSimpleMenu();

    console.log('\nPreparing data generation...');

    // Clear existing data and recreate directory structure
    clearDataDirectory(DATA_DIR);
    createDirectoryStructure(DATA_DIR);

    console.log('\nStarting data generation...');
    console.log(`Using output directory: ${DATA_DIR}`);

    // Generate dummy data
    const data = await generateDummyData(options, DATA_DIR);

    // Save data to files
    await saveDataToFiles(data, DATA_DIR);

    console.log('\n✅ Data generation completed successfully!');
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
main().catch((error) => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
