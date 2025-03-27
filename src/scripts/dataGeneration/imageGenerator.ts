import * as fs from 'fs';
import * as path from 'path';
import { batchProcessImagesFromUrls } from './serverImageProcessing';

interface IImageGeneratorOptions {
  type: 'profile' | 'background' | 'post';
  gender?: 'male' | 'female';
  count?: number;
  width?: number;
  height?: number;
}

interface IProcessedImage {
  url: string;
  blurDataUrl: string;
  dominantHex: string;
  webpBuffer: Buffer;
}

interface RandomUserResponse {
  results: Array<{
    picture: {
      large: string;
    };
  }>;
}

// Cache for already generated images
const imageUrlCache = new Map<string, IProcessedImage>();

// Helper function to generate profile image URLs
function generateProfileImageUrl(gender?: 'male' | 'female'): string {
  if (gender === 'male') {
    const startIndex = Math.floor(Math.random() * 70);
    return `https://randomuser.me/api/portraits/men/${startIndex}.jpg`;
  } else if (gender === 'female') {
    const startIndex = Math.floor(Math.random() * 70);
    return `https://randomuser.me/api/portraits/women/${startIndex}.jpg`;
  } else {
    const seed = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/seed/${seed}/400/400`;
  }
}

// Helper function to generate background image URLs
function generateBackgroundImageUrl(): string {
  const seed = Math.floor(Math.random() * 1000);
  return `https://picsum.photos/seed/${seed}/1200/400`;
}

// Helper function to generate post image URLs
function generatePostImageUrl(width: number = 800, height: number = 600): string {
  const seed = Math.floor(Math.random() * 1000);
  const postWidth = width + Math.floor(Math.random() * 400) - 200;
  const postHeight = height + Math.floor(Math.random() * 400) - 200;
  return `https://picsum.photos/seed/${seed}/${postWidth}/${postHeight}`;
}

export async function generateImages(options: IImageGeneratorOptions): Promise<IProcessedImage[]> {
  console.time(`generateImages:${options.type}:${options.count}`);
  const { type, count = 1, gender, width = 800, height = 600 } = options;

  // Create output directory if it doesn't exist
  const outputDir = path.join(process.cwd(), 'temp', 'images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Get cached images and collect new URLs to process
  const cachedImages: IProcessedImage[] = [];
  const remainingUrls: string[] = [];

  for (let i = 0; i < count; i++) {
    let imageUrl: string;

    switch (type) {
      case 'profile':
        imageUrl = generateProfileImageUrl(gender);
        break;
      case 'background':
        imageUrl = generateBackgroundImageUrl();
        break;
      case 'post':
        imageUrl = generatePostImageUrl(width, height);
        break;
      default:
        imageUrl = generatePostImageUrl(width, height);
    }

    if (imageUrlCache.has(imageUrl)) {
      cachedImages.push(imageUrlCache.get(imageUrl)!);
    } else {
      remainingUrls.push(imageUrl);
    }
  }

  // Process all non-cached images in batch
  let newImages: IProcessedImage[] = [];
  if (remainingUrls.length > 0) {
    console.time('batchProcessImages');
    const processedResults = await batchProcessImagesFromUrls(remainingUrls);
    console.timeEnd('batchProcessImages');

    // Create the final image objects with URLs
    newImages = remainingUrls.map((url, index) => {
      const processedImage = processedResults[index];
      const result = {
        url,
        ...processedImage,
      };

      // Cache for future use
      imageUrlCache.set(url, result);
      return result;
    });
  }

  // Combine cached and new images
  const results = [...cachedImages, ...newImages];

  // Return exactly the number of images requested
  const finalResults = results.slice(0, count);

  console.timeEnd(`generateImages:${options.type}:${options.count}`);
  return finalResults;
}

// Profile picture generation using batch processing
export async function generateMultipleProfilePictures(
  userIds: string[],
  outputDir: string,
): Promise<Map<string, IProcessedImage>> {
  console.time(`generateMultipleProfilePictures:${userIds.length}`);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const fileMap = new Map<string, IProcessedImage>();

  // Generate URLs for all profile pictures
  const urlsByUserId = new Map<string, string>();
  for (const userId of userIds) {
    const gender = Math.random() > 0.5 ? 'male' : 'female';
    const imageUrl = generateProfileImageUrl(gender);
    urlsByUserId.set(userId, imageUrl);
  }

  // Extract all URLs for batch processing
  const allUrls = Array.from(urlsByUserId.values());

  // Batch process all images
  const processedImages = await batchProcessImagesFromUrls(allUrls);

  // Map processed images back to user IDs and save to disk
  await Promise.all(
    Array.from(urlsByUserId.entries()).map(async ([userId, url], index) => {
      try {
        const processedImage = processedImages[index];
        const filePath = path.join(outputDir, `${userId}.webp`);
        await fs.promises.writeFile(filePath, processedImage.webpBuffer);

        const result = {
          url: filePath,
          ...processedImage,
        };

        fileMap.set(userId, result);
      } catch (error) {
        console.error(`Failed to generate profile picture for user ${userId}:`, error);
      }
    }),
  );

  console.timeEnd(`generateMultipleProfilePictures:${userIds.length}`);
  return fileMap;
}

// Post image generation using batch processing
export async function generateMultiplePostImages(
  posts: any[],
  outputDir: string,
): Promise<Map<string, IProcessedImage[]>> {
  console.time(`generateMultiplePostImages:${posts.length}`);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const fileMap = new Map<string, IProcessedImage[]>();
  const postsWithImages = posts.filter((post) => post.pictures && post.pictures.length > 0);
  console.log(`Total posts with images: ${postsWithImages.length}/${posts.length}`);

  // Create a flat list of all image URLs needed with their metadata
  type ImageRequest = { postId: string; index: number; url: string };
  const allImageRequests: ImageRequest[] = [];

  for (const post of postsWithImages) {
    for (let i = 0; i < post.pictures.length; i++) {
      const imageUrl = generatePostImageUrl();
      allImageRequests.push({ postId: post.id, index: i, url: imageUrl });
    }
  }

  // Extract just the URLs for batch processing
  const allUrls = allImageRequests.map((req) => req.url);

  // Batch process all images
  console.time('batchProcessPostImages');
  const processedImages = await batchProcessImagesFromUrls(allUrls);
  console.timeEnd('batchProcessPostImages');

  // Map processed images back to posts and save to disk
  console.time('savePostImages');

  // Group requests by postId for easier handling
  const requestsByPostId = new Map<string, ImageRequest[]>();
  allImageRequests.forEach((req) => {
    if (!requestsByPostId.has(req.postId)) {
      requestsByPostId.set(req.postId, []);
    }
    requestsByPostId.get(req.postId)!.push(req);
  });

  await Promise.all(
    Array.from(requestsByPostId.entries()).map(async ([postId, requests]) => {
      try {
        const postImages: IProcessedImage[] = [];

        await Promise.all(
          requests.map(async (req) => {
            const imageIndex = allImageRequests.findIndex(
              (r) => r.postId === req.postId && r.index === req.index,
            );
            const processedImage = processedImages[imageIndex];

            const filePath = path.join(outputDir, `${postId}_${req.index}.webp`);
            await fs.promises.writeFile(filePath, processedImage.webpBuffer);

            const result = {
              url: filePath,
              ...processedImage,
            };

            postImages[req.index] = result;
          }),
        );

        fileMap.set(postId, postImages);
      } catch (error) {
        console.error(`Failed to generate images for post ${postId}:`, error);
      }
    }),
  );

  console.timeEnd('savePostImages');
  console.timeEnd(`generateMultiplePostImages:${posts.length}`);
  return fileMap;
}

// Keep these legacy functions for backward compatibility but implement using new batch APIs
export async function generateProfilePicture(
  userId: string,
  outputDir: string,
): Promise<IProcessedImage> {
  const map = await generateMultipleProfilePictures([userId], outputDir);
  return map.get(userId)!;
}

export async function generatePostImage(
  postId: string,
  index: number,
  outputDir: string,
): Promise<IProcessedImage> {
  const dummyPost = { id: postId, pictures: [1] }; // Minimal structure needed
  const map = await generateMultiplePostImages([dummyPost], outputDir);
  return map.get(postId)![0];
}
