import { getBlurPhotoUrl } from './getBlurDataUrl';
import getDominantHex from './getDominantHex';

export async function optimizePhotoFilesArr(photos: File[]) {
  const blurPhotosPromieses = photos.map(async (photo) => {
    const blurPhotoUrl = await getBlurPhotoUrl(photo);
    return blurPhotoUrl;
  });
  const blurPhotoUrlsArr = await Promise.all(blurPhotosPromieses);

  const readPhotosPromiseArr: Promise<HTMLImageElement>[] = photos.map((photo) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(photo);
      reader.onload = () => {
        const url = URL.createObjectURL(photo);
        const img = new Image();
        img.src = url;
        img.onload = () => {
          resolve(img);
        };
      };
    });
  });
  const loadedImages = await Promise.all(readPhotosPromiseArr);

  const dominantHexs = loadedImages.map((img) => getDominantHex(img));

  const getBlobPromisesArr: Promise<Blob | null>[] = loadedImages.map((img) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      const MAX_WIDTH = 1300;
      const MAX_HEIGHT = 1300;
      if (img.width > MAX_WIDTH || img.height > MAX_HEIGHT) {
        const ratio = Math.min(MAX_WIDTH / img.width, MAX_HEIGHT / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => resolve(blob), 'image/webp', 0.85);
    });
  });

  const result = await Promise.all(getBlobPromisesArr);
  const blobs = result.filter((blob) => blob !== null) as Blob[];
  return blobs.map((blob, index) => {
    return {
      blob,
      dominantHex: dominantHexs[index],
      blurUrl: blurPhotoUrlsArr[index],
    };
  });
}
