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

// Function to populate Firestore collections
async function populateFirestore(db: admin.firestore.Firestore, data: any): Promise<void> {
  const collections = ['users', 'chats', 'posts', 'userBasicInfo'];

  for (const collection of collections) {
    console.log(`Populating ${collection} collection...`);

    const collectionRef = db.collection(collection);
    const collectionData = data[collection] || {};
    const documents = Object.entries(collectionData);

    await processBatch(documents, 500, async (batch) => {
      const batchCommit = db.batch();

      batch.forEach(([id, doc]) => {
        batchCommit.set(collectionRef.doc(id), doc);
      });

      await batchCommit.commit();
    });

    console.log(`Completed populating ${collection} collection`);
  }
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
async function populateEmulators(): Promise<void> {
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
      console.error('Failed to get storage bucket, continuing with firestore only:', error);
      bucket = null;
    }

    // Load generated data
    const dataPath = path.join(process.cwd(), 'src/local/data/firebase-data.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(rawData);

    // Populate Firestore collections first
    await populateFirestore(db, data);
    console.log('Firestore collections populated successfully!');

    // Handle storage operations only if bucket is available
    if (bucket) {
      // Create temp directories for images
      const tempDir = path.join(process.cwd(), 'temp');
      const profilePicsDir = path.join(tempDir, 'profile-pics');
      const postImagesDir = path.join(tempDir, 'post-images');

      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      // Process the data
      const users = Object.values(data.users || {});
      const posts = Object.values(data.posts || {});

      // Download user profile pictures and upload to Storage
      const profileImageMap = await downloadProfilePictures(users, profilePicsDir);
      await uploadProfileImages(bucket, users, profileImageMap);

      // Upload post images to Storage
      await uploadPostImages(bucket, posts, postImagesDir);
    } else {
      console.log('Skipping storage operations due to bucket initialization failure');
    }

    console.log('Emulator population completed successfully!');
  } catch (error) {
    console.error('Error populating emulators:', error);
    process.exit(1);
  }
}

// Run the population script
populateEmulators();
