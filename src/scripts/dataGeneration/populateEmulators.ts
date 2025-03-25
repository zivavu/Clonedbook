import admin from 'firebase-admin';
import * as fs from 'fs';
import { createReadStream } from 'fs';
import * as path from 'path';
import { pipeline } from 'stream/promises';

// Initialize Firebase Admin
function initAdminWithEmulators(): admin.app.App {
  // Check if app is already initialized
  const apps = admin.apps || [];
  if (apps.length > 0) {
    return apps[0]!;
  }

  const app = admin.initializeApp({
    projectId: 'demo-project',
    storageBucket: 'demo-project.appspot.com',
  });

  // Set environment variables to point to emulators
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  process.env.FIREBASE_STORAGE_EMULATOR_HOST = 'localhost:9199';

  return app;
}

// Generic batch function to avoid Firestore quota limits
async function processBatch<T>(
  items: T[],
  batchSize: number,
  processFn: (batch: T[]) => Promise<void>,
): Promise<void> {
  const batches = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    batches.push(batch);
  }

  console.log(`Processing ${items.length} items in ${batches.length} batches...`);

  for (let i = 0; i < batches.length; i++) {
    await processFn(batches[i]);
    console.log(`Batch ${i + 1}/${batches.length} completed`);
  }
}

// Function to upload a file to Firebase Storage emulator
async function uploadFile(bucket: any, filePath: string, destination: string): Promise<string> {
  const fileStream = createReadStream(filePath);
  const file = bucket.file(destination);

  await pipeline(
    fileStream,
    file.createWriteStream({
      metadata: {
        contentType: getContentType(filePath),
      },
      resumable: false,
    }),
  );

  console.log(`Uploaded ${filePath} to ${destination}`);

  return destination;
}

// Helper to determine content type
function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.gif':
      return 'image/gif';
    case '.webp':
      return 'image/webp';
    default:
      return 'application/octet-stream';
  }
}

// Function to download sample profile pictures
async function downloadProfilePictures(
  users: any[],
  downloadDir: string,
): Promise<Map<string, string>> {
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
  }

  const fileMap = new Map<string, string>();

  console.log('Downloading profile pictures...');

  await processBatch(users, 10, async (batch) => {
    const promises = batch.map(async (user) => {
      try {
        const userId = user.id;
        const profileUrl = user.profilePicture;
        const filePath = path.join(downloadDir, `${userId}.jpg`);

        // Skip if already downloaded
        if (fs.existsSync(filePath)) {
          fileMap.set(userId, filePath);
          return;
        }

        // Download the file using Bun's built-in fetch
        const response = await fetch(profileUrl);
        const buffer = await response.arrayBuffer();
        fs.writeFileSync(filePath, Buffer.from(buffer));

        fileMap.set(userId, filePath);
      } catch (error) {
        console.error(`Failed to download picture for user ${user.id}:`, error);
      }
    });

    await Promise.all(promises);
  });

  console.log(`Downloaded ${fileMap.size} profile pictures`);
  return fileMap;
}

// Function to clear all Firestore collections
async function clearFirestoreCollections(db: admin.firestore.Firestore): Promise<void> {
  console.log('Clearing existing Firestore collections...');

  // Collections to clear
  const collections = ['users', 'chats', 'posts', 'usersPublicData'];

  for (const collectionName of collections) {
    try {
      const collectionRef = db.collection(collectionName);
      const snapshot = await collectionRef.get();

      if (snapshot.empty) {
        console.log(`Collection ${collectionName} is already empty.`);
        continue;
      }

      const batchSize = 500;
      const batches = [];
      let batch = db.batch();
      let operationCount = 0;

      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
        operationCount++;

        if (operationCount === batchSize) {
          batches.push(batch);
          batch = db.batch();
          operationCount = 0;
        }
      });

      if (operationCount > 0) {
        batches.push(batch);
      }

      console.log(
        `Deleting ${snapshot.size} documents from ${collectionName} in ${batches.length} batches...`,
      );

      for (let i = 0; i < batches.length; i++) {
        await batches[i].commit();
        console.log(`Batch ${i + 1}/${batches.length} committed for ${collectionName}`);
      }

      console.log(`Collection ${collectionName} cleared.`);
    } catch (error) {
      console.error(`Error clearing collection ${collectionName}:`, error);
    }
  }

  console.log('All collections cleared.');
}

// Function to clear all Storage files
async function clearStorageFiles(bucket: any): Promise<void> {
  console.log('Clearing existing Storage files...');

  try {
    const [files] = await bucket.getFiles();

    if (files.length === 0) {
      console.log('Storage is already empty.');
      return;
    }

    console.log(`Found ${files.length} files to delete.`);

    const deletePromises = files.map(async (file: any) => {
      try {
        await file.delete();
        console.log(`Deleted file: ${file.name}`);
      } catch (error) {
        console.error(`Failed to delete file ${file.name}:`, error);
      }
    });

    await Promise.all(deletePromises);
    console.log('All Storage files cleared.');
  } catch (error) {
    console.error('Error clearing Storage files:', error);
  }
}

// Function to populate Firestore collections
async function populateFirestore(db: admin.firestore.Firestore): Promise<void> {
  console.log('Populating Firestore collections...');

  const dataDir = path.join(process.cwd(), 'src/data');

  // Map the generated data files to their collections
  const collectionFiles = [
    { collection: 'users', file: 'firebase-users.json' },
    { collection: 'chats', file: 'firebase-chats.json' },
    { collection: 'posts', file: 'firebase-posts.json' },
  ];

  // Special handling for usersPublicData which contains documents instead of being a direct collection
  const usersPublicDataPath = path.join(dataDir, 'firebase-usersPublicData.json');

  for (const { collection, file } of collectionFiles) {
    const filePath = path.join(dataDir, file);

    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      continue;
    }

    console.log(`Loading data from ${filePath}...`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    console.log(`Populating ${collection} collection...`);
    const collectionRef = db.collection(collection);
    const documents = Object.entries(data);

    await processBatch(documents, 500, async (batch) => {
      const batchCommit = db.batch();

      batch.forEach(([id, doc]) => {
        batchCommit.set(collectionRef.doc(id), doc);
      });

      await batchCommit.commit();
    });

    console.log(`Completed populating ${collection} collection with ${documents.length} documents`);
  }

  // Handle usersPublicData specially
  if (fs.existsSync(usersPublicDataPath)) {
    console.log(`Loading usersPublicData from ${usersPublicDataPath}...`);
    const usersPublicData = JSON.parse(fs.readFileSync(usersPublicDataPath, 'utf-8'));

    // Set usersBasicInfo documents
    if (usersPublicData.usersBasicInfo) {
      console.log('Populating usersPublicData.usersBasicInfo...');
      const usersBasicInfoRef = db.collection('usersPublicData').doc('usersBasicInfo');
      await usersBasicInfoRef.set(usersPublicData.usersBasicInfo);
      console.log('Completed populating usersPublicData.usersBasicInfo');
    }

    // Set usersPublicFriends documents
    if (usersPublicData.usersPublicFriends) {
      console.log('Populating usersPublicData.usersPublicFriends...');
      const usersPublicFriendsRef = db.collection('usersPublicData').doc('usersPublicFriends');
      await usersPublicFriendsRef.set(usersPublicData.usersPublicFriends);
      console.log('Completed populating usersPublicData.usersPublicFriends');
    }
  }

  console.log('All Firestore collections populated.');
}

// Function to upload profile images to Storage
async function uploadProfileImages(
  bucket: any,
  users: any[],
  imageMap: Map<string, string>,
): Promise<void> {
  console.log('Uploading profile images to Storage...');

  await processBatch(users, 10, async (batch) => {
    const promises = batch.map(async (user) => {
      try {
        const userId = user.id;
        const localFilePath = imageMap.get(userId);

        if (!localFilePath) return;

        const destination = `users/${userId}/pictures/profile.jpg`;
        await uploadFile(bucket, localFilePath, destination);
      } catch (error) {
        console.error(`Failed to upload profile picture for user ${user.id}:`, error);
      }
    });

    await Promise.all(promises);
  });

  console.log('Completed uploading profile images');
}

// Function to generate and upload post images
async function uploadPostImages(bucket: any, posts: any[], imageDir: string): Promise<void> {
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }

  console.log('Uploading post images to Storage...');

  await processBatch(
    posts.filter((post) => post.pictureURLs && post.pictureURLs.length > 0),
    10,
    async (batch) => {
      const promises = batch.map(async (post) => {
        try {
          const postId = post.id;
          const postDir = path.join(imageDir, postId);

          if (!fs.existsSync(postDir)) {
            fs.mkdirSync(postDir, { recursive: true });
          }

          // Download and upload each image
          const picturePromises = (post.pictureURLs || []).map(
            async (url: string, index: number) => {
              try {
                const localFilePath = path.join(postDir, `image_${index}.jpg`);

                // Skip if already downloaded
                if (!fs.existsSync(localFilePath)) {
                  const response = await fetch(url);
                  const buffer = await response.arrayBuffer();
                  fs.writeFileSync(localFilePath, Buffer.from(buffer));
                }

                const destination = `posts/${postId}/image_${index}.jpg`;
                await uploadFile(bucket, localFilePath, destination);
              } catch (error) {
                console.error(`Failed to process image ${index} for post ${postId}:`, error);
              }
            },
          );

          await Promise.all(picturePromises);
        } catch (error) {
          console.error(`Failed to process images for post ${post.id}:`, error);
        }
      });

      await Promise.all(promises);
    },
  );

  console.log('Completed uploading post images');
}

// Main function to run the emulator population
export async function populateEmulators(): Promise<void> {
  try {
    console.log('Starting emulator population...');

    // Initialize Firebase Admin with emulator configuration
    const app = initAdminWithEmulators();
    const db = app.firestore();

    // Get default bucket
    let bucket;
    try {
      bucket = app.storage().bucket();
    } catch (error) {
      console.error('Failed to get storage bucket:', error);
      bucket = null;
    }

    // Clear existing data
    await clearFirestoreCollections(db);
    if (bucket) {
      await clearStorageFiles(bucket);
    }

    // Load data from generated files
    await populateFirestore(db);

    const dataDir = path.join(process.cwd(), 'src/data');
    const usersFilePath = path.join(dataDir, 'firebase-users.json');
    const postsFilePath = path.join(dataDir, 'firebase-posts.json');

    if (bucket && fs.existsSync(usersFilePath)) {
      // Process user profile images
      const users = Object.values(JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')));
      const tempDir = path.join(process.cwd(), 'tmp/profilePictures');
      const imageMap = await downloadProfilePictures(users, tempDir);
      await uploadProfileImages(bucket, users, imageMap);

      // Process post images if they exist
      if (fs.existsSync(postsFilePath)) {
        const posts = Object.values(JSON.parse(fs.readFileSync(postsFilePath, 'utf-8')));
        const postImagesDir = path.join(process.cwd(), 'tmp/postImages');
        await uploadPostImages(bucket, posts, postImagesDir);
      }
    }

    console.log('Emulator population completed successfully!');
  } catch (error) {
    console.error('Error during emulator population:', error);
    throw error;
  }
}

// Run the population script
populateEmulators();
