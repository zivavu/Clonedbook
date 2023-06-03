export default function isObjectEmpty(object: Object | undefined) {
  if (!object) return true;
  return Object.keys(object).length === 0;
}
