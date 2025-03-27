import * as fs from 'fs';
import * as path from 'path';
import { generateDummyData } from './dataGenerator';

// For testing/profiling - smaller amounts
const options = {
  userCount: 50, // Reduced from 300 for testing
  maxFriendsPerUser: 30, // Reduced from 150 for testing
  maxPostsPerUser: 5, // Reduced from 20 for testing
  maxCommentsPerPost: 10, // Reduced from 25 for testing
  maxReactionsPerPost: 20, // Reduced from 100 for testing
  maxChatsPerUser: 20, // Reduced from 100 for testing
  maxMessagesPerChat: 10, // Reduced from 50 for testing
};

console.time('Total script execution');

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

/**
 * Recursively delete a directory and all its contents
 */
function deleteFolderRecursive(dirPath: string) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

async function main() {
  console.log('Starting data generation...');

  console.time('Cleaning directories');

  // Create output dir if it doesn't exist
  const dataDir = path.join(process.cwd(), 'src', 'data');
  if (!fs.existsSync(dataDir)) {
    console.log(`Creating data directory at ${dataDir}`);
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Also create images directory in the same location
  const imagesDir = path.join(dataDir, 'images');
  if (!fs.existsSync(imagesDir)) {
    console.log(`Creating images directory at ${imagesDir}`);
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // Create subdirectories for different image types
  const imageTypes = ['profiles', 'backgrounds', 'posts'];
  for (const type of imageTypes) {
    const typeDir = path.join(imagesDir, type);
    if (!fs.existsSync(typeDir)) {
      console.log(`Creating image type directory at ${typeDir}`);
      fs.mkdirSync(typeDir, { recursive: true });
    }
  }

  // Clean out existing data files
  console.log('Cleaning out existing data files...');
  if (fs.existsSync(dataDir)) {
    const dataFiles = fs.readdirSync(dataDir).filter((file) => file.endsWith('.json'));
    console.log(`Found ${dataFiles.length} JSON files to clean up`);
    for (const file of dataFiles) {
      fs.unlinkSync(path.join(dataDir, file));
    }
  }

  // Clean out existing image files
  console.log('Cleaning out existing image files...');
  for (const type of imageTypes) {
    const typeDir = path.join(imagesDir, type);
    if (fs.existsSync(typeDir)) {
      const imageFiles = fs.readdirSync(typeDir);
      console.log(`Found ${imageFiles.length} images in ${type} directory to clean up`);
      for (const file of imageFiles) {
        fs.unlinkSync(path.join(typeDir, file));
      }
    }
  }
  console.timeEnd('Cleaning directories');

  console.log('Starting data generation with options:', options);
  console.log(`Data will be saved to: ${dataDir}`);

  // Generate data
  console.time('Data generation');
  const data = await generateDummyData(options, dataDir);
  console.timeEnd('Data generation');

  // Save to JSON files with firebase- prefix to match the expected format in populateEmulators.ts
  console.time('Writing data to files');
  try {
    for (const [collection, items] of Object.entries(data.firebase)) {
      const filepath = path.join(dataDir, `firebase-${collection}.json`);
      console.log(`Writing ${collection} data to ${filepath}`);
      fs.writeFileSync(filepath, JSON.stringify(items, null, 2));
      console.log(`Successfully wrote ${collection} data (${Object.keys(items).length} items)`);
    }

    // Save Algolia search data
    const algoliaPath = path.join(dataDir, 'algolia.json');
    console.log(`Writing algolia data to ${algoliaPath}`);
    fs.writeFileSync(algoliaPath, JSON.stringify(data.algoliaSearchObjects, null, 2));
    console.log(`Successfully wrote algolia data (${data.algoliaSearchObjects.length} items)`);
  } catch (error) {
    console.error('Error writing data files:', error);
  }
  console.timeEnd('Writing data to files');

  // List all files in the data directory
  console.log('Files generated in data directory:');
  try {
    const files = fs.readdirSync(dataDir);
    for (const file of files) {
      const filePath = path.join(dataDir, file);
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        console.log(`- ${file} (${Math.round(stats.size / 1024)} KB)`);
      } else if (stats.isDirectory()) {
        const subFiles = fs.readdirSync(filePath);
        console.log(`- ${file}/ (directory with ${subFiles.length} files)`);
      }
    }
  } catch (error) {
    console.error('Error listing files:', error);
  }

  console.log('Data generation complete.');
  console.log(`JSON files have been saved to: ${dataDir}`);
  console.log(`Images have been saved to: ${imagesDir}`);

  // Display stats
  console.log('\nData Generation Statistics:');
  console.log(`Users: ${data.users.length}`);
  console.log(`Chats: ${data.chats.length}`);
  console.log(`Posts: ${data.posts.length}`);
  console.log(`Algolia objects: ${data.algoliaSearchObjects.length}`);
  const totalComments = data.posts.reduce(
    (sum, post) => sum + Object.keys(post.comments).length,
    0,
  );
  console.log(`Comments: ${totalComments}`);
}

console.time('main function');
main()
  .then(() => {
    console.timeEnd('main function');
    console.timeEnd('Total script execution');
  })
  .catch((error) => {
    console.error('Error during data generation:', error);
    process.exit(1);
  });
