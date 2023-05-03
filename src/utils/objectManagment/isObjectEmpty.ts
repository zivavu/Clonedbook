export default function isObjectEmpty(object: Object) {
  if (!object) return true;
  return Object.keys(object).length === 0;
}
