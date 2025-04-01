import sharp from 'sharp';

interface ProcessedImage {
  webpBuffer: Buffer;
  dominantHex: string;
  blurDataUrl: string;
}

// Define result types for clarity
interface CachedResult {
  url: string;
  image: ProcessedImage;
}

interface BufferResult {
  url: string;
  buffer: Buffer;
}

type FetchResult = CachedResult | BufferResult;

// Cache for URLs that have already been processed
const imageCache = new Map<string, ProcessedImage>();

// Placeholder image data for when fetch operations fail
const FALLBACK_IMAGE = {
  webpBuffer: Buffer.from(''),
  dominantHex: '#888888',
  blurDataUrl: 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA=',
};

// Configuration for image processing optimization
const CONFIG = {
  // Main image options
  mainImageMaxSize: 800, // Reduced from 1300 for better performance
  mainImageQuality: 85, // Reduced from 85 for better performance

  // Blur image options
  blurImageSize: 8, // Reduced from 10 for better performance
  blurImageQuality: 5,

  // Concurrency control
  maxConcurrentFetches: 30, // Increased from 10 for more parallel operations
  maxBatchSize: 10,
};

// Queue for limiting concurrent fetches
let activeFetches = 0;
const fetchQueue: (() => void)[] = [];

// Process the fetch queue when a fetch completes
function processFetchQueue() {
  if (fetchQueue.length > 0 && activeFetches < CONFIG.maxConcurrentFetches) {
    const nextFetch = fetchQueue.shift();
    if (nextFetch) nextFetch();
  }
}

// Function to limit concurrent fetches
async function limitedFetch(url: string): Promise<Response> {
  if (activeFetches >= CONFIG.maxConcurrentFetches) {
    await new Promise<void>((resolve) => {
      fetchQueue.push(resolve);
    });
  }

  activeFetches++;
  try {
    return await fetch(url, { cache: 'force-cache' });
  } finally {
    activeFetches--;
    processFetchQueue();
  }
}

export async function processImage(imageBuffer: Buffer): Promise<ProcessedImage> {
  try {
    const [webpBufferPromise, blurBufferPromise, statsPromise] = await Promise.all([
      // Generate optimized webp version
      sharp(imageBuffer)
        .resize(CONFIG.mainImageMaxSize, CONFIG.mainImageMaxSize, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: CONFIG.mainImageQuality })
        .toBuffer(),

      // Generate blur data URL (smaller size for better performance)
      sharp(imageBuffer)
        .resize(CONFIG.blurImageSize, CONFIG.blurImageSize, { fit: 'inside' })
        .webp({ quality: CONFIG.blurImageQuality })
        .toBuffer(),

      // Get dominant color
      sharp(imageBuffer).stats(),
    ]);

    const blurDataUrl = `data:image/webp;base64,${blurBufferPromise.toString('base64')}`;

    const { dominant } = statsPromise;
    const dominantHex = `#${Math.round(dominant.r).toString(16).padStart(2, '0')}${Math.round(
      dominant.g,
    )
      .toString(16)
      .padStart(2, '0')}${Math.round(dominant.b).toString(16).padStart(2, '0')}`;

    const result = {
      webpBuffer: webpBufferPromise,
      dominantHex,
      blurDataUrl,
    };

    return result;
  } catch (error) {
    console.error('Error processing image:', error);
    return FALLBACK_IMAGE;
  }
}

export async function processImageFromUrl(url: string): Promise<ProcessedImage> {
  // Check if URL is already in cache
  if (imageCache.has(url)) {
    return imageCache.get(url)!;
  }

  try {
    const response = await limitedFetch(url);

    if (!response.ok) {
      console.warn(`Failed to fetch image: ${url} - Status: ${response.status}`);
      return FALLBACK_IMAGE;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const processedImage = await processImage(buffer);

    // Cache the result
    imageCache.set(url, processedImage);

    return processedImage;
  } catch (error) {
    console.error(`Error fetching image from URL ${url}:`, error);
    return FALLBACK_IMAGE;
  }
}

// Batch processing images from URLs
export async function batchProcessImagesFromUrls(urls: string[]): Promise<ProcessedImage[]> {
  // Process URLs in chunks for better memory management
  const batchSize = CONFIG.maxBatchSize;
  const results: ProcessedImage[] = [];

  for (let i = 0; i < urls.length; i += batchSize) {
    const batchUrls = urls.slice(i, i + batchSize);
    const batchPromises = batchUrls.map(async (url): Promise<FetchResult> => {
      if (imageCache.has(url)) {
        return { url, image: imageCache.get(url)! };
      }

      try {
        const response = await limitedFetch(url);

        if (!response.ok) {
          console.warn(`Failed to fetch image: ${url} - Status: ${response.status}`);
          return { url, image: FALLBACK_IMAGE };
        }

        const arrayBuffer = await response.arrayBuffer();
        return { url, buffer: Buffer.from(arrayBuffer) };
      } catch (error) {
        console.error(`Error fetching image from URL ${url}:`, error);
        return { url, image: FALLBACK_IMAGE };
      }
    });

    const batchFetchResults = await Promise.all(batchPromises);
    const processedResults: CachedResult[] = [];

    for (const result of batchFetchResults) {
      if ('buffer' in result && result.buffer) {
        const processedImage = await processImage(result.buffer);
        imageCache.set(result.url, processedImage);
        processedResults.push({ url: result.url, image: processedImage });
      } else if ('image' in result) {
        processedResults.push(result);
      }
    }

    const orderedResults = batchUrls.map((url) => {
      const result = processedResults.find((r) => r.url === url);
      return result ? result.image : FALLBACK_IMAGE;
    });

    results.push(...orderedResults);
  }

  return results;
}
