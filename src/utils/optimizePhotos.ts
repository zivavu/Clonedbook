export async function optimizePhotos(photos: File[]) {
  const readPhotosPromiseArr: Promise<HTMLImageElement>[] = photos.map((photo) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(photos[0]);
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
  const getBlobPromisesArr: Promise<Blob | null>[] = loadedImages.map((img) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      const MAX_WIDTH = 1400;
      const MAX_HEIGHT = 1400;
      const ratio = Math.min(MAX_WIDTH / img.width, MAX_HEIGHT / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => resolve(blob), 'image/webp', 0.8);
    });
  });
  const result = await Promise.all(getBlobPromisesArr);
  const blobs = result.filter((blob) => blob !== null) as Blob[];
  return blobs;
}
