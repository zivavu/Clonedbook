import fs from 'fs';
import path from 'path';
import readline from 'readline';

import { IGenerationOptions, generateDummyData } from './dataGenerator';

// Default data directory
const DATA_DIR = path.join(process.cwd(), 'src', 'data');

// Data size presets
const DATA_SIZES = {
  small: {
    name: 'Small',
    description: '50 users, good for quick testing',
    options: {
      userCount: 50,
      maxFriendsPerUser: 80,
      maxPostsPerUser: 3,
      maxCommentsPerPost: 20,
      maxReactionsPerPost: 50,
      maxChatsPerUser: 15,
      maxMessagesPerChat: 50,
      maxImagesPerPost: 2,
    },
  },
  medium: {
    name: 'Medium',
    description: '150 users, good for development',
    options: {
      userCount: 150,
      maxFriendsPerUser: 120,
      maxPostsPerUser: 4,
      maxCommentsPerPost: 35,
      maxReactionsPerPost: 90,
      maxChatsPerUser: 25,
      maxMessagesPerChat: 75,
      maxImagesPerPost: 5,
    },
  },
  large: {
    name: 'Large',
    description: '200 users, comprehensive dataset',
    options: {
      userCount: 200,
      maxFriendsPerUser: 140,
      maxPostsPerUser: 5,
      maxCommentsPerPost: 50,
      maxReactionsPerPost: 150,
      maxChatsPerUser: 40,
      maxMessagesPerChat: 100,
      maxImagesPerPost: 8,
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

function clearDataDirectory(dirPath: string): void {
  console.log(`🧹 Clearing data directory: ${dirPath}`);

  if (!fs.existsSync(dirPath)) {
    console.log('Directory does not exist, will be created');
    return;
  }

  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      clearDataDirectory(itemPath);
      fs.rmdirSync(itemPath);
    } else {
      fs.unlinkSync(itemPath);
    }
  }
}

function createDirectoryStructure(baseDir: string): void {
  console.log('📁 Creating directory structure');

  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

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
}

async function saveDataToFiles(data: any, baseDir: string) {
  console.log('💾 Saving data to JSON files');

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

  await Promise.all(savePromises);
}

async function createSimpleMenu(): Promise<IGenerationOptions> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

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

    console.log('\n📊 Using custom options');

    return customOptions;
  } else {
    rl.close();

    const presetKey = choice === '1' ? 'small' : choice === '2' ? 'medium' : 'large';
    const selectedOption = DATA_SIZES[presetKey].options;

    console.log(`\n📊 Selected: ${DATA_SIZES[presetKey].name}`);

    return selectedOption;
  }
}

async function main() {
  try {
    const options = await createSimpleMenu();

    console.log('\n🔄 Preparing data generation');

    clearDataDirectory(DATA_DIR);
    createDirectoryStructure(DATA_DIR);

    console.log('\n🚀 Generating data');
    const data = await generateDummyData(options, DATA_DIR);

    await saveDataToFiles(data, DATA_DIR);

    console.log('\n✅ Data generation completed successfully!');
    console.log('Generated:');
    console.log(`- ${Object.keys(data.firebase.users).length} users`);
    console.log(`- ${Object.keys(data.firebase.chats).length} chats`);
    console.log(`- ${Object.keys(data.firebase.posts).length} posts`);
    console.log('\nYou can now run "bun run populate" to upload the data to Firebase emulators');
  } catch (error) {
    console.error('❌ Error generating data:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
