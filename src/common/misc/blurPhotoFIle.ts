export async function blurPhotoFile(photo: File) {
  const readPhotoPromise: Promise<HTMLImageElement> = new Promise((resolve) => {
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
  const img = await readPhotoPromise;

  const getBlobPromise: Promise<Blob | null> = new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const MAX_WIDTH = 400;
    const MAX_HEIGHT = 400;
    if (img.width > MAX_WIDTH || img.height > MAX_HEIGHT) {
      const ratio = Math.min(MAX_WIDTH / img.width, MAX_HEIGHT / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
    } else {
      canvas.width = img.width;
      canvas.height = img.height;
    }
    ctx.filter = 'blur(3px)';
    ctx.drawImage(img, -5, -5, canvas.width + 10, canvas.height + 10);
    canvas.toBlob((blob) => resolve(blob), 'image/webp', 0.05);
  });

  const result = await getBlobPromise;
  if (result === null) {
    throw new Error('Something went wrong');
  }
  return result;
}
