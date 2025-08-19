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

const CONFIG = {
  // Main image options
  mainImageMaxSize: 800,
  mainImageQuality: 85,

  // Blur image options
  blurImageSize: 16,
  blurImageQuality: 10,

  maxConcurrentFetches: 50,
  maxBatchSize: 10,
  retryCount: 3,
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

// Generate a different URL for re-fetch if persistent failures occur
function generateAlternativeUrl(originalUrl: string): string {
  try {
    const url = new URL(originalUrl);
    // Picsum: /seed/<seed>/<w>/<h>
    if (url.hostname.includes('picsum.photos')) {
      const parts = url.pathname.split('/').filter(Boolean);
      // Expect: ['seed', '<seed>', '<w>', '<h>'] or ['<w>', '<h>']
      if (parts[0] === 'seed' && parts.length >= 4) {
        const width = parts[2];
        const height = parts[3];
        const newSeed = Math.floor(Math.random() * 100000).toString();
        return `https://picsum.photos/seed/${newSeed}/${width}/${height}`;
      }
      if (parts.length >= 2) {
        const width = parts[0];
        const height = parts[1];
        const newSeed = Math.floor(Math.random() * 100000).toString();
        return `https://picsum.photos/seed/${newSeed}/${width}/${height}`;
      }
      // Fallback: add a cache-buster
      url.searchParams.set('rnd', `${Date.now()}_${Math.random()}`);
      return url.toString();
    }

    // randomuser.me portraits
    if (url.hostname.includes('randomuser.me') && url.pathname.includes('/api/portraits/')) {
      // Path: /api/portraits/(men|women)/<index>.jpg
      const segments = url.pathname.split('/').filter(Boolean);
      const genderIndex = segments.findIndex((s) => s === 'men' || s === 'women');
      if (genderIndex >= 0 && genderIndex + 1 < segments.length) {
        const newIndex = Math.floor(Math.random() * 70);
        segments[genderIndex + 1] = `${newIndex}.jpg`;
        return `${url.origin}/${segments.join('/')}`;
      }
      url.searchParams.set('rnd', `${Date.now()}_${Math.random()}`);
      return url.toString();
    }

    // Default: add cache buster to try a different variant/cdn edge
    url.searchParams.set('rnd', `${Date.now()}_${Math.random()}`);
    return url.toString();
  } catch {
    // If URL parsing fails, just append a cache-buster query param
    const sep = originalUrl.includes('?') ? '&' : '?';
    return `${originalUrl}${sep}rnd=${Date.now()}_${Math.random()}`;
  }
}

async function fetchBufferWithRetry(
  originalUrl: string,
): Promise<{ buffer?: Buffer; finalUrl?: string }> {
  // First, try the original URL with retries
  for (let attempt = 0; attempt <= CONFIG.retryCount; attempt++) {
    try {
      const response = await limitedFetch(originalUrl);
      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        return { buffer: Buffer.from(arrayBuffer), finalUrl: originalUrl };
      }
    } catch {
      console.log('Failed to fetch image:', originalUrl, 'attempt:', attempt);
    }
  }

  // Generate a different URL and try again with retries
  const altUrl = generateAlternativeUrl(originalUrl);
  for (let attempt = 0; attempt <= CONFIG.retryCount; attempt++) {
    try {
      const response = await limitedFetch(altUrl);
      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        return { buffer: Buffer.from(arrayBuffer), finalUrl: altUrl };
      }
    } catch {
      // ignore and retry
    }
  }

  return {};
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
    const { buffer, finalUrl } = await fetchBufferWithRetry(url);
    if (!buffer) {
      console.warn(`Failed to fetch image after retries: ${url}`);
      return FALLBACK_IMAGE;
    }

    const processedImage = await processImage(buffer);

    // Cache the result
    imageCache.set(url, processedImage);
    if (finalUrl && finalUrl !== url) {
      imageCache.set(finalUrl, processedImage);
    }

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

      const { buffer, finalUrl } = await fetchBufferWithRetry(url);
      if (buffer) {
        return { url: finalUrl || url, buffer };
      }
      return { url, image: FALLBACK_IMAGE };
    });

    const batchFetchResults = await Promise.all(batchPromises);
    for (let j = 0; j < batchFetchResults.length; j++) {
      const fetchResult = batchFetchResults[j];
      const originalUrl = batchUrls[j];
      if ('buffer' in fetchResult && fetchResult.buffer) {
        const processedImage = await processImage(fetchResult.buffer);
        // Cache under original URL
        imageCache.set(originalUrl, processedImage);
        // Also cache under the used (possibly alternative) URL
        imageCache.set(fetchResult.url, processedImage);
        results.push(processedImage);
      } else if ('image' in fetchResult) {
        // Cache the fallback under original to avoid repeated attempts
        imageCache.set(originalUrl, fetchResult.image);
        results.push(fetchResult.image);
      }
    }
  }

  return results;
}
