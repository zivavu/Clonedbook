import { IPicturesMap } from '@/types/picture';

export default function getPicturesSortedByDate(picturesMap: IPicturesMap | undefined) {
  return picturesMap
    ? Object.values(picturesMap.account)
        .filter((picture) => !!picture.createdAt)
        .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
    : [];
}
