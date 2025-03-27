import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

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
  blob: Buffer;
}

interface RandomUserResponse {
  results: Array<{
    picture: {
      large: string;
    };
  }>;
}

export async function generateImages(options: IImageGeneratorOptions): Promise<IProcessedImage[]> {
  const { type, count = 1, gender, width = 800, height = 600 } = options;
  const results: IProcessedImage[] = [];

  // Create output directory if it doesn't exist
  const outputDir = path.join(process.cwd(), 'temp', 'images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (let i = 0; i < count; i++) {
    const imageId = uuidv4();
    const outputPath = path.join(outputDir, `${type}_${imageId}.jpg`);

    // Generate a gradient image
    const buffer = await generateGradientImage(width, height);

    // Save the image
    fs.writeFileSync(outputPath, buffer);

    // Generate blur data
    const blurBuffer = await sharp(buffer).resize(10, 10).jpeg({ quality: 20 }).toBuffer();

    // Get dominant color
    const { dominant } = await sharp(buffer).stats();
    const dominantHex = `#${Math.round(dominant.r).toString(16).padStart(2, '0')}${Math.round(dominant.g).toString(16).padStart(2, '0')}${Math.round(dominant.b).toString(16).padStart(2, '0')}`;

    const blurDataUrl = `data:image/jpeg;base64,${blurBuffer.toString('base64')}`;

    // Generate a random seed for Picsum Photos
    const seed = Math.floor(Math.random() * 1000);

    // Use a public URL instead of a local file path
    let placeholderUrl = '';

    if (type === 'profile') {
      // Use different placeholder for male/female if specified
      if (gender === 'male') {
        // Generate a random starting index for more variety
        const startIndex = Math.floor(Math.random() * 70); // randomuser.me has about 70 unique images
        placeholderUrl = `https://randomuser.me/api/portraits/men/${(startIndex + i) % 70}.jpg`;
      } else if (gender === 'female') {
        const startIndex = Math.floor(Math.random() * 70);
        placeholderUrl = `https://randomuser.me/api/portraits/women/${(startIndex + i) % 70}.jpg`;
      } else {
        placeholderUrl = `https://picsum.photos/seed/${seed}/200/200`;
      }
    } else if (type === 'background') {
      placeholderUrl = `https://picsum.photos/seed/${seed}/1200/400`;
    } else {
      // For post images
      placeholderUrl = `https://picsum.photos/seed/${seed}/${width}/${height}`;
    }

    results.push({
      url: placeholderUrl, // Use web URL instead of local file path
      blurDataUrl,
      dominantHex,
      blob: buffer,
    });
  }

  return results;
}

async function generateGradientImage(width: number, height: number): Promise<Buffer> {
  // Generate random colors for gradient
  const r1 = Math.floor(Math.random() * 255);
  const g1 = Math.floor(Math.random() * 255);
  const b1 = Math.floor(Math.random() * 255);
  const r2 = Math.floor(Math.random() * 255);
  const g2 = Math.floor(Math.random() * 255);
  const b2 = Math.floor(Math.random() * 255);

  // Create SVG gradient
  const svg = `
    <svg width="${width}" height="${height}">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(${r1},${g1},${b1});stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(${r2},${g2},${b2});stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)" />
    </svg>
  `;

  // Convert SVG to JPEG using sharp
  return await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toBuffer();
}

async function generateImageUrls(
  type: 'profile' | 'background' | 'post',
  gender?: 'male' | 'female',
  count: number = 1,
  width: number = 800,
  height: number = 600,
): Promise<string[]> {
  const urls: string[] = [];

  switch (type) {
    case 'profile':
      // Use Picsum Photos for profile pictures (more reliable than RandomUser)
      for (let i = 0; i < count; i++) {
        const seed = Math.floor(Math.random() * 1000);
        urls.push(`https://picsum.photos/seed/${seed}/200/200`);
      }
      break;

    case 'background':
      // Use Picsum Photos for background images
      for (let i = 0; i < count; i++) {
        const seed = Math.floor(Math.random() * 1000);
        urls.push(`https://picsum.photos/seed/${seed}/${width}/${height}`);
      }
      break;

    case 'post':
      // Use Picsum Photos for post images
      for (let i = 0; i < count; i++) {
        const seed = Math.floor(Math.random() * 1000);
        urls.push(`https://picsum.photos/seed/${seed}/${width}/${height}`);
      }
      break;
  }

  return urls;
}

export async function generateProfilePicture(userId: string, outputDir: string): Promise<string> {
  try {
    const response = await fetch('https://randomuser.me/api/');
    const data = (await response.json()) as RandomUserResponse;
    const imageUrl = data.results[0].picture.large;

    const imageResponse = await fetch(imageUrl);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filePath = path.join(outputDir, `${userId}.jpg`);
    await sharp(buffer).resize(400, 400, { fit: 'cover' }).jpeg({ quality: 90 }).toFile(filePath);

    return filePath;
  } catch (error) {
    console.error(`Failed to generate profile picture for user ${userId}:`, error);
    throw error;
  }
}

export async function generatePostImage(
  postId: string,
  index: number,
  outputDir: string,
): Promise<string> {
  try {
    // Generate random width and height between 800-1200px
    const width = Math.floor(Math.random() * 400) + 800;
    const height = Math.floor(Math.random() * 400) + 800;

    // Get random image from Picsum
    const imageUrl = `https://picsum.photos/${width}/${height}`;
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filePath = path.join(outputDir, `${postId}_${index}.jpg`);
    await sharp(buffer).jpeg({ quality: 90 }).toFile(filePath);

    return filePath;
  } catch (error) {
    console.error(`Failed to generate post image for post ${postId}:`, error);
    throw error;
  }
}

export async function generateMultipleProfilePictures(
  userIds: string[],
  outputDir: string,
): Promise<Map<string, string>> {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const fileMap = new Map<string, string>();
  const batchSize = 10;

  for (let i = 0; i < userIds.length; i += batchSize) {
    const batch = userIds.slice(i, i + batchSize);
    console.log(
      `Processing profile pictures batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(userIds.length / batchSize)}`,
    );

    await Promise.all(
      batch.map(async (userId) => {
        try {
          const filePath = await generateProfilePicture(userId, outputDir);
          fileMap.set(userId, filePath);
        } catch (error) {
          console.error(`Failed to generate profile picture for user ${userId}:`, error);
        }
      }),
    );
  }

  return fileMap;
}

export async function generateMultiplePostImages(
  posts: any[],
  outputDir: string,
): Promise<Map<string, string[]>> {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const fileMap = new Map<string, string[]>();
  const batchSize = 5;

  const postsWithImages = posts.filter((post) => post.pictures && post.pictures.length > 0);

  for (let i = 0; i < postsWithImages.length; i += batchSize) {
    const batch = postsWithImages.slice(i, i + batchSize);
    console.log(
      `Processing post images batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(postsWithImages.length / batchSize)}`,
    );

    await Promise.all(
      batch.map(async (post) => {
        try {
          const postImages: string[] = [];
          for (let j = 0; j < post.pictures.length; j++) {
            const filePath = await generatePostImage(post.id, j, outputDir);
            postImages.push(filePath);
          }
          fileMap.set(post.id, postImages);
        } catch (error) {
          console.error(`Failed to generate images for post ${post.id}:`, error);
        }
      }),
    );
  }

  return fileMap;
}
