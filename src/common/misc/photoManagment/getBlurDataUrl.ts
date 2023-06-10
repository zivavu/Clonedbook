export async function getBlurPhotoUrl(photo: File) {
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

  function getDataUrl() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const MAX_WIDTH = 20;
    const MAX_HEIGHT = 20;
    if (img.width > MAX_WIDTH || img.height > MAX_HEIGHT) {
      const ratio = Math.min(MAX_WIDTH / img.width, MAX_HEIGHT / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
    } else {
      canvas.width = img.width;
      canvas.height = img.height;
    }

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/webp', 0.1);
    return dataUrl;
  }
  return getDataUrl();
}
