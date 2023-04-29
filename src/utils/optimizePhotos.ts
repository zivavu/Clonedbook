export async function optimizePhotos(photos: File[]) {
  const reader = new FileReader();
  reader.readAsArrayBuffer(photos[0]);
  reader.onload = (e) => getUrls(e);
  function getUrls(e: Event) {
    const URLs = photos.map((photo) => URL.createObjectURL(photo));
    const imgs = URLs.map((url) => {
      const img = new Image();
      img.src = url;
      return img;
    });
  }
  const blobs = imgs.map((img) => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.zIndex = '100';
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const MAX_WIDTH = 1000;
    const MAX_HEIGHT = 700;
    console.log('img', img.width, img.height);
    canvas.width = 1200;
    canvas.height = 1300;
    if (img.width > MAX_WIDTH) {
      const ratio = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * ratio;
    }
    if (img.height > MAX_HEIGHT) {
      const ratio = MAX_HEIGHT / img.height;
      canvas.height = MAX_HEIGHT;
      canvas.width = img.width * ratio;
    }
    console.log(canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    document.getElementsByTagName('body')[0].appendChild(canvas);
  });
}
