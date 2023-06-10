export default function getDominantHex(img: HTMLImageElement) {
  const blockSize = 5,
    defaultHex = '#828282',
    canvas = document.createElement('canvas'),
    context = canvas.getContext && canvas.getContext('2d');

  if (!context) {
    return defaultHex;
  }

  const height = (canvas.height = img.naturalHeight || img.offsetHeight || img.height);
  const width = (canvas.width = img.naturalWidth || img.offsetWidth || img.width);

  context.drawImage(img, 0, 0);

  const data = context.getImageData(0, 0, width, height);

  const length = data.data.length;

  const rgb = { r: 0, g: 0, b: 0 };
  let i = -4,
    count = 0;
  while ((i += blockSize * 4) < length) {
    count++;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  rgb.r = Math.floor(rgb.r / count);
  rgb.g = Math.floor(rgb.g / count);
  rgb.b = Math.floor(rgb.b / count);

  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
  return hex;
}

function componentToHex(c: number) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
